/**
 * Created by yicj on 2016/5/29.
 */
var request = require('request') ;

var cheerio = require('cheerio') ;

var debug = require('debug')('blog:update') ;

debug('读取博文列表') ;

var serverUrl = "http://blog.sina.com.cn/s/articlelist_1776757314_1_1.html" ;

//读取分类页面


function readArticleList (url,callback){
    //读取分类页面
    request(url, function (err,res) {
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
            console.info('还有下一页.......') ;
            //读取下一页
            readArticleList(nextUrl, function (err,articleList2) {
                if(err) return callback(err) ;
                //合并结果
                callback(null,articleList.concat(articleList2)) ;
            }) ;
        }else{
            console.info('没有下一页直接返回....') ;
            //返回结果
            callback(null,articleList) ;
        }

    }) ;
}




readArticleList(serverUrl, function (err,articleList) {
    if(err) console.error(err.stack) ;
    console.log(articleList) ;
}) ;






//下面方式是直接获取当前页的信息
/*
request(serverUrl, function (err, res) {
    if(err) return console.error(err) ;
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
    console.info(articleList) ;

}) ;*/
