/**
 * Created by yicj on 2016/5/28.
 */
var mysql = require('mysql') ;

var db_config = {
    host:'host',
    user:'root',
    password:'',
    database:'test'
} ;


var connection ;

function handleDisconnect (){
    //当旧的连接不能再使用时，创建一个新的连接
    connection  = mysql.createConnection(db_config) ;
    connection.connect(function (err) {
        //当连接成功或失败时，会调用此回调函数
        if(err){
            console.log('连接数据库时出错 : '+err)
            setTimeout(handleDisconnect,2000) ;
        }
    }) ;
    connection.on('error', function (err) {
        console.log('出错 : ' + err) ;
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect() ;
        }else{
            throw err ;
        }
    }) ;
}


handleDisconnect() ;