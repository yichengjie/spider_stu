/**
 * Created by yicj on 2016/5/29.
 */
var request = require('request') ;
var cheerio = require('cheerio') ;
var debug = require('debug')('blog:update') ;
var async = require('async') ;

var serverUrl = 'http://blog.sina.com.cn/s/articlelist_1776757314_1_1.html' ;

function readArticleList(url,callback){

    debug('读取博文的列表 : %s',url ) ;
    
    request(url, function (err,res) {
        var $ = cheerio.load(res.body.toString()) ;
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

        callback(null,articleList) ;

    }) ;
} ;


function readyArticleDetail (url,callback){

    debug('读取博文内容 : %s',url) ;
    
    request(url, function (err, res) {

        if(err) return callback(err) ;

        var $ = cheerio.load(res.body.toString()) ;
        var tags = [] ;
        $('.blog_tag h3 a').each(function () {
            var tag = $(this).text().trim() ;
            if(tag){
                tags.push(tag) ;
            }
        }) ;
        var content = $('.articalContent').html().trim() ;
        callback(null,{tags:tags,content:content}) ;
    }) ;
} ;

//读取分类下的所有文章
readArticleList(serverUrl, function (err,articleList) {

    if(err) return console.error(err) ;
    //依次取出articleList中的每一个元素，调用第二个参数中传入的函数
    //函数的第二个参数即是articleList数组的其中一个元素
    //函数的第二个参数是回调函数
    async.eachSeries(articleList, function (article,next) {
        //读取文章内容
        readyArticleDetail(article.url, function (err,detail) {
            if(err) console.error(err.stack) ;
            console.log(detail) ;
            //需要调用next()来返回
            next() ;
        });
    }, function (err) {
        //当遍历完articlelist后，执行此回调函数
        if(err) return console.error(err.stack) ;
        console.log('完成') ;
    }) ;


}) ;