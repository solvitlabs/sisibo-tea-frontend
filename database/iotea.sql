CREATE DATABASE IF NOT EXISTS `sisibotea`;

CREATE TABLE IF NOT EXISTS `users`(
`employee_id` VARCHAR(12) NOT NULL PRIMARY KEY,
`email` VARCHAR(255) UNIQUE NOT NULL,
`password` VARCHAR(255) NOT NULL, #added to the original length of 50
`status` BOOLEAN DEFAULT FALSE
);


CREATE TABLE IF NOT EXISTS `process`(
    `process_id` INT(8) AUTO_INCREMENT NOT NULL PRIMARY KEY, #added AUTO_INCREMENT
    `start_time` TIME DEFAULT NULL,
    `end_time`  TIME DEFAULT NULL,
    `elapse_time` TIME DEFAULT NULL,
    `employee_id` VARCHAR(12) NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `teadata`(
    `id` INT(6) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `process_id` INT(8) NOT NULL,
    `red` INT(3) NOT NULL,
    `green` INT(3) NOT NULL,
    `blue` INT(3) NOT NULL,
    `temperature` FLOAT(6) NOT NULL,
    `humidity` FLOAT(6) NOT NULL,
    `image_url` VARCHAR(20) NOT NULL UNIQUE,
    `image_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`process_id`) REFERENCES `process`(`process_id`)
);

CREATE TABLE IF NOT EXISTS `logs`(
`log_id` INT(6) AUTO_INCREMENT PRIMARY KEY,
`date_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`employee_id` VARCHAR(12) NOT NULL,
`description` VARCHAr(50) NOT NULL,  #example `logged in`, `logged out`
FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`)
);

CREATE TABLE IF NOT EXISTS `Tokens`(
`id` VARCHAR(20) NOT NULL  PRIMARY KEY,
`employee_id` VARCHAR(12) NOT NULL, #changed from email to employee_id
`expires` VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS `email_verification`(
`id` INT(6) AUTO_INCREMENT PRIMARY KEY,
`employee_id` VARCHAR(12) NOT NULL, #changed from email to employee_id
`secret_code` VARCHAR(20) NOT NULL,
`expires` VARCHAR(20) NOT NULL
);
