document.addEventListener('DOMContentLoaded', () => {
	const username = document.querySelector('#username');
	const list = document.querySelector('#list');


	fetch(`https://localhost:3333/api/caches/author?author=${username.innerText}`)
	.then(data => data.json())
	.then(data => {
		console.log(data);
		addLiToUl(data, list);
	});

});



function addLiToUl(data, resultList){

	data.forEach( item => {
		const li = document.createElement('li');
		const span = document.createElement('span');
		const a1 = document.createElement('a');
		const a2 = document.createElement('a');
		const a3 = document.createElement('a');

		span.innerText = `Author: ${item.name}, title: ${item.title}, available: ${item.available}`;
		a1.appendChild(span);
		a1.classList.add('description')
		a2.innerText='Edit geocache';
		a2.classList.add('btn');
		a2.setAttribute('href','/profile/edit-cache');
		a3.innerText='Delete geocache';
		a3.classList.add('btn');
		a3.setAttribute('href','/profile/delete-cache');
		li.appendChild(a1);
		li.appendChild(a2);
		li.appendChild(a3);
		resultList.appendChild(li);
	});
}
