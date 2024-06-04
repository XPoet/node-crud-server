# 创建空数据库
DROP DATABASE IF EXISTS test_express;
CREATE DATABASE test_express;

# 选择数据库
USE test_express;

# 创建 user 表
CREATE TABLE `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入测试数据
INSERT INTO user (`name`, `password`) VALUES ('user1', '123456');
INSERT INTO user (`name`, `password`) VALUES ('user2', '123456');
INSERT INTO user (`name`, `password`) VALUES ('user3', '123456');
