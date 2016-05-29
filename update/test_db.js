/**
 * Created by yicj on 2016/5/29.
 */
var request = require('request') ;
var cheerio = require('cheerio') ;
var mysql = require('mysql') ;
var debug = require('debug') ;

var db_config = {
    host:'127.0.0.1',
    port:3306,
    database:'sina_blog',
    user:'root',
    password:''
} ;

var db = mysql.createConnection(db_config) ;


db.query('show tables', function (err,tables) {
    if(err){
        console.error(err.stack) ;
    }else{
        console.log(tables) ;
    }
    db.end() ;
}) ;


function saveClassItem(data,callback){

    db.query('select * from class_list where id = ? limit 1 ',[data.id], function (err) {
        if(err) return next(err) ;
        if(Array.isArray(data)&&data.length>=1){
            //分类已存在，更新一下
            db.query('update class_list set name =? ,url =? where id = ? ',[data.name,data.url,data.id],callback) ;
        }else{
            //分类不存在，添加
            db.query('insert into class_list (id,name,url) values (?,?,?)',[data.id,data,name,data.url],callback) ;
        }
    }) ;


} ;


