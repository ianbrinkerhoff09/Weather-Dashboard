var searchText = document.getElementById("search-text");
var searchButton = document.getElementById("search-button");
var mainCity = document.getElementById("main-city");
var mainDate = document.getElementById("main-date");
var mainTemp = document.getElementById("main-temp");
var mainHumi = document.getElementById("main-humi");
var mainWind = document.getElementById("main-wind");
var searchID = localStorage.length + 1;

var date = [
	document.getElementById("date1"),
	document.getElementById("date2"),
	document.getElementById("date3"),
	document.getElementById("date4"),
	document.getElementById("date5"),
];
var temp = [
	document.getElementById("temp1"),
	document.getElementById("temp2"),
	document.getElementById("temp3"),
	document.getElementById("temp4"),
	document.getElementById("temp5"),
];
var humi = [
	document.getElementById("humi1"),
	document.getElementById("humi2"),
	document.getElementById("humi3"),
	document.getElementById("humi4"),
	document.getElementById("humi5"),
];
var wind = [
	document.getElementById("wind1"),
	document.getElementById("wind2"),
	document.getElementById("wind3"),
	document.getElementById("wind4"),
	document.getElementById("wind5"),
];





function forecastWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=d08fabd5a16007cee40332c9ce4a6108`,
		method: "GET",
	}).then(function (response) {
		for (let i = 0; i < 5; i++) {
			date[i].textContent = moment
				.unix(response.list[i * 8].dt)
				.format("L");
			temp[i].textContent = response.list[i * 8].main.temp;
			humi[i].textContent = response.list[i * 8].main.humidity;
			wind[i].textContent = response.list[i * 8].wind.speed;
		}
	});
}

function getCities() {
	var stored = Object.keys(localStorage);
	for (let i = 0; i < stored.length; i++) {
		var value = localStorage.getItem(stored[i]);
		const para = document.createElement("button");
		const node = document.createTextNode(value);
		para.appendChild(node);
		para.setAttribute("class", "past-search btn btn-secondary");
        para.setAttribute("type", "button")
		const element = document.getElementById("past-searches");
		element.appendChild(para);
	}
}

function saveCity(cityToSave) {
	localStorage.setItem(`city${searchID}`, cityToSave);
	searchID++;
	const para = document.createElement("button");
	const node = document.createTextNode(cityToSave);
	para.appendChild(node);
    para.setAttribute("class", "past-search btn btn-secondary");
    para.setAttribute("type", "button")
	const element = document.getElementById("past-searches");
	element.appendChild(para);
}

function mainWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d08fabd5a16007cee40332c9ce4a6108`,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		mainCity.textContent = response.name;
		mainDate.textContent = moment().format("L")
		mainTemp.textContent = response.main.temp;
		mainHumi.textContent = response.main.humidity;
		mainWind.textContent = response.wind.speed;
		// mainUVin.textContent =
	});
}















getCities();

searchButton.addEventListener("click", function (event) {
	event.preventDefault();
	let currentCity = searchText.value;
	saveCity(currentCity);
	mainWeather(currentCity);
	forecastWeather(currentCity);
});
