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
connection.query("insert userinfo (name,addr) values ('yicj','henan') ", function (err,info) {
    if(err) throw err ;
    console.info('----------------------------------') ;
    console.info('��Ӱ������� : ' + info.affectedRows) ;
    //connection.info('Id : ' + info.insertId) ;
    console.info('----------------------------------') ;
    //�ر����ݿ�
    connection.end() ;
}) ;