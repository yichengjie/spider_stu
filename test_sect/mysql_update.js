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
connection.query("update userinfo u set u.name  = 'yicj2' ", function (err,info) {
    if(err) throw err ;
    console.info('----------------------------------') ;
    console.info('��Ӱ������� : ' + info.affectedRows) ;
    console.info('----------------------------------') ;
    //�ر����ݿ�
    connection.end() ;
}) ;