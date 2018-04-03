const patterns = {
	longitude: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
	title: /\w{5,40}/g,
}

document.addEventListener('DOMContentLoaded',() => {

	const lng = document.querySelector('#lng');
	const lat = document.querySelector('#lat');
	const size = document.querySelector('#size');
	const title = document.querySelector('#title');
	const description = document.querySelector('#description');
	const available = document.querySelector('#available');
	const form = document.querySelector('.form');
	const message = document.querySelector('#msg');
	const inputs = document.querySelectorAll('input');
	const id = document.querySelector('#id');

	message.className="display-no";

	prepareLeftSite();
	// fetch(`https://localhost:3333/api/caches/id?id=${id.innerText}`)
	// .then(res => res.json())
	// .then(res => {
	// 	console.log(res);
	// 	prepareLeftSite(res);
	// }).catch(err => console.log(err));

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const obj = {};
		obj.available = available.value;
		obj.size = size.value;
		if(title.value !== "") {obj.title = title.value;}
		if(description.value !== "") {obj.description = description.value;}
		if(lng.value !== "" && lat.value!== "") {
			obj.geometry = {
				type: "point",
				coordinates: [lat.value, lng.value]
			}
		}

		// const obj = {
		// 	available: available.value,
		// 	size: size.value,
		// 	title: title.value,
		// 	description: description.value,
		// 	geometry:{
		// 		type: "point",
		// 		coordinates: [lng.value, lat.value]
		// 	}
		// }
		console.log(obj);

		sendDataToServer(obj, id.innerText).then(res => {
			message.className="display";
			clearField(lng, lat, title, description);
			location.reload();
			prepareLeftSite();
		})
	});


	inputs.forEach( input => {
		input.addEventListener('keyup', (e) => {
			validate(e.target, patterns[e.target.attributes.name.value])
		});
	});
});


function prepareLeftSite() {

	fetch(`http://localhost:3333/api/caches/id?id=${id.innerText}`)
	.then(res => res.json())
	.then(data => {

		console.log(data);
		const lng = document.querySelector('#lngPrev');
		const lat = document.querySelector('#latPrev');
		const size = document.querySelector('#rankPrev');
		const title = document.querySelector('#titlePrev');
		const available = document.querySelector('#availablePrev');
		const descripton = document.querySelector('#descriptionPrev');

		let span1 = document.createElement('span');
		span1.innerText = data.geometry.coordinates[0];
		lng.appendChild(span1);
		let span2 = document.createElement('span');
		span2.innerText = data.geometry.coordinates[1];
		lat.appendChild(span2);
		let span4 = document.createElement('span');
		span4.innerText = data.size;
		size.appendChild(span4);
		let span5 = document.createElement('span');
		span5.innerText = data.title;
		title.appendChild(span5);
		let span6 = document.createElement('span');
		span6.innerText = data.available;
		available.appendChild(span6);
		let span7 = document.createElement('span');
		span7.innerText = data.description;
		descripton.appendChild(span7);
	}).catch(err => console.log(err));
}

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

const sendDataToServer = (obj, id) => {
	return new Promise((resolve, reject) => {
		fetch(`https://localhost:3333/api/caches/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type':'application/json'},
			body: JSON.stringify(obj)
		}).then(res => res.json())
		.then(res => {
			resolve(res);
		});
	});
}
