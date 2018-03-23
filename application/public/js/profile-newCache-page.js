document.addEventListener('DOMContentLoaded',() => {

	const lng = document.querySelector('#lng');
	const lat = document.querySelector('#lat');
	const name = document.querySelector('#name');
	const size = document.querySelector('#size');
	const title = document.querySelector('#title');
	const descrpiton = document.querySelector('#descrpiton');
	const form = document.querySelector('.form');
	const p = document.querySelector('#msg');

	form.addEventListener('submit', (e) => {

		const obj = {
			name: name.value,
			size: size.value,
			title: title.value,
			descripton: descrpiton.value,
			geometry:{
				coordinates: [lng.value, lat.value]
			}

		}
		sendDataToServer(obj).then(res => {
			clearField(lng, lat, name, size, title, descrpiton);
			writeMessage(res, p);
		})
	});
});

const writeMessage = (res, p) => {
	p.innerText = res;
}

const clearField = (...args) => {
	args.forEach( arg => {
		arg.value="";
	});
}
const sendDataToServer = (obj) => {
	return new Promise((resolve, reject) => {
		fetch('https://localhost:3333/api/caches', {
			method: 'POST',
			headers: { 'Content-Type':'application/json'},
			body: JSON.stringify(obj)
		}).then(res => res.json())
		.then(res => {
			resolve(res);
			console.log(res);
		});
	});
}
