document.addEventListener('DOMContentLoaded', () => {
	const username = document.querySelector('#username');
	const list = document.querySelector('#list');
	const yesBtn = document.querySelector('#yesBtn');
	const noBtn = document.querySelector('#noBtn');
	const deleteAlert = document.querySelector('#deleteAlert');

	prepareDeleteNoConfirmationButton(noBtn);
	prepareDeleteYesConfirmationButton(yesBtn);
	prepareList(list);

});
/*
**		@prepareDeleteNoConfirmationButton set hidden class when clicked
*/
function prepareDeleteNoConfirmationButton(noBtn) {
	noBtn.addEventListener('click', e => {
		e.preventDefault();
		deleteAlert.removeAttribute('class', 'visible');
		deleteAlert.className = 'hidden';
	});
}
/*
**		@prepareDeleteYesConfirmationButton set hidden class when clicked,
**		and fetch info to server about removing item
*/
function prepareDeleteYesConfirmationButton(yesBtn) {
	yesBtn.addEventListener('click', e => {
		e.preventDefault();
		fetch(`http://localhost:3333/api/caches/${e.target.dataset.id}`,{
			method:"DELETE"
		}).then(res => res.json())
		.then(res => {
			deleteAlert.removeAttribute('class', 'visible');
			deleteAlert.className = 'hidden';
			location.reload();
		});
	});
}

/*
**		@prepareList preparing list of all items in user profile
*/
function prepareList(list) {
	fetch(`http://localhost:3333/api/caches/author?author=${username.innerText}`)
	.then(data => data.json())
	.then(data => {
		addLiToUl(data, list);
	});
}

/*
**		@addLiToUl format list items
*/
function addLiToUl(data, resultList){

	const deleteAlert = document.querySelector('#deleteAlert');
	const yesBtn = document.querySelector('#yesBtn');
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
		a2.setAttribute('href',`/profile/edit-cache?id=${item._id}`);
		a2.setAttribute('data-id',item._id);
		a3.innerText='Delete geocache';
		a3.classList.add('btn');
		a3.classList.add('del');
		a3.setAttribute('data-id',item._id);
		a3.addEventListener('click', e => {
			e.preventDefault();
			deleteAlert.removeAttribute('class', 'hidden');
			deleteAlert.className = 'visible';
			yesBtn.setAttribute('data-id', item._id);
		});

		li.appendChild(a1);
		li.appendChild(a2);
		li.appendChild(a3);
		resultList.appendChild(li);
	});
}
