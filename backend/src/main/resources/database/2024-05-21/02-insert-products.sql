--liquibase formatted sql
--changeset mborecki:2

INSERT INTO `shop_application_db`.`product`(`name`,`category`,`description`,`price`,`currency`)
VALUES
    ('Produkt 1', 'kategoria 1', 'Opis 1', 10.99, 'PLN'),
    ('Produkt 2', 'kategoria 1', 'Opis 2', 12.99, 'PLN'),
    ('Produkt 3', 'kategoria 1', 'Opis 3', 14.99, 'PLN'),
    ('Produkt 4', 'kategoria 2', 'Opis 4', 16.99, 'PLN'),
    ('Produkt 5', 'kategoria 2', 'Opis 5', 19.99, 'PLN');
