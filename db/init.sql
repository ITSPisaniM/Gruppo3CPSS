/*items*/
create table "TItems"
(
	"ItemID" serial not null
		constraint titems_pk
			primary key,
	ASIN varchar,
	"Titolo" varchar,
	"Categoria" varchar,
	"Prezzo" decimal,
	"Giacenza" int,
	"Brand" varchar
);

/*fornitori*/
create table "TFornitori"
(
	"FornitoreID" serial not null
		constraint tfornitori_pk
			primary key,
	"Nome" varchar not null
);



/*users*/
create table "TUsers"
(
	"UserID" serial not null
		constraint tusers_pk
			primary key,
	"Username" varchar not null,
	"Password" varchar not null
);


