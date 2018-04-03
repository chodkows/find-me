const patterns = {
	longitude: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
	title: /[a-zA-Z0-9\s]{5,40}/,
	descripton: /[a-zA-Z0-9\s\.,'";:]{5,40}/
}

document.addEventListener('DOMContentLoaded',() => {

	const lng = document.querySelector('#lng');
	const lat = document.querySelector('#lat');
	const size = document.querySelector('#size');
	const title = document.querySelector('#title');
	const description = document.querySelector('#description');
	const form = document.querySelector('.form');
	const name = document.querySelector('#username');
	const message = document.querySelector('#msg');
	const inputs = document.querySelectorAll('input');
	const available = document.querySelector('#available')

	message.className="display-no";

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const obj = {
			name: name.innerText,
			size: size.value,
			title: title.value,
			description: description.value,
			available: available.value,
			geometry:{
				type: "point",
				coordinates: [lng.value, lat.value]
			}
		}
		console.log(obj);
		sendDataToServer(obj).then(res => {
			message.className="display";
			clearField(lng, lat, title, description);
		});
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
		fetch('http://localhost:3333/api/caches', {
			method: 'POST',
			headers: { 'Content-Type':'application/json'},
			body: JSON.stringify(obj)
		}).then(res => res.json())
		.then(res => {
			resolve(res);
		}).catch(err => reject(err));
	});
}
