/**
 * Created by yicj on 2016/5/28.
 */
var async = require('async') ;

var arr = [1,2,3,4,5] ;

async.each(arr, function (item,done) {
    setTimeout(function () {
        console.log(item) ;
        done() ;
    },Math.random()*1000) ;
}, function (err) {
    if(err) throw err ;
    console.info('完成!') ;
}) ;

