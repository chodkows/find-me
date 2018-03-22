document.addEventListener('DOMContentLoaded', () => {
	const lng = document.querySelector('#lng');
	const lat = document.querySelector('#lat');
	const dist = document.querySelector('#dist');
	const form = document.querySelector('.form');
	const resultList = document.querySelector('#list');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		sendToServer(lng.value, lat.value, dist.value)
		.then(data => {
			console.log(data);
			addLiToUl(data, resultList);
		});
		clearField(lng, lat, dist);
	});
});

const addLiToUl = (data, resultList) => {
	const li = document.createElement('li');
	const span = document.createElement('span');
	data.forEach( item => {
		span.innerText = `Available: ${item.available}, author: ${item.name}, title of mystery: ${item.title}`;
		li.appendChild(span);
		resultList.appendChild(li);
	});
}

const clearField = (...args) => {
	args.forEach( arg => {
		arg.value="";
	});
}
const sendToServer = (lng, lat, dist) => {
	return new Promise((resolve, reject) => {
		fetch(`https://localhost:3333/api/caches/near?lng=${lng}&lat=${lat}&dist=${dist}`, {
		}).then(res => res.json())
			.then(data => {
				resolve(data);
		});
	});
}
