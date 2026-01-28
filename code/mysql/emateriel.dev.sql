DROP DATABASE IF EXISTS emateriel_dev;

-- créer la base de données 

CREATE DATABASE emateriel_dev;

-- Début du création des tables;

-- role
CREATE TABLE IF NOT EXISTS emateriel_dev.role(
 id TINYINT  AUTO_INCREMENT,
 name VARCHAR(20) NOT NULL,
 PRIMARY KEY(id) 
);

-- user
CREATE TABLE emateriel_dev.user(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    telephone VARCHAR(20) ,
    adresse_livraison  VARCHAR(150)  NOT NULL,
    adresse_facturation VARCHAR(150) NOT NULL,
    role_id TINYINT,
     FOREIGN KEY (role_id)
       REFERENCES role(id)
) ;


--  paiement
CREATE TABLE emateriel_dev.payment_method(
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    mode_paiement VARCHAR(150) NOT NULL
) ;


-- category
CREATE TABLE emateriel_dev.category(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    INDEX(name)
);

-- product
CREATE TABLE emateriel_dev.product(
    id TINYINT UNSIGNED AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(50)  NOT NULL,
    image  VARCHAR(150) NOT NULL,
    price SMALLINT UNSIGNED NOT NULL,
    description TEXT,
    stock SMALLINT UNSIGNED NOT NULL,
    category_id TINYINT,
    INDEX(name),
    FOREIGN KEY (category_id) REFERENCES emateriel_dev.category(id)
);

-- orders
CREATE TABLE emateriel_dev.orders(
     id TINYINT AUTO_INCREMENT,
     PRIMARY KEY(id),
     name  VARCHAR(50) NOT NULL,
     image VARCHAR(255) NOT NULL,
     total SMALLINT NOT NULL,
     descrption TEXT,
     user_id TINYINT,
     payment_method_id TINYINT,
     FOREIGN KEY (user_id) REFERENCES user(id),
     FOREIGN KEY (payment_method_id) 
       REFERENCES payment_method(id)
);

-- line_order
CREATE TABLE emateriel_dev.line_order(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    qty SMALLINT  NOT NULL,
    total  SMALLINT NOT NULL,
    product_id TINYINT UNSIGNED,
    order_id TINYINT,
    FOREIGN KEY (product_id)
       REFERENCES product(id),
     FOREIGN KEY (order_id)
       REFERENCES orders(id)
);

-- notice
CREATE TABLE emateriel_dev.notice(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(50) NOT NULL,
     product_id TINYINT UNSIGNED,
   FOREIGN KEY (product_id)
       REFERENCES product(id)
);

-- Fin de la création de tables;


