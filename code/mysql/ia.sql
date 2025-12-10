-- Insertion de données pour la table role
INSERT INTO emateriel_dev.role (name) VALUES
('Administrateur'),
('Client'),
('Modérateur');

-- Insertion de données pour la table user
INSERT INTO emateriel_dev.user (firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', 'MotDePasse123!', '0612345678', '12 Rue de Paris, 75001 Paris', '12 Rue de Paris, 75001 Paris', 2),
('Marie', 'Martin', 'marie.martin@example.com', 'SecurePass456!', '0623456789', '45 Avenue des Champs, 75008 Paris', '45 Avenue des Champs, 75008 Paris', 2),
('Pierre', 'Bernard', 'pierre.bernard@example.com', 'AdminPass789!', '0634567890', '78 Rue de Lyon, 69003 Lyon', '78 Rue de Lyon, 69003 Lyon', 1),
('Sophie', 'Durand', 'sophie.durand@example.com', 'UserPass123!', '0645678901', '10 Boulevard de la République, 13001 Marseille', '10 Boulevard de la République, 13001 Marseille', 2);

-- Insertion de données pour la table payment_method
INSERT INTO emateriel_dev.payment_method (name) VALUES
('Carte bancaire'),
('PayPal'),
('Virement'),
('Chèque');

-- Insertion de données pour la table category
INSERT INTO emateriel_dev.category (name, description) VALUES
('Informatique', 'Ordinateurs, accessoires et périphériques'),
('Téléphonie', 'Smartphones, tablettes et accessoires'),
('Électroménager', 'Appareils électroménagers pour la maison'),
('Bureautique', 'Fournitures et matériel de bureau');

-- Insertion de données pour la table product
INSERT INTO emateriel_dev.product (image, price, description, stock) VALUES
('ordinateur_portable.jpg', 899, 'Ordinateur portable 15 pouces, 16Go RAM, 512Go SSD', 15),
('smartphone_x.jpg', 699, 'Smartphone X, 128Go, écran AMOLED 6.5 pouces', 30),
('imprimante_laser.jpg', 199, 'Imprimante laser noir et blanc, 30ppm', 8),
('clavier_sans_fil.jpg', 49, 'Clavier sans fil, rétroéclairé', 50),
('aspirateur_robot.jpg', 299, 'Aspirateur robot, autonomie 2h', 12);

-- Insertion de données pour la table category_product
INSERT INTO emateriel_dev.category_product (category_id, product_id) VALUES
(1, 1), -- Informatique - Ordinateur portable
(1, 3), -- Informatique - Imprimante laser
(1, 4), -- Informatique - Clavier sans fil
(2, 2), -- Téléphonie - Smartphone X
(3, 5), -- Électroménager - Aspirateur robot
(4, 3), -- Bureautique - Imprimante laser
(4, 4); -- Bureautique - Clavier sans fil

-- Insertion de données pour la table orders
INSERT INTO emateriel_dev.orders (name, image, total, descrption, user_id, payment_method_id) VALUES
('Commande ordinateur portable', 'ordinateur_portable.jpg', 899, 'Ordinateur portable 15 pouces, livraison standard', 1, 1),
('Commande smartphone', 'smartphone_x.jpg', 699, 'Smartphone X, livraison express', 2, 2),
('Commande imprimante', 'imprimante_laser.jpg', 199, 'Imprimante laser, livraison standard', 3, 1),
('Commande clavier', 'clavier_sans_fil.jpg', 98, '2 claviers sans fil, livraison standard', 4, 3);

-- Insertion de données pour la table line_order
INSERT INTO emateriel_dev.line_order (order_id, product_id, qty, total) VALUES
(1, 1, 1, 899),
(2, 2, 1, 699),
(3, 3, 1, 199),
(4, 4, 2, 98);

-- Insertion de données pour la table notice
INSERT INTO emateriel_dev.notice (product_id, name) VALUES
(1, 'Notice ordinateur portable.pdf'),
(2, 'Notice smartphone X.pdf'),
(3, 'Notice imprimante laser.pdf'),
(4, 'Notice clavier sans fil.pdf'),
(5, 'Notice aspirateur robot.pdf');
