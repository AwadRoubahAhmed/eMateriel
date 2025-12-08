-- créer la base de données 

 CREATE DATABASE emateriel_dev;

-- Début du création des tables;

-- role
CREATE TABLE emateriel_dev.role(
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
     FOREIGN KEY (id)
       REFERENCES role(id)
) 


--  paiement
CREATE TABLE emateriel_dev.payment_metode(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    --name  VARCHAR(150) NOT NULL
) 


-- category
CREATE TABLE emateriel_dev.category(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(150) NOT NULL,
    description TEXT
)

-- product
CREATE TABLE emateriel_dev.product(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    image  VARCHAR(150) NOT NULL,
    price SMALLINT NOT NULL,
    description TEXT,
    stock SMALLINT NOT NULL
)


-- category_product
 CREATE TABLE emateriel_dev.category_product(
    category_id TINYINT,
    product_id TINYINT,
    FOREIGN KEY (category_id) REFERENCES emateriel_dev.category(id),
    FOREIGN KEY (product_id) REFERENCES emateriel_dev.product(id),
    PRIMARY KEY(category_id, product_id)
)


-- orders
CREATE TABLE emateriel_dev.orders(
     id TINYINT AUTO_INCREMENT,
     PRIMARY KEY(id),
     name  VARCHAR(150) NOT NULL,
     image VARCHAR(255) NOT NULL,
     total TINYINT NOT NULL,
     descrption TEXT,
     user_id TINYINT,
     payment_metod_id TINYINT,
     FOREIGN KEY (id) REFERENCES user(id),
     FOREIGN KEY (id) 
       REFERENCES payment_metode(id)
)




-- line_order
CREATE TABLE emateriel_dev.line_order(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    qty  SMALLINT  NOT NULL,
    total  SMALLINT NOT NULL,
    FOREIGN KEY (id)
       REFERENCES orders(id),
     FOREIGN KEY (id)
       REFERENCES product(id)
)

-- notice
CREATE TABLE emateriel_dev.notice(
    id TINYINT AUTO_INCREMENT,
    PRIMARY KEY(id),
    FOREIGN KEY (id)
    REFERENCES product(id)
)

-- Fin de la création de tables;



