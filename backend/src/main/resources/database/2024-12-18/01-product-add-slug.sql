--liquibase formatted sql
--changeset mborecki:3

alter table product add slug varchar(255) after image;
alter table product add constraint unique_key_product_slug unique key(slug)

