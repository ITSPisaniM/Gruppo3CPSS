# Gruppo3CPSS
ProjectWork
Creare una applicazione Web con le seguenti caratteristiche:
    1. Una Azienda acquista degli item (TItems) da vari fornitori (TFornitori)  che poi vende esclusivamente tramite Amazon
    2. Scopo dell’applicazione è aggiornare la giacenza degli item  in base ai dati delle vendite fornite da una simulazione della  Amazon Selling Partner API e in base agli acquisti fatti dai fornitori
    3. Accesso tramite Username/password (senza registrazione) (TUsers): solo gli utenti autorizzati potranno utilizzare l’applicazione
    4. Creare una procedura di importazione dei dati da una api che simula la Amazon Selling Partner API
        4.1. Importazione  in un database (TOrders) degli orders effettuando una opportuna chiamata GET alla api  (vi verrà fornito l’ endpoint corretto che simula una chiamata alla Amazon Selling Partner API reale).
        4.2. Importazione (nella TOrderItems)  degli item legati ad ogni order importato nel punto precedente  effettuando una opportuna chiamata GET alla api  (vi verrà fornito l’ endpoint corretto che simula una chiamata alla Amazon Selling Partner API reale).
        4.3. La procedura di importazione deve tenere traccia degli order  (e relativi orderItems ) già importati nel database al fine di evitare importazioni multiple
        4.4. Implementazione dello scarico della giacenza degli item venduti su Amazon
    5. Creare una procedura di caricamento manuale degli acquisti (TAcquisti e TAcquistiItems) e implementare il carico della giacenza di magazzino per ogni Acquisto 
    6. L’applicazione permetterà di visualizzare/modificare  tutti i dati disponibili nel database  
    7. Implementare una pagina “Analisi Vendite” che fornisce delle analisi numeriche e grafiche sulle vendite su Amazon (simulando una visualizzazione semplificata stile PowerBI o Qlik Sense permettendo all’utente  di effettuare delle analisi  in una settimana specifica o tutte le settimane)
        7.1. Quantità totali vendute e totale ricavi per settimana (indipendentemente dagli items e dalle categorie)
        7.2. Quantità totali vendute e totale ricavi per items e per settimana (indipendentemente dalle categorie)
        7.3. Quantità totali vendute e totale ricavi per categoria e per settimana







