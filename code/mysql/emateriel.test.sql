DROP DATABASE IF EXISTS emateriel_test;

CREATE DATABASE emateriel_test
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE emateriel_test;

-- source emateriel.dev.sql;source insert.dev.sql;

-- TABLE ROLE
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
) ENGINE=InnoDB;

-- TABLE USER
CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    adresse_livraison VARCHAR(150) NOT NULL,
    adresse_facturation VARCHAR(150) NOT NULL,
    role_id INT UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- TABLE PAYMENT_METHOD
CREATE TABLE payment_method (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mode_paiement VARCHAR(150) NOT NULL
) ENGINE=InnoDB;

-- TABLE CATEGORY
CREATE TABLE category (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    INDEX(name)
) ENGINE=InnoDB;

-- TABLE PRODUCT
CREATE TABLE product (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED,
    INDEX(name),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- TABLE ORDERS
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    description TEXT,
    user_id INT UNSIGNED,
    payment_method_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_method(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- TABLE LINE_ORDER
CREATE TABLE line_order (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    qty INT UNSIGNED NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    product_id INT UNSIGNED,
    order_id INT UNSIGNED,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- TABLE NOTICE
CREATE TABLE notice (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    product_id INT UNSIGNED,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB;