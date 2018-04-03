document.addEventListener('DOMContentLoaded', () => {
	const longitute = document.querySelector('#lng');
	const latitute = document.querySelector('#lat');
	const author = document.querySelector('#author');
	const title = document.querySelector('#title');
	const formCoords = document.querySelector('#formCoords');
	const formAuthorOrTitle = document.querySelector('#formAuthorOrTitle');
	const resultList = document.querySelector('#list');
	const inputs = document.querySelectorAll('input');
	const initialLng = 50.06143;
	const initialLat = 19.93658;
	const user = document.querySelector('#user');


/*
**		events for inputs for validation
*/
	inputs.forEach( input => {
		input.addEventListener('keyup', (e) => {
			validate(e.target, patterns[e.target.attributes.name.value])
		});
	});

/*
**		Initialization of map
*/
	initializeMap(initialLat, initialLng);

/*
**		Searching for coordinates
*/
	formCoords.addEventListener('submit', (e) => {
		e.preventDefault();
		const lng = longitute.value;
		const lat = latitute.value;
		lookForLatLng(lat, lng);
		clearField(longitute, latitute);
	});

	/*
	**		Searching for author or title
	*/
	formAuthorOrTitle.addEventListener('submit', (e) => {
		e.preventDefault();
		const authorName = author.value;
		const titleOfCache = title.value;
		lookForAuthorOrTitle(authorName, titleOfCache, resultList);
		clearField(title, author);
	});

	// prepareButtonInMarkers();
});

/*
**		validation patterns
*/
const patterns = {
	longitute: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
	author: /[a-zA-Z0-9\s]{5,40}/,
	title: /[a-zA-Z0-9\s]{5,40}/,
}

/*
**		checking fields are valid
*/
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

/*
**		searchin for coordinates
*/
function lookForLatLng(lat ,lng) {
	sendCoordsToServer(lng, lat)
	.then(data => {
		console.log(data);
		const markers = prepareMarkers(data);
		initMap(markers, parseFloat(lng), parseFloat(lat));
	});
}

/*
**		searchng for author or title
*/
function lookForAuthorOrTitle(author, title, resultList) {
	if(author && author !== ""){
		sendAuthorToServer(author)
		.then( data => {
			addLiToUl(data, resultList);
		});
	}
	if(title && title !== ""){
		sendTitleToServer(title)
		.then(data => {
			addLiToUl(data, resultList);
		});
	}
}

/*
**		init map on document ready
*/
function initializeMap(initLat, initLng){
	sendCoordsToServer(initLat, initLng)
	.then(data => {
		const markers = prepareMarkers(data);
		initMap(markers, initLat, initLng);
	});
}

/*
**		preparing markers for @initMap
*/
function prepareMarkers(data) {
	const user = document.querySelector('#user');
	const array = [];
	data.forEach(obj => {
			array.push({
				coords: {
					lng:obj.geometry.coordinates[0],
					lat: obj.geometry.coordinates[1]
				},
				content: `<h3>${obj.title}</h3>
				<p>Author: ${obj.name}</br>
				Available: ${obj.available}</br>
				Size: ${obj.size}</br>
				Coordinates: ${obj.geometry.coordinates[1]}, ${obj.geometry.coordinates[0]}</p>`

		});
	});
	return array;
}


var markers = [];
var map;

/*
**		method preparing marker
*/
function addMarker(props) {
	const marker = new google.maps.Marker({
		position: props.coords,
		map: map,
	});
	markers.push(marker);

	if(props.iconImage) {
		marker.setIcon(props.iconImage)
	}
	if(props.content){
		const infoWindow = new google.maps.InfoWindow({
			content:  props.content
		});
		marker.addListener('click', () => {
			infoWindow.open(map, marker);
		});
	}
}
/*
**
*/
function setMapOnAll(map) {
	for(let i=0; i< markers.length; i++){
		markers[i].setMap(map);
	}
}
/*
**
*/
function clearMarkers() {
	setMapOnAll(null);
}

/*
**		main method to initialize map
*/
function initMap(markers, lng, lat) {
	const options ={
		zoom: 12,
		center: { lng: parseFloat(lng) , lat: parseFloat(lat) }
	}
	map = new google.maps.Map(document.querySelector('#map'), options);
	prepareMarkersOnClick();
	if(markers){
		addMarkers(markers);
	}
}
/*
**		preparing markers when map is dragged
*/
function prepareMarkersOnClick(){
	google.maps.event.addListener(map, 'click', (event)=>{
		const lat =  event.latLng.lat;
		const lng =  event.latLng.lng;
		sendCoordsToServer(lng(), lat())
		.then(data => {
			data.forEach(obj => {
				const markers = prepareMarkers(data);
				clearMarkers();
				if(markers){
					addMarkers(markers);

				}
			});
		});
	});
}

/*
**
*/
function addMarkers(markers) {
	markers.forEach( marker => {
		addMarker(marker);
	});
}

/*
**		adding elements to list
*/
function addLiToUl(data, resultList){
	data.forEach( item => {
		const li = document.createElement('li');
		const span = document.createElement('span');
		const a = document.createElement('a');
		span.innerText = `Author: ${item.name}, title: ${item.title}, available: ${item.available}`;
		a.setAttribute('href', '#');
		a.setAttribute('target','_blank');
		a.appendChild(span)
		li.appendChild(a);
		resultList.appendChild(li);
	});
}

/*
**		cleaning form fields
*/
function clearField(...args){
	args.forEach( arg => {
		arg.value="";
	});
}

/*
**		sending to api coordinates to find caches
*/
function sendCoordsToServer(lng, lat){
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3333/api/caches/near?lng=${lng}&lat=${lat}`)
		.then(res => res.json())
			.then(data => {
				resolve(data);
		});
	});
}

/*
**		sending to api coordinates to find caches
*/
function sendAuthorToServer(author){
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3333/api/caches/author?author=${author}`)
		.then(res => res.json())
			.then(data => {
				console.log(data);
				resolve(data);
		});
	});
}

/*
**		sending to api coordinates to find caches
*/
function sendTitleToServer(title){
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3333/api/caches/title?title=${title}`)
		.then(res => res.json())
			.then(data => {
				resolve(data);
		});
	});
}
