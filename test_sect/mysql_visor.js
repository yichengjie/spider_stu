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
    //���ɵ����Ӳ�����ʹ��ʱ������һ���µ�����
    connection  = mysql.createConnection(db_config) ;
    connection.connect(function (err) {
        //�����ӳɹ���ʧ��ʱ������ô˻ص�����
        if(err){
            console.log('�������ݿ�ʱ���� : '+err)
            setTimeout(handleDisconnect,2000) ;
        }
    }) ;
    connection.on('error', function (err) {
        console.log('���� : ' + err) ;
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect() ;
        }else{
            throw err ;
        }
    }) ;
}


handleDisconnect() ;