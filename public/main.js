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
	fetch('https://localhost:8443/api/caches/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	})
	.then(res => res.json())
	.then(res => console.log(res))
}
