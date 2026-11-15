-- Comptes de TEST (développement et tests automatiques uniquement, JAMAIS en production) :
--   admin@emateriel.test  / Admin-Test-2026   (Administrateur)
--   client@emateriel.test / Client-Test-2026  (Client)

INSERT INTO user (firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id) VALUES
('Admin', 'Test', 'admin@emateriel.test', 'scrypt$16384$8$1$FypAr6dy7no7hUOGniQaKg==$gyoqqDX8Cm46Zu/+WmAhFfH76bdb1IX4m+LAD6GFD/IvKBHkj1mLhjVFcnEDDbyhnTgnVLAG1Ew6U3eHtdyK+Q==', NULL, NULL, NULL, 1),
('Client', 'Test', 'client@emateriel.test', 'scrypt$16384$8$1$yXETVT99sDoRiiSEbKiVzg==$AMSsBQL30JI/X6cZ+OosARqBsJdJhKTReAXaAc8zJd+VhjxPciKlCRj05TecTPUNcRJsF8cEnnPMHSRXlJo9Zw==', '0601020304', '10 rue de la Paix', '10 rue de la Paix', 2);

