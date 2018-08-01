/*
* @Author: 56513
* @Date:   2018-07-30 12:58:46
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 15:40:16
*/
-- 图书信息表
create table books(
	id int not null auto_increment primary key,
	isbn varchar(20) not null,
	openid varchar(50) not null,
	title varchar(100) not null,
	image varchar(100),
	alt varchar(100) not null,
	publisher varchar(100) not null,
	summarg varchar(1000) not null,
	price varchar(100),
	rate float,
	tags varchar(100),
	author varchar(100)
)
-- 图书评论表
create table comments(
	id int not null auto_increment primary key,
	openid varchar(100) not null,
	bookid varchar(100) not null,
	comment varchar(200) not null,
	phone varchar(50),
	location varchar(50)
)