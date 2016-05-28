/**
 * Created by yicj on 2016/5/28.
 */
/**
 * Created by yicj on 2016/5/28.
 */
var async = require('async') ;

async.series([
    function (done) {
        console.log(1) ;
        done() ;
    },
    function(done){
        console.info(2) ;
        done(new Error('error !!!!')) ;
    },
    function(done){
        console.info(3) ;
        done() ;
    }
], function (err) {
    if(err) throw err ;

    console.log('完成') ;
}) ;