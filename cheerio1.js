/**
 * Created by yicj on 2016/5/27.
 */
var cheerio = require('cheerio') ;

var $ = cheerio.load('<h2 class="title">hello world</h2>') ;

$('h2.title').text('Hello there ! ') ;

$('h2').addClass('welcome') ;

console.info($.html()) ;