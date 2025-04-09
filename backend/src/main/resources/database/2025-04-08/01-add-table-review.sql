--liquibase formatted sql
--changeset mborecki:5
create table comment (
    id bigint not null auto_increment PRIMARY KEY,
    text varchar not null,
    
)