/**
 * Created by yicj on 2016/5/27.
 */
var request = require('request') ;

request({
    url:'http://cnodejs.org/',
    method:'GET',
    headers:{
        'Accept-Language':'zh-CN,zh,q=0.8',
        'Cookies':'__utma=4454.11221.455353.21.341',

    }
},function(err,res,body){
    if(!err&&res.statusCode==200){
        console.info(body) ;
    }
}) ;