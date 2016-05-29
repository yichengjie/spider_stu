create database sina_blog ;

use sina_blog ;

create table class_list (
    id       int(11)       ,
    url      text ,
    name     varchar(50) ,
    count    int(11) ,
    primary key (id)
);

create table article_list (
    id           varchar(20)     ,
    title        text ,
    url          text ,
    class_id     int(11) ,
    create_time  int(11) ,
    primary key (id,class_id)
) ;

create table article_tag(
    id        varchar(20) ,
    tag     varchar(20) ,
    primary key (id,tag)
) ;

create table article_detail(
    id        varchar(20) ,
    tags      text,
    content   longtext
) ;