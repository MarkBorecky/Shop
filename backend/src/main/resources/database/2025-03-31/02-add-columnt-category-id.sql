--liquibase formatted sql
--changeset mborecki:5
alter table product add category_id bigint not null after category;
alter table product modify column category_id bigint not null;
alter table product drop column category;
alter table product add constraint fk_produdct_category_id foreign key (category_id) references category(id);