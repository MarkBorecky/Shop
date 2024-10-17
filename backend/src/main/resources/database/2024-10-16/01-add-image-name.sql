--liquibase formatted sql
--changeset mborecki:2
alter table product add image varchar(128) after currency;

