/**
 * Created by yicj on 2016/5/29.
 */
var request = require('request') ;
var cheerio = require('cheerio') ;
var debug = require('debug')('blog:upload') ;

debug('读取博文内容') ;

var serverUrl = "http://blog.sina.com.cn/s/blog_69e72a420102vj3h.html" ;

//读取博文页面
request(serverUrl, function (err,res) {
    if(err) return console.error(err) ;
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
    console.info({tags:tags,content:content}) ;

}) ;
