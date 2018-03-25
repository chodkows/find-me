document.addEventListener('DOMContentLoaded', (e) => {
		e.preventDefault();

		getUserInfo().then(data=> {
			let user = data;
			console.log(user);






		});




});

const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		fetch('https://localhost:8443/')
		.then(req => req.json())
		.then(json => resolve(json))
		.catch(err => console.log(err));
	});
}
