-- ROLE
INSERT INTO role (id, name) VALUES
(1, 'Administrateur'),
(2, 'Client');

-- USER
INSERT INTO user 
(firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id)
VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', 'motdepassehash1', '0601020304', '10 Rue de la Paix', '10 Rue de la Paix', 2),
('Marie', 'Curie', 'marie.curie@admin.com', '$argon2i$v=19$m=16,t=2,p=1$amYwYWtHSFlIdEVCOUlYeg$lXnnF43UW6BaMb/DamiPZg', '0705060708', '22 Avenue des Champs', '22 Avenue des Champs', 1),
('Pierre', 'Leroy', 'pierre.leroy@example.com', 'motdepassehash3', '0611121314', '5 Rue du Commerce', '5 Rue du Commerce', 2);

-- PAYMENT METHOD
INSERT INTO payment_method (mode_paiement) VALUES
('Carte Bancaire'),
('PayPal'),
('Virement Bancaire');

-- Données pour la table 'category'
INSERT INTO category (name, description) VALUES
('Téléphones', 'Découvrez notre sélection de smartphones dernier cri, alliant performance, design et innovation. Des modèles haut de gamme aux appareils plus accessibles, trouvez le téléphone qui correspond à vos besoins : écrans haute résolution, appareils photo professionnels, batteries longue durée et fonctionnalités intelligentes.'),
('Tabettes', 'Explorez nos tablettes tactiles, idéales pour le travail, les loisirs ou la créativité. Légères, puissantes et polyvalentes, elles offrent une expérience immersive pour regarder des films, naviguer sur le web, dessiner ou travailler en déplacement.'),
('Ordinateurs', 'Souris, claviers, écrans et casques.Retrouvez une gamme complète d’ordinateurs portables et fixes, conçus pour répondre à tous vos besoins : bureautique, gaming, création graphique ou montage vidéo. Performances optimisées, écrans haute définition et autonomie prolongée pour une productivité sans limites.'),
('accessoires', 'Protégez et personnalisez votre smartphone avec nos accessoires indispensables : coques de protection, films écrans, chargeurs rapides, batteries externes, écouteurs sans fil et bien plus. Des solutions pratiques et stylées pour optimiser l’utilisation de votre appareil au quotidien.');


-- PRODUCT
INSERT INTO product ( name, image, price, description, stock, category_id) VALUES
('Iphone 17 Pro Max', 'iphone17proMax.png', 1270, 'Un iPhone moderne et performant, offrant une excellente fluidité.', 82, 1),
('Iphone 16 Pro', 'iphone16pro.png', 1070, 'Un smartphone premium combinant puissance, finesse et innovation, doté d’un écran fluide.', 48, 1),
('Iphone 15 Pro Max', 'iphone15proMax.png', 899, 'Le modèle haut de gamme d’Apple avec un écran immersif.', 135, 1),
('Samsung Galaxy S22 Ultra', 'SamsungGalaxyS22.png', 770, 'Un des meilleurs haut de gamme Samsung de sa génération avec écran 6,8″.', 40, 1),
('Samsung Galaxy S23 Ultra', 'samsungGalaxyS23.png', 920, 'Ultra premium avec écran AMOLED 6,8″, très bonnes performances.', 140, 1),
('Samsung Galaxy S24 Ultra', 'samsungGalaxyS24.png', 1150, 'Version améliorée de la série Ultra avec processeur plus puissant.', 56, 1),
('Oppo Find X7 Ultra', 'OPPOFindX7Ultra.png', 965, 'Flagship orienté photo-mobile avec quadruple capteur 50 MP.', 12, 1),
('Oppo Find X8s Ultra', 'OPPOFindX8sUltra.png', 875, 'Successeur du X7 Ultra avec design plus fin, batterie plus grande (~6100 mAh).', 17, 1),
('Oppo Find X9 Ultra', 'OPPOFindX9Ultra.png', 999, 'Version encore plus ambitieuse avec capteur photo principal potentiellement jusqu’à 200 MP.', 22, 1),
('Redmi Note 12', 'redmiNote12.png', 280, 'Un excellent rapport qualité-prix avec un grand écran, une bonne autonomie.', 40, 1),
('Redmi Note 13 Pro Plus', 'redmiNote13proPlus.png', 440, 'Plus fluide et plus élégant, le Redmi Note 13 offre un écran amélioré.', 20, 1),
('Redmi Note 14 Pro Plus', 'redmiNote14ProPlus.png', 250, 'Écran AMOLED 6,67" 120 Hz.', 29, 2),
('iPad Pro 12', 'iPadPro12.png', 1099, 'Écran Liquid Retina XDR, puce M5, 8/16 Go RAM, 128 Go à 2 To.', 100, 2),
('Samsung Galaxy S11 Ultra', 'samsungGalaxyS11Ultra.png', 1200, 'Écran 14,6", processeur 3 nm, 12/16 Go RAM, 256 Go à 1 To, batterie 11 600 mAh, Wi-Fi 7.', 98, 2),
('Huawei Mediapad T3', 'huaweiMediapadT3.png', 150, 'Écran 9,6" HD, Snapdragon 425, 2 Go RAM, 16 Go stockage, Android 7.0, batterie 4 800 mAh.', 250, 2),
('Samsung Galaxy Tab S6', 'samsungGalaxyTabS6.png', 500, 'Écran 10,5" sAMOLED, Snapdragon 855, 6 Go RAM, 128/256 Go stockage, S Pen inclus.', 125, 2),
('ipad Pro 10', 'ipadPro10.png', 799, 'Écran Liquid Retina, puce M2, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6, 5G, Apple Pencil Pro.', 22, 2),
('iPad Pro 14', 'iPadPro14.png', 750, 'Carte graphique haute performance pour des expériences de jeu immersives.', 15, 2),
('iPad Air 13', 'iPadAir13.png', 719, 'Écran Liquid Retina 13", puce M3, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6E, Apple Pencil Pro.', 35, 2),
('Android 12', 'android12.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 2),
('Lenovo Tab 10', 'lenovoTab10.png', 200, 'Écran 10,1" HD, MediaTek Helio G85, 4 Go RAM, 64 Go stockage, Android 14.', 153, 2),
('iPad Air 16', 'iPadAir16.png', 840, 'Écran Liquid Retina 16", puce M3, 16 Go RAM, 256 Go à 2 To, Wi-Fi 6E, Apple Pencil Pro.', 21, 2),
('mackbookAir 13 M3', 'mackbookAir13M3.png', 250, 'Écran AMOLED 6,67" 120 Hz, Snapdragon 7s Gen 3, 8/12 Go RAM, 256/512 Go stockage, batterie 5 500 mAh.', 29, 3),
('macBookPro 14 M3', 'macBookPro14M3.png', 1099, 'Écran Liquid Retina XDR, puce M5, 8/16 Go RAM, 128 Go à 2 To, Wi-Fi 6E, 5G, Apple Pencil Pro.', 100, 3),
('macbookPro 14 M4 Max', 'macbookPro14M4Max.png', 1200, 'Écran 14,6", processeur 3 nm, 12/16 Go RAM, 256 Go à 1 To, batterie 11 600 mAh, Wi-Fi 7.', 98, 3),
('lenovo Think Pad X 13', 'lenovoThinkPadX13.png', 150, 'Écran 9,6" HD, Snapdragon 425, 2 Go RAM, 16 Go stockage, Android 7.0, batterie 4 800 mAh.', 250, 3),
('lenovo IdeaPad 5', 'lenovoIdeaPad5.png', 500, 'Écran 10,5" sAMOLED, Snapdragon 855, 6 Go RAM, 128/256 Go stockage, S Pen inclus.', 125, 3),
('lenovo Yoga Slim 7i', 'lenovoYogaSlim7i.png', 799, 'Écran Liquid Retina, puce M2, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6, 5G, Apple Pencil Pro.', 22, 3),
('HP Elite Book', 'HPEliteBook.png', 750, 'Carte graphique haute performance pour des expériences de jeu immersives.', 15, 3),
('HP Flux 14', 'HPFlux14.png', 719, 'Écran Liquid Retina 13", puce M3, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6E, Apple Pencil Pro.', 35, 3),
('HP Pavilion 13', 'HPPavilion13.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 3),
('Dell XPS 13', 'DellXPS13.png', 200, 'Écran 10,1" HD, MediaTek Helio G85, 4 Go RAM, 64 Go stockage, Android 14.', 153, 3),
('Dell Inspiron 15', 'DellInspiron15.png', 840, 'Écran Liquid Retina 16", puce M3, 16 Go RAM, 256 Go à 2 To, Wi-Fi 6E, Apple Pencil Pro.', 21, 3),
('coque Iphone 17', 'coqueIphone17.png', 250, 'Écran AMOLED 6,67" 120 Hz, Snapdragon 7s Gen 3, 8/12 Go RAM, 256/512 Go stockage, batterie 5 500 mAh.', 29, 4),
('support Charge Telephone', 'supportChargeTelephone.png', 1099, 'Écran Liquid Retina XDR, puce M5, 8/16 Go RAM, 128 Go à 2 To, Wi-Fi 6E, 5G, Apple Pencil Pro.', 100, 4),
('Coque Oppo', 'CoqueOppo.png', 1200, 'Écran 14,6", processeur 3 nm, 12/16 Go RAM, 256 Go à 1 To, batterie 11 600 mAh, Wi-Fi 7.', 98, 4),
('coque Redmi Note 14 Pro Plus', 'coqueRedmiNote14ProPlus.png', 150, 'Écran 9,6" HD, Snapdragon 425, 2 Go RAM, 16 Go stockage, Android 7.0, batterie 4 800 mAh.', 250, 4),
('support Repliable', 'supportRepliable.png', 500, 'Écran 10,5" sAMOLED, Snapdragon 855, 6 Go RAM, 128/256 Go stockage, S Pen inclus.', 125, 4),
('bluetooth HeadPhone', 'bluetoothHeadPhone.png', 799, 'Écran Liquid Retina, puce M2, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6, 5G, Apple Pencil Pro.', 22, 4),
('coque Iphone 15 Pro Max', 'coqueIphone15ProMax.png', 750, 'Carte graphique haute performance pour des expériences de jeu immersives.', 15, 4),
('head Phone', 'headPhone.png', 719, 'Écran Liquid Retina 13", puce M3, 8 Go RAM, 128 Go à 2 To, Wi-Fi 6E, Apple Pencil Pro.', 35, 4),
('noise Cancelling Headphone sx', 'noiseCancellingHeadphonesx.png', 350, 'Processeur Intel Core i7 de 12e génération.', 25, 4),
('protection Iphone', 'protectionIphone.png', 200, 'Écran 10,1" HD, MediaTek Helio G85, 4 Go RAM, 64 Go stockage, Android 14.', 153, 4);


-- ORDERS
INSERT INTO orders (name, image, total, description, user_id, payment_method_id) VALUES
('Commande #1', 'order1.png', 1320, 'Commande simple', 1, 1),
('Commande #2', 'order2.png', 750, 'Deuxième commande', 3, 2);



-- LINE ORDER
INSERT INTO line_order (qty, total, product_id, order_id) VALUES
(1, 1270, 1, 1),
(1, 920, 2, 2);


-- INSERT NOTICE
INSERT INTO notice (name, product_id) VALUES
('Très satisfait', 1),
('Bonne qualité', 2),
('Confortable', 3);