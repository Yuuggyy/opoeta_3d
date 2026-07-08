-- ============================================
-- MENU O POETA — Restaurant Italien & Lounge (Kinshasa, Gombe)
-- À exécuter APRÈS 01_schema.sql et 02_parametres.sql
-- ============================================

-- ════════ CATÉGORIES ════════
INSERT INTO public.categories (nom, description, emoji, ordre, actif) VALUES
('Entrées - Antipasti',       'Entrées et antipasti italiens',        '🥗', 1, true),
('Salades',                   'Salades composées',                    '🥬', 2, true),
('Pâtes',                     'Pâtes simples',                        '🍝', 3, true),
('Pâtes, Gnocchi et Risotto', 'Pâtes fraîches, gnocchi et risottos',  '🍚', 4, true),
('Pizzas au Feu de Bois',     'Pizzas cuites au feu de bois',         '🍕', 5, true),
('Viandes et Volailles',      'Viandes grillées et volailles',        '🥩', 6, true),
('Poissons et Crustacés',     'Poissons et fruits de mer',            '🐟', 7, true),
('Sauces et Accompagnements', 'Sauces et garnitures',                 '🍟', 8, true),
('Desserts',                  'Douceurs et desserts italiens',        '🍰', 9, true),
('Cocktails et Boissons',     'Cocktails, vins et boissons fraîches', '🍹', 10, true)
ON CONFLICT DO NOTHING;

-- ════════ ENTRÉES - ANTIPASTI ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Assiettes de Spécialités Italiennes', 'Légumes grillés, charcuterie', 26.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 1),
('Carpaccio de Bœuf roquette et Parmesan', NULL, 24.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 2),
('Avocat vinaigrette',  NULL, 13.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 3),
('Avocat crevettes grises', NULL, 26.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 4),
('Jambon de Parme et melon', NULL, 26.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 5),
('Cocktail de Crevettes', NULL, 22.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 6),
('Carpaccio de Capitaine', NULL, 20.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 7),
('Tartare de Saumon al Fresco', NULL, 25.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 8),
('Saumon fumé et ses accompagnements', NULL, 26.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 9),
('Cossas ail et piment', NULL, 18.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 10),
('Cuisses de Grenouille à l''ail', NULL, 22.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 11),
('Calamare Fritti',     NULL, 22.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 12),
('Scampi Fritti',       NULL, 22.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 13),
('Eperlan Fritti (Ndakala)', '100gr', 14.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 14),
('Parmigiana',          'Aubergines gratinées', 22.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 15),
('Mêlée de Champignons et Cossas au Basilic', NULL, 23.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 16),
('Minestrone',          NULL, 13.00, (SELECT id FROM categories WHERE nom='Entrées - Antipasti'), NULL, true, 17)
ON CONFLICT DO NOTHING;

-- ════════ SALADES ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Salade Roquette et Parmesan', NULL, 20.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 1),
('Burrata alla Caprese', 'Tomates, pignons, basilic', 26.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 2),
('Salade Niçoise',      'Thon, œufs, olives, tomates, anchois', 22.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 3),
('Salade Chèvre',       'Chèvre, pommes, raisins secs, granola', 22.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 4),
('Salade Avé Cesare',   'Poulet, avocat, parmesan', 22.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 5),
('Salade Mixte',        'Tomates, concombres, oignons', 20.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 6),
('Salade Italienne',    'Tomates, olives, roquette, jambon de Parme', 22.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 7),
('Salade au Foie Gras', 'Foie gras, figues, poires, pain d''épices', 26.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 8),
('Salade Océane',       'Saumon fumé, crevettes, tomates, chicon, cœur de palmier', 26.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 9),
('Salade Halloumi',     'Tomates, menthe, oignons, courgettes grillées, halloumi', 26.00, (SELECT id FROM categories WHERE nom='Salades'), NULL, true, 10)
ON CONFLICT DO NOTHING;

-- ════════ PÂTES (base) ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Nature',              NULL, 13.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 1),
('Pesto',               'Pignons, basilic', 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 2),
('Carbonara',           'Lardons, œuf, crème fraîche', 25.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 3),
('Pomodoro',            'Tomate', 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 4),
('Bolognese',           'Ragoût de bœuf', 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 5),
('Arrabbiata',          'Tomate, pili', 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 6),
('Puttanesca',          'Anchois, thon, câpres, tomates, olive noire', 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 7),
('Quattro Formaggi',    NULL, 20.00, (SELECT id FROM categories WHERE nom='Pâtes'), NULL, true, 8)
ON CONFLICT DO NOTHING;

-- ════════ PÂTES, GNOCCHI ET RISOTTO ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Spaghetti Crudaiola', 'Tomate fraîche froide, mozzarella, roquette, pesto', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 1),
('Spaghetti al Pollo',  'Poulet, champignons, crème fraîche', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 2),
('Penne Saumon Fumé, Crème', NULL, 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 3),
('Spaghetti ai Frutti di Mare', 'Fruits de mer', 34.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 4),
('Spaghetti alle Vongole', 'Coquillages', 34.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 5),
('Spaghetti ai Cartoccio', 'Fruits de mer, sauce tomate', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 6),
('Penne Foie Gras',     NULL, 34.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 7),
('Tagliatelle Primavera', 'Tomate fraîche, champignons, courgettes', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 8),
('Tagliatelle ai Funghi', 'Cèpes, crème fraîche', 28.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 9),
('Tagliatelle Mare e Monti', 'Champignons, petit pois, courgettes, cossa, tomates', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 10),
('Lasagna Maison',      'Bœuf', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 11),
('Ravioli Maison Carne', 'Bœuf, ou Spinaci e Ricotta, ou Cèpes (Solo, Duo ou Trio)', 26.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 12),
('Gnocchi',             'Sauce au choix', 28.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 13),
('Risotto ai Funghi ou al San Daniele', 'Cèpes, ou jambon San Daniele', 28.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 14),
('Risotto façon Paella', 'Riz safran, fruits de mer, saucisse de bœuf', 28.00, (SELECT id FROM categories WHERE nom='Pâtes, Gnocchi et Risotto'), NULL, true, 15)
ON CONFLICT DO NOTHING;

-- ════════ PIZZAS AU FEU DE BOIS ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Focaccia',            'Sel, épices', 12.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 1),
('Margherita',           'Tomate, mozzarella, origan', 22.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 2),
('Prosciutto',           'Tomate, mozzarella, jambon, champignons, olives vertes', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 3),
('Calzone',              'Tomate, mozzarella, jambon, parmesan + un ingrédient au choix', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 4),
('Diavola',              'Tomate, poivrons, mozzarella, salami piquant, olives', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 5),
('Tonino',               'Tomate, mozzarella, thon, oignons, olives', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 6),
('Hawaïenne',            'Tomate, mozzarella, jambon, ananas', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 7),
('Vegetariana',          'Tomates fraîches, mozzarella, champignons, oignons, olives, légumes grillés', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 8),
('Polo',                 'Tomate, mozzarella, poulet', 23.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 9),
('Pizza Funghi',         'Tomate, mozzarella, champignons, origan', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 10),
('Napoli',               'Tomate, mozzarella, anchois, câpres, origan', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 11),
('Capricciosa',          'Tomate, mozzarella, jambon, artichauts, olives vertes, oignons', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 12),
('Pizza O Poeta',        'Tomate, mozzarella, champignons, cèpes, tomates cerise, basilic frais', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 13),
('Rocca',                'Tomate, mozzarella, tomates cerise, roquette', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 14),
('Quattro Stagioni',     'Tomate, mozzarella, jambon de Parme, artichauts, champignons, olives noires', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 15),
('Brezaola',             'Tomate, mozzarella, brezaola, roquette, basilic', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 16),
('Cossa',                'Tomate, mozzarella, cossas, ail', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 17),
('Focaccia Garnie',      'Mozzarella, roquette, jambon de Parme', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 18),
('Quattro Formaggi',     'Tomate, quatre fromages différents, olives vertes', 25.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 19),
('Frutti di Mare',       'Tomate, mozzarella, fruits de mer', 26.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 20),
('Salmone',              'Tomate, mozzarella, crème fraîche, saumon fumé', 26.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 21),
('Supplément Ingrédient - Petit', 'Ingrédient supplémentaire au choix', 2.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 22),
('Supplément Ingrédient - Grand', 'Ingrédient supplémentaire au choix', 5.00, (SELECT id FROM categories WHERE nom='Pizzas au Feu de Bois'), NULL, true, 23)
ON CONFLICT DO NOTHING;

-- ════════ VIANDES ET VOLAILLES ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Côte à l''os',        '400gr', 32.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 1),
('Côtes d''Agneau',     NULL, 38.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 2),
('Filet Pur, Sauce au Choix', '250gr, accompagnement', 38.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 3),
('Entrecôte Irlandaise, Sauce au Choix', '350gr', 38.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 4),
('Bœuf Strogonoff',     NULL, 28.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 5),
('Straccetti Rucola e Parmigiano', 'Émincé de filet pur, roquette, copeaux parmesan', 28.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 6),
('Mix Grill',           'Bœuf, côtes d''agneaux, volaille, merguez, pdt en chemise', 30.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 7),
('Burger Beef O Poeta', 'Revisité à l''italienne', 20.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 8),
('Scaloppine al Limone', 'Escalope de veau importée, citron', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 9),
('Scaloppine Pizzaiola', 'Escalope de veau importée, câpre, tomate', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 10),
('Scaloppine Milanese', 'Escalope de veau importée panée', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 11),
('Scaloppine ai Funghi', 'Escalope de veau importée, champignons, crème fraîche', 36.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 12),
('Paillarde de Veau au Ferri', NULL, 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 13),
('Saltimbocca à la Romana', 'Escalope de veau importée, mozzarella, jambon, sauce blanche', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 14),
('Cordon Bleu',         'Escalope de veau importée panée, fourrée mozzarella, jambon', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 15),
('Souris d''Agneau aux Saveurs Orientales', 'Accompagnement couscous et légumes', 36.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 16),
('Osso Bucco',          'Jarret de bœuf, sauce tomate', 34.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 17),
('Piccata di Pollo al Limone ou Sauce Marsala', NULL, 36.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 18),
('Poussin de Ferme Grillé au Pili ou Estragon', 'Poussin entier rôti', 36.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 19),
('Poulet DG',           'Banane plantain, curry, carotte, haricot vert, poivre', 25.00, (SELECT id FROM categories WHERE nom='Viandes et Volailles'), NULL, true, 20)
ON CONFLICT DO NOTHING;

-- ════════ POISSONS ET CRUSTACÉS ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Capitaine à l''Huile d''Olive', NULL, 30.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 1),
('Dos de Capitaine Siciliana', 'Sur un lit de purée, tomate fraîche, câpres, oignon grillé', 32.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 2),
('Capitaine à la Congolaise', 'Sauce tomate, poivron', 32.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 3),
('Sole Entière Meunière', NULL, 30.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 4),
('Deux Solettes d''Ostende Grillées', NULL, 36.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 5),
('Saumon à l''Unilatérale Sauce Mousseline', NULL, 36.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 6),
('Tilapia Meunière', NULL, 30.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 7),
('Dorade Entière', 'Légumes vapeur, pommes de terre nouvelle', 36.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 8),
('Fritto Misto', 'Scampi, calamare, cossa, poisson, sauce tartare', 32.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 9),
('Cossa Ail et Piment', NULL, 32.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 10),
('Cuisses de Grenouille à l''Ail', NULL, 36.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 11),
('Calamar Fritti', NULL, 36.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 12),
('Scampi Fritti', NULL, 38.00, (SELECT id FROM categories WHERE nom='Poissons et Crustacés'), NULL, true, 13)
ON CONFLICT DO NOTHING;

-- ════════ SAUCES ET ACCOMPAGNEMENTS ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Béarnaise · Poivre Vert · Roquefort',  'Champignons, poivre concassé', 8.00, (SELECT id FROM categories WHERE nom='Sauces et Accompagnements'), NULL, true, 1),
('Frites de Pomme de Terre · Frites de Patate Douce', 'Pomme de terre nature ou sautées', 8.00, (SELECT id FROM categories WHERE nom='Sauces et Accompagnements'), NULL, true, 2),
('Croquettes de Pomme de Terre · Purée · Polenta', 'Pâtes · Riz · Banane plantain', 8.00, (SELECT id FROM categories WHERE nom='Sauces et Accompagnements'), NULL, true, 3),
('Légumes Sautés · Légumes Vapeur', NULL, 8.00, (SELECT id FROM categories WHERE nom='Sauces et Accompagnements'), NULL, true, 4),
('Chicon Braisé · Épinards en Branche · Salade', NULL, 10.00, (SELECT id FROM categories WHERE nom='Sauces et Accompagnements'), NULL, true, 5)
ON CONFLICT DO NOTHING;

-- ════════ DESSERTS ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Tiramisù',            'Mascarpone, café espresso, cacao', 8.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 1),
('Panna Cotta',         'Crème vanillée, coulis de fruits rouges', 7.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 2),
('Cannoli Siciliani',   'Pâte croustillante, ricotta sucrée, pistaches', 8.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 3),
('Gelato Misto',        'Assortiment de glaces artisanales', 6.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 4),
('Fondant au Chocolat', 'Cœur coulant, glace vanille', 8.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 5),
('Salade de Fruits Frais', NULL, 7.00, (SELECT id FROM categories WHERE nom='Desserts'), NULL, true, 6)
ON CONFLICT DO NOTHING;

-- ════════ COCKTAILS ET BOISSONS ════════
INSERT INTO public.produits (nom, description, prix, categorie_id, image_url, disponible, ordre) VALUES
('Margarita',           'Tequila, triple sec, citron vert', 10.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 1),
('Mojito',              'Rhum blanc, menthe fraîche, citron vert, soda', 10.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 2),
('Aperol Spritz',       'Aperol, prosecco, eau gazeuse, orange', 10.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 3),
('Piña Colada',         'Rhum, crème de coco, ananas', 10.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 4),
('Cocktail Maison O Poeta', NULL, 12.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 5),
('Vino Rosso / Bianco (verre)', 'Vin rouge ou blanc italien au verre', 6.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 6),
('Bouteille de Vin', 'Sélection italienne', 30.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 7),
('Espresso',            'Café italien serré', 3.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 8),
('Cappuccino',          'Espresso, lait mousseux', 4.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 9),
('Jus de Fruits Frais', NULL, 5.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 10),
('Soda / Eau Gazeuse',  NULL, 3.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 11),
('Eau Plate 75cl',      NULL, 3.00, (SELECT id FROM categories WHERE nom='Cocktails et Boissons'), NULL, true, 12)
ON CONFLICT DO NOTHING;

SELECT 'Menu O Poeta ajouté ✅ — 10 catégories, plus de 130 plats et boissons' AS status;
