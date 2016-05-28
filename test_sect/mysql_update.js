/**
 * Created by yicj on 2016/5/27.
 */
var mysql = require('mysql') ;

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
}) ;

connection.connect() ;

//执行查询
connection.query("update userinfo u set u.name  = 'yicj2' ", function (err,info) {
    if(err) throw err ;
    console.info('----------------------------------') ;
    console.info('受影响的行数 : ' + info.affectedRows) ;
    console.info('----------------------------------') ;
    //关闭数据库
    connection.end() ;
}) ;