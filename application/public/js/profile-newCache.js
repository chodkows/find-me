const patterns = {
	longitude: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
	author: /\w{5,20}/g,
	title: /\w{5,40}/g,
	rank: /\w{5,40}/g,
	descripton: /\w{5,40}/g,
}

document.addEventListener('DOMContentLoaded',() => {

	const lng = document.querySelector('#lng');
	const lat = document.querySelector('#lat');
	const name = document.querySelector('#name');
	const rank = document.querySelector('#rank');
	const title = document.querySelector('#title');
	const description = document.querySelector('#description');
	const form = document.querySelector('.form');
	const message = document.querySelector('#msg');
	const inputs = document.querySelectorAll('input');

	message.className="display-no";

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const obj = {
			name: name.value,
			rank: rank.value,
			title: title.value,
			description: description.value,
			geometry:{
				type: "point",
				coordinates: [lng.value, lat.value]
			}
		}

		sendDataToServer(obj).then(res => {
			message.className="display";
			clearField(lng, lat, name, rank, title, description);
		})
	});


	inputs.forEach( input => {
		input.addEventListener('keyup', (e) => {
			validate(e.target, patterns[e.target.attributes.name.value])
		});
	});
});



function validate(field, regex) {
	if(field.value === ""){
		field.removeAttribute('class','invalid')
	} else {
		if(regex.test(field.value)){
			field.className = 'valid'
		} else {
			field.className = 'invalid';
		}
	}
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
		});
	});
}
