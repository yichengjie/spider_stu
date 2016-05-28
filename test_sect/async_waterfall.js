/**
 * Created by yicj on 2016/5/28.
 */
var async = require('async') ;

async.waterfall([
    function(callback){
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
        // arg1 now equals 'one' and arg2 now equals 'two'
        console.info('arg1 : ' + arg1 +" , arg2 : " + arg2) ;
        callback('我出错了func2 ', 'three');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        console.info('arg1 : ' + arg1) ;
        callback('我出错了func3 ....', 'done');
    }
], function (err, result) {
    // result now equals 'done'
    console.info('err : ' + err) ;
    console.log(result);
});