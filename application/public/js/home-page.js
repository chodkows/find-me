document.addEventListener('DOMContentLoaded', () => {
	const longitute = document.querySelector('#lng');
	const latitute = document.querySelector('#lat');
	const distance = document.querySelector('#dist');
	const form = document.querySelector('.form');
	const resultList = document.querySelector('#list');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const lng = longitute.value;
		const lat = latitute.value;
		const dist = distance.value;
		sendToServer(lng, lat, dist)
		.then(data => {
			console.log(data);
			const markers = prepareMarkers(data);
			initMap(markers, parseFloat(lng), parseFloat(lat));
			addLiToUl(data, resultList);
		});
		clearField(longitute, latitute, distance);
	});
});

function prepareMarkers(data) {
	const array = [];
	data.forEach(obj => {
		let iconImage = prepareIconImage(obj.rank);
		array.push({
			coords: {
				lng:obj.geometry.coordinates[0],
				lat: obj.geometry.coordinates[1]
			},
			iconImage: iconImage,
			content: `<h3>${obj.title}</h3></br>
			<p>Author: ${obj.name}</p></br>
			<p>Available: ${obj.available}</p></br>
			<p>Rank: ${obj.rank}</p>`
		});
	});
	return array;
}

function prepareIconImage(rank) {
	const iconBase = '';
	return iconBase;
	switch(rank){
		case "small cache" :
			return iconBase+"small_red";
			break;
		case "extra small cache" :
			return iconBase+"small_green";
			break;
		case "medium cache" :
			return iconBase+"small_blue";
			break;
		case "large cache" :
			return iconBase+"small_yellow";
			break;
		case "extra large cache" :
			return iconBase+"small_orange";
			break;
		}
}

function initMap(markers, lng=20, lat=50) {
	const options ={
		zoom: 12,
		center: { lng: lng , lat: lat }
	}
	const map = new google.maps.Map(
		document.querySelector('#map'), options);

	google.maps.event.addListener(map, 'click', (event)=> {

		addMarker({coords: event.latLng})
	});

	if(markers){
		markers.forEach( marker => {
			addMarker(marker);
		});
	}
	function addMarker(props) {
		const marker = new google.maps.Marker({
			position: props.coords,
			map: map,
			// icon: ''//jakas url do ikonki
		});
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
}


const addLiToUl = (data, resultList) => {
	const li = document.createElement('li');
	const span = document.createElement('span');
	data.forEach( item => {
		span.innerText = `Available: ${item.available},
		author: ${item.name}, title of mystery: ${item.title}`;
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
