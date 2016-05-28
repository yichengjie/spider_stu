/**
 * Created by yicj on 2016/5/28.
 */
var request = require('request') ;
var cheerio = require('cheerio') ;
var debug = require('debug') ;

debug('读取博文类别列表') ;

var requestUrl ="http://blog.sina.com.cn/u/1776757314" ;

//读取博文首页
request(requestUrl, function (err, res) {
    if(err) return console.error(err) ;
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
        console.info('------------------------------') ;
        console.info(s) ;
        console.info('------------------------------') ;
        if(Array.isArray(s)){
            item.id = s[1] ;
        }
        classList.push(item) ;
    }) ;

    console.info(classList) ;

}) ;