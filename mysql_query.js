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

//ִ�в�ѯ
connection.query('select * from userinfo ', function (err,rows) {
    if(err) throw err ;
    console.info('----------------------------------') ;
    rows.forEach(function (item) {
        console.info(JSON.stringify(item) ) ;
    })
    console.info('----------------------------------') ;
    //�ر����ݿ�
    connection.end() ;
}) ;