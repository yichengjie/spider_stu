/**
 * Created by yicj on 2016/5/27.
 */
var request = require('request') ;

request('http://cnodejs.org/', function (err,res,body) {
    if(!err&&res.statusCode==200){
        console.info(body) ;
    }
}) ;