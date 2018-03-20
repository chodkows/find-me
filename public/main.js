document.addEventListener('DOMContentLoaded', ()=> {
	const form = document.querySelector('form');
	const long = document.querySelector('#long');
	const lat = document.querySelector('#lat');
	const list = document.querySelector('.list ul');
	form.addEventListener('submit', (e)=> {
		sendCoordinates(long.value, lat.value);
	});
});

function sendCoordinates(long, lat) {

	const obj = {
		lng: long,
		lat: lat
	};
	fetch(`https://localhost:8443/api/caches/?lng=${long}&lat=${lat}`, {
		method: 'GET'
	})
	.then(res => {
		.then(res => {
			if(res.ok){
				return res.json()
			} else {
				return Promise.reject(res);
			}
		})

	})
	.then(res => console.log(res))
	.catch(err => console.log('Błąd: ', err));
}
