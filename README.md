Find me 

Przed uruchomieniem aplikacji w katalogu głównym należy storzyć katalog 'key', w którym powinny znaleźć się klucz prywatny oraz certyfikat dla protokołu https -pliki cert.pem oraz key.pem. Dodatkowo aplikacja korzysta z bazy danych mongodb. W katalogu 'key' powinien znaleźć się również plik key.js, w którym znajduje się eksportowany obiekt: "module.exports = { key: 'mongodb://user:password@sciezka/dla/bazy/mlab' }".
