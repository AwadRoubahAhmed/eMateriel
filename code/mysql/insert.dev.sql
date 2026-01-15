-- Données pour la table 'role'
INSERT INTO emateriel_dev.role (id, name) VALUES
(1, 'Administrateur'),
(2, 'Client');

-- Données pour la table 'user'
INSERT INTO emateriel_dev.user (firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', 'motdepassehash1', '0601020304', '10 Rue de la Paix, 75001 Paris', '10 Rue de la Paix, 75001 Paris', 2),
('Marie', 'Curie', 'marie.curie@admin.com', 'motdepassehash2', '0705060708', '22 Avenue des Champs, 69002 Lyon', '22 Avenue des Champs, 69002 Lyon', 1),
('Pierre', 'Leroy', 'pierre.leroy@example.com', 'motdepassehash3', '0611121314', '5 Rue du Commerce, 31000 Toulouse', '5 Rue du Commerce, 31000 Toulouse', 2);

-- Données pour la table 'payment_method'
INSERT INTO emateriel_dev.payment_method ( name) VALUES
('Carte Bancaire'),
('PayPal'),
('Virement Bancaire');

-- Données pour la table 'category'
INSERT INTO emateriel_dev.category (name, description) VALUES
('Téléphones', 'Découvrez notre sélection de smartphones dernier cri, alliant performance, design et innovation. Des modèles haut de gamme aux appareils plus accessibles, trouvez le téléphone qui correspond à vos besoins : écrans haute résolution, appareils photo professionnels, batteries longue durée et fonctionnalités intelligentes.'),
('Tabettes', 'Explorez nos tablettes tactiles, idéales pour le travail, les loisirs ou la créativité. Légères, puissantes et polyvalentes, elles offrent une expérience immersive pour regarder des films, naviguer sur le web, dessiner ou travailler en déplacement.'),
('Ordinateurs', 'Souris, claviers, écrans et casques.Retrouvez une gamme complète d’ordinateurs portables et fixes, conçus pour répondre à tous vos besoins : bureautique, gaming, création graphique ou montage vidéo. Performances optimisées, écrans haute définition et autonomie prolongée pour une productivité sans limites.'),
('accessoires', 'Protégez et personnalisez votre smartphone avec nos accessoires indispensables : coques de protection, films écrans, chargeurs rapides, batteries externes, écouteurs sans fil et bien plus. Des solutions pratiques et stylées pour optimiser l’utilisation de votre appareil au quotidien.');


-- Données pour la table 'product'
INSERT INTO emateriel_dev.product ( name, image, price, description, stock, category_id) VALUES
('Iphone 17 Pro Max', 'iphone17proMax.png', 1270, 'Un iPhone moderne et performant, offrant une excellente fluidité, un design élégant et une autonomie optimisée pour un usage quotidien sans compromis.', 82, 1),
('Iphone 16 Pro', 'iphone16pro.png', 1070, 'Un smartphone premium combinant puissance, finesse et innovation, doté d’un écran fluide et de performances avancées pour les utilisateurs exigeants.', 48, 1),
('Iphone 15 Pro Max', 'iphone15proMax.png', 899, 'Le modèle haut de gamme d’Apple avec un écran immersif, un processeur ultra-puissant et un système photo professionnel pour des photos et vidéos de qualité exceptionnelle.', 135, 1),
('Samsung Galaxy S22 Ultra', 'SamsungGalaxyS22.png', 770, 'Un des meilleurs haut de gamme Samsung de sa génération avec écran 6,8″, quadruple caméra polyvalente, batterie 5000 mAh et stylet S-Pen intégré — idéal pour productivité et photo/vidéo.', 40, 1),
('Samsung Galaxy S23 Ultra', 'samsungGalaxyS23.png', 920, 'Ultra premium avec écran AMOLED 6,8″, capteur principal 200 MP, très bonnes performances et grandes capacités photo/vidéo.', 140, 1),
('Samsung Galaxy S24 Ultra', 'samsungGalaxyS24.png', 1150, 'Version améliorée de la série Ultra avec processeur plus puissant, AI avancée, caméra 200 MP et expérience Galaxy haut de gamme.', 56, 1),
('Oppo Find X7 Ultra', 'OPPOFindX7Ultra.png', 965, 'Flagship orienté photo-mobile avec quadruple capteur 50 MP, écran AMOLED 6,82″ fluide 120 Hz, batterie 5000 mAh et performances puissantes — excellent pour photo et usage intense.', 12, 1),
('Oppo Find X8s Ultra', 'OPPOFindX8sUltra.png', 875, 'Successeur du X7 Ultra avec design plus fin, batterie plus grande (~6100 mAh), écran LTPO 6,82″ QHD+ et technologie photo avancée, parfait pour créateurs et utilisateurs exigeants.', 17, 1),
('Oppo Find X9 Ultra', 'OPPOFindX9Ultra.png', 999, 'Version encore plus ambitieuse avec capteur photo principal potentiellement jusqu’à 200 MP + grande batterie (~6400-7000 mAh) pour autonomie record et performances premium.', 22, 1),
('Redmi Note 12', 'redmiNote12.png', 280, 'Un excellent rapport qualité-prix avec un grand écran, une bonne autonomie et des performances solides pour une utilisation quotidienne.', 40, 1),
('Redmi Note 13 Pro Plus', 'redmiNote13proPlus.png', 440, 'Plus fluide et plus élégant, le Redmi Note 13 offre un écran amélioré, de meilleures performances et une expérience utilisateur encore plus agréable.', 20, 1),
('Redmi Note 14 Pro Plus', 'redmiNote14ProPlus.png', 645, 'Un smartphone polyvalent et moderne, avec un design soigné, une autonomie renforcée et des performances adaptées à tous les usages.', 9, 1),
('iPad Pro 12', 'iPadPro12.png', 1200, 'Ordinateur portable puissant conçu pour le gaming avec carte graphique dédiée.', 20, 2),
('Samsung Galaxy S11 Ultra', 'samsungGalaxyS11Ultra.png', 750, 'Carte graphique haute performance pour des expériences de jeu immersives.', 15, 2),
('Huawei Mediapad T3', 'huaweiMediapadT3.png', 120, 'Clavier mécanique avec switchs tactiles.', 50, 2),
('Samsung Galaxy Tab S6', 'samsungGalaxyTabS6.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 2),
('ipad Pro 10', 'ipadPro10.png', 1200, 'Ordinateur portable puissant conçu pour le gaming avec carte graphique dédiée.', 20, 2),
('iPad Pro 14.png', 'iPadPro14.png', 750, 'Carte graphique haute performance pour des expériences de jeu immersives.', 15, 2),
('iPad Air 13', 'iPadAir13.png', 120, 'Clavier mécanique avec switchs tactiles.', 50, 2),
('Android 12', 'android12.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 2),
('Lenovo Tab 10', 'lenovoTab10.png', 120, 'Clavier mécanique avec switchs tactiles.', 50, 2),
('iPad Air 16', 'iPadAir16.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 2);


-- Données pour la table 'orders'
INSERT INTO emateriel_dev.orders (name, image, total, descrption, user_id, payment_method_id) VALUES
('Commande #20230001', 'order_1.png', 1320, 'un laptop et d\.', 1, 1),
('Commande #20230002', 'order_2.png', 750, 'une carte graphique.', 3, 2)
ON DUPLICATE KEY UPDATE
name = VALUES(name),
total = VALUES(total),
image = VALUES(image),
descrption = VALUES(descrption);



-- INSERT INTO emateriel_dev.line_order (qty, total, product_id, order_id) VALUES
-- (1, 1, 1200, 1), -- 1 x Laptop Gaming X1 pour la Commande #20230001
-- (2, 1, 120, 1), -- 1 x Clavier Mécanique Pro pour la Commande #20230001
-- (3, 1, 750, 2); -- 1 x Carte Graphique RTX 3080 pour la Commande #20230002;

-- -- Données pour la table 'notice'
-- INSERT INTO emateriel_dev.notice (name, product_id) VALUES
-- ('Manuel_Laptop_X1.pdf', 1),
-- ('Guide_Installation_RTX3080.html', 2),
-- ('Spécifications_Clavier_Pro.docx', 3);