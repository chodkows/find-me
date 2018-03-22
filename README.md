Find me 

API
Przed uruchomieniem aplikacji w katalogu głównym należy storzyć katalog 'config'.
W katalogu powinny znaleźć się pliki:
-cert.pem
-key.pem
-keys.js
Schemat zawartości pliku keys.js: 
module.exports = {
	mongodb: {
		mongoURL: 'adresDoBazyDanych'
	}
}


Application
Przed uruchomieniem aplikacji należy do katalogu 'config' dodać pliki konfiguracyjne.
W katalogu powinny znaleźć się pliki:
-cert.pem
-key.pem
-keys.js
Schemat zawartości pliku keys.js: 
module.exports = {
	session: {
		cookieKey: 'stringDlaCookie'
	},
	mongodb: {
		mongoURL: 'adresDoBazyDanych'
	},
	google: {
		clientID: 'clientID',
		clientSecret: 'clientSecret',
	},
	facebook: {
		clientID: 'clientID',
		clientSecret: 'clientSecret',
	}
}
