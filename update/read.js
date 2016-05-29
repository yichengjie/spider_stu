/**
 * Created by yicj on 2016/5/29.
 */
var originRequest = require('request') ;

var cheerio = require('cheerio') ;

var debug = require('debug')('blog:update:red') ;

function request(url,callback){
    originRequest(url,callback) ;
}


exports.classList = function(url,callback){
    debug('读取文章分类列表 : %s ' ,url) ;
    request(url, function (err,res) {
        if(err) return callback(err);
        //根据网站类容创建dom操作对象
        var $ = cheerio.load(res.body.toString()) ;

        //读取博文类别列表
        var classList = [] ;
        $('.classList li a').each(function(){
            var $me = $(this) ;
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href')
            } ;
            //从url中取出分类的id//articlelist_1776757314_0_1
            var s = item.url.match(/articlelist_\d+_(\d+)_\d\.html/) ;
            if(Array.isArray(s)){
                item.id = s[1] ;
            }
            classList.push(item) ;
        }) ;
        callback(err,classList) ;
    })
} ;


exports.articleList = function (url,callback) {
    debug('读取博文列表 : %s' ,url) ;
    request(url, function (err, res) {
        if(err) return callback(err) ;
        //根据网内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString()) ;
        //读取博文列表
        var articleList = [] ;
        $('.articleList .articleCell').each(function () {
            var $me = $(this) ;
            var $title = $me.find('.atc_title a') ;
            var $time = $me.find('.atc_tm') ;
            var item = {
                title:$title.text().trim(),
                url:$title.attr('href'),
                time:$time.text().trim()
            } ;
            //从url中获取文章id
            var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/) ;
            if(Array.isArray(s)){
                item.id = s[1] ;
                articleList.push(item) ;
            }
        }) ;

        //检查是否有下一页
        var nextUrl = $('.SG_pgnext a').attr('href') ;
        if(nextUrl){
            //读取下一页
            exports.articleList(nextUrl, function (err,articleList2) {
                if(err) return callback(err) ;
                //合并结果
                callback(null,articleList.concat(articleList2)) ;
            }) ;
        }else{
            console.info('没有下一页直接返回....') ;
            //返回结果
            callback(null,articleList) ;
        }
    })
} ;


exports.articleDetail = function (url,callback) {

    debug('读取博文内容: %s',url) ;
    if(err) return callback(err) ;
    var $ = cheerio.load(res.body.toString()) ;
    var tags = [] ;
    //获取文章标签
    $('.blog_tag h3 a').each(function () {
        var tag = $(this).text().trim() ;
        if(tag){
            tags.push(tag) ;
        }
    }) ;
    //获取文章内容
    var content = $('.articalContent').html().trim() ;
    //输出结果
    callback(null,{tags:tags,content:content}) ;
};
