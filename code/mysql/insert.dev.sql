-- Données pour la table 'role'
INSERT INTO emateriel_dev.role (id, name) VALUES
(1, 'Administrateur'),
(2, 'Client');

-- Données pour la table 'user'
INSERT INTO emateriel_dev.user (id, firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'motdepassehash1', '0601020304', '10 Rue de la Paix, 75001 Paris', '10 Rue de la Paix, 75001 Paris', 2),
(2, 'Marie', 'Curie', 'marie.curie@admin.com', 'motdepassehash2', '0705060708', '22 Avenue des Champs, 69002 Lyon', '22 Avenue des Champs, 69002 Lyon', 1),
(3, 'Pierre', 'Leroy', 'pierre.leroy@example.com', 'motdepassehash3', '0611121314', '5 Rue du Commerce, 31000 Toulouse', '5 Rue du Commerce, 31000 Toulouse', 2);

-- Données pour la table 'payment_method'
INSERT INTO emateriel_dev.payment_method (id, name) VALUES
(1, 'Carte Bancaire'),
(2, 'PayPal'),
(3, 'Virement Bancaire');

-- Données pour la table 'category'
INSERT INTO emateriel_dev.category (id, name, description) VALUES
(1, 'Téléphones', 'Découvrez notre sélection de smartphones dernier cri, alliant performance, design et innovation. Des modèles haut de gamme aux appareils plus accessibles, trouvez le téléphone qui correspond à vos besoins : écrans haute résolution, appareils photo professionnels, batteries longue durée et fonctionnalités intelligentes.'),
(2, 'Tabettes', 'Explorez nos tablettes tactiles, idéales pour le travail, les loisirs ou la créativité. Légères, puissantes et polyvalentes, elles offrent une expérience immersive pour regarder des films, naviguer sur le web, dessiner ou travailler en déplacement.'),
(3, 'Ordinateurs', 'Souris, claviers, écrans et casques.Retrouvez une gamme complète d’ordinateurs portables et fixes, conçus pour répondre à tous vos besoins : bureautique, gaming, création graphique ou montage vidéo. Performances optimisées, écrans haute définition et autonomie prolongée pour une productivité sans limites.'),
(4, 'accessoires', 'Protégez et personnalisez votre smartphone avec nos accessoires indispensables : coques de protection, films écrans, chargeurs rapides, batteries externes, écouteurs sans fil et bien plus. Des solutions pratiques et stylées pour optimiser l’utilisation de votre appareil au quotidien.');

-- Données pour la table 'product'
INSERT INTO emateriel_dev.product (id, name, image, price, description, stock) VALUES
(1, 'Laptop Gaming X1', 'images/laptop_x1.jpg', 1200, 'Ordinateur portable puissant pour le jeu vidéo.', 15),
(2, 'Carte Graphique RTX 3080', 'images/rtx_3080.jpg', 750, 'Carte graphique haut de gamme pour des performances extrêmes.', 8),
(3, 'Clavier Mécanique Pro', 'images/clavier_pro.jpg', 120, 'Clavier mécanique avec switchs tactiles.', 50),
(4, 'Processeur i7-12700K', 'images/i7_12700k.jpg', 350, 'Processeur Intel Core i7 de 12e génération.', 25);

-- Données pour la table 'category_product'
INSERT INTO emateriel_dev.category_product (category_id, product_id) VALUES
(1, 1), -- Laptop Gaming X1 est dans Ordinateurs Portables
(2, 2), -- Carte Graphique RTX 3080 est dans Composants PC
(3, 3), -- Clavier Mécanique Pro est dans Périphériques
(2, 4); -- Processeur i7-12700K est dans Composants PC

-- Données pour la table 'orders'
INSERT INTO emateriel_dev.orders (id, name, image, total, descrption, user_id, payment_method_id) VALUES
(1, 'Commande #20230001', 'images/order_1.png', 1320, 'Achat d\'un laptop et d\'un clavier.', 1, 1),
(2, 'Commande #20230002', 'images/order_2.png', 750, 'Achat d\'une carte graphique.', 3, 2);

-- Données pour la table 'line_order'
INSERT INTO emateriel_dev.line_order (id, qty, total, product_id, order_id) VALUES
(1, 1, 1200, 1, 1), -- 1 x Laptop Gaming X1 pour la Commande #20230001
(2, 1, 120, 3, 1), -- 1 x Clavier Mécanique Pro pour la Commande #20230001
(3, 1, 750, 2, 2); -- 1 x Carte Graphique RTX 3080 pour la Commande #20230002

-- Données pour la table 'notice'
INSERT INTO emateriel_dev.notice (id, name, product_id) VALUES
(1, 'Manuel_Laptop_X1.pdf', 1),
(2, 'Guide_Installation_RTX3080.html', 2),
(3, 'Spécifications_Clavier_Pro.docx', 3);