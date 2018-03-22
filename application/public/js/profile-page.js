document.addEventListener('DOMContentLoaded', () => {
	const username = document.querySelector('#username');
	const list = document.querySelector('#list');

	fetch(`https://localhost:3333/api/caches/user`, {
		method: 'POST',
		headers: {
			'ConentType': 'application/json'
		},
		body: JSON.stringify({name: username})
	})
	.then(data => data.json())
	.then(data => {
		console.log(data);
		addLiToUl(data, list);
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
