Find me 

Aplikacja składa się z dwóch części. 

Pierwsza część to serwis udostępniający restowe api. Ta część aplikacji odpowiada za zarządzanie "geoskrytkami". 
Serwis dostępny jest pod adresem http://3333:localhost/api
Endpointy: 
GET/caches/author - wyszukiwanie listy geoskrytek za pomocą autora.
GET/caches/id - wyszukiawnie listy geoskrytek za pomocą id.
GET/caches/title - wyszukiwanie listy geoskrytek za pomocą tytułu.
GET/caches/near - wyszukiwanie listy geoskrytek za pomocą współrzędnych.
POST/caches - dodanie nowej geoskrytki.
PUT/caches/:id - edytowanie geoskrytki, przez wyszukanie jej za pomocą id.
DELETE/caches/:id - usuwanie geosktytki, przez wyszukanie jej za pomocą id.
Aplikacja przetrzymuje dane za pomocą zdalnej bazy danych mLab opartej na mongoDB.
W celu zmiany bazy danych należy podmienić link do bazy, który znajduje się w katalogi api/config.

W celu uruchomienia serwisu należy przejść do katalogu ./api i uruchomić polecenie "npm start".

Część druga aplikacji jest częścią właściwą. Aplikacja dostępna jest pod adresem https://localhost:8443
Aplikacja podzielona jest na kilka widoków:
-strona główna z mapą
-strona profilu użytkownika
-strona logowania
-strona z formularzem dodawania nowej geoskrytki
-strona z formularzem do edycji geoskrytki
Aplikacja umożliwia logowanie za pomocą serwisów google oraz facebook.
Aplikacja wykorzystuje protokół https. W celu zmiany klucza publicznego i certyfkatu należy umieścić je w katalogu ./application/config.
Aplikacja wykorzystuje zewnętrzną bazę danych mLab do przetrzymywania użytkowników. 

W celu uruchomienia aplikacji należy przejść do katalogu ./application i uruchomić polecenie "npm start".

