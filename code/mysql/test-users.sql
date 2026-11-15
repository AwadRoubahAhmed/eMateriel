-- Comptes de TEST (développement et tests automatiques uniquement, JAMAIS en production) :
--   admin@emateriel.test  / Admin-Test-2026   (Administrateur)
--   client@emateriel.test / Client-Test-2026  (Client)

INSERT INTO user (firstname, lastname, email, password, telephone, adresse_livraison, adresse_facturation, role_id) VALUES
('Admin', 'Test', 'admin@emateriel.test', '$argon2id$v=19$m=65536,t=3,p=4$4AGscdsISM1kHK9Qlx92PQ$2U5pHkATtemltBjHZv7Mi9I6JFFbGk4aUQ8c6mRM6gw', NULL, NULL, NULL, 1),
('Client', 'Test', 'client@emateriel.test', '$argon2id$v=19$m=65536,t=3,p=4$bFqs/vYRUiR3I6/I4gcUpw$ZSWuaH6dAj0YeXx/5nik4yu0vgNMbfB4uhJP57n1JHY', '0601020304', '10 rue de la Paix', '10 rue de la Paix', 2);

