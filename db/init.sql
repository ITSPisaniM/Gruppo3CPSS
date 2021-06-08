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

/*Articoli Ordinati*/
create table "TArticoliOrdinati"
(
	"ArticoloOrdinatoID" serial not null
		constraint tarticoliscquistati_pk
			primary key,
	"ASIN" varchar,
	"AmazonOrderId" int,
"ItemPriceAmount" decimal,
"ItemPriceCurrencyCode" decimal,
"OrderItemId" int,
"PointsGrantedPointsMonetaryValueAmount" decimal,
"PointsGrantedPointsMonetaryValueCurrencyCode" decimal,
"PointsGrantedPointsNumber" decimal,
"PromotionIds" int,
"QuantityOrdered" int,
"QuantityShipped" int,
"ShippingPriceAmount" decimal,
"ShippingPriceCurrencyCode" decimal,
"Title" varchar
);

/*Acquisti*/
create table "TAcquisti"
(
    "AcquistoID"       serial not null
        constraint tacquisti_pk
            primary key,
    "FornitoreID"      integer,
    "DataFattura"      date,
    "NumeroFattura"    integer,
    "CaricoEffettuato" integer
);

/*Articoli Acquistati*/
create table "TArticoliAcquistati"
(
    "ArticoloAcquistoID"     serial not null
        constraint tsrticoliscquistati_pk
            primary key,
    "AcquistoID"             integer,
    "ITemID"                 date,
    "QuantitaAcquistata"     integer,
    "PrezzoUnitarioAcquisto" integer
);
/*ordini*/
create table "TOrders"
(
    "AmazonOrderId"                   serial not null
        constraint torders_pk
            primary key,
    "BuyerEmail"                      varchar,
    "BuyerName"                       varchar,
    "CompanyLegalName"                varchar,
    "EarliestShipDate"                date,
    "FulfillmentChannel"              integer,
    "IsBusinessOrder"                 boolean,
    "IsGlobalExpressEnabled"          boolean,
    "IsPremiumOrder"                  boolean,
    "IsPrime"                         boolean,
    "IsSoldByAB"                      boolean,
    "LastUpdateDate"                  date,
    "LatestShipDate"                  date,
    "MarketplaceId"                   integer,
    "NumberOfItemsShipped"            integer,
    "NumberOfItemsUnshipped"          integer,
    "OrderStatus"                     integer,
    "OrderType"                       varchar,
    "PaymentMethod"                   varchar,
    "PaymentMethodDetails"            varchar,
    "PurchaseDate"                    date,
    "PurchaseOrderNumber"             integer,
    "ShipmentServiceLevelCategory"    integer,
    "ShippingAddressCity"             varchar,
    "ShippingAddressLine1"            varchar,
    "ShippingAddressName"             varchar,
    "ShippingCityStateOrRegion"       varchar,
    "ShippingStateOrRegionPostalCode" integer
);


