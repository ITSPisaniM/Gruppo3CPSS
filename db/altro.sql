/*items*/
insert into "TItems" ("asin", "Titolo", "Categoria", "Prezzo", "Giacenza", "Brand")
values ('B07D9SB7XW', 'Minecraft', 'Gioco', 25.9, 300, 'Mojang'),
('B07VK4QKBP', 'Manubrio', 'Sport', 199.9, 10, 'Homcom'),
('B08KSS6CLT', 'The alla pesca', 'Cibo', 1.8, 25, 'Lipton'),
('B08123PCJH', 'Aria fritta', 'Altro', 11, 12, 'Aria'),
('B07K495TYN', 'Unicorno', 'Gioco', 18.9, 25, 'Gioco spa');


/*users*/
insert into "TUsers" ("Username","Password")
values ('admin','admin');

/*fornitori*/
insert into  "TFornitori" ("Nome") values ('Lorenzo'), ('Matteo'), ('MArco');
