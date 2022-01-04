var searchText = document.getElementById("search-text");
var searchButton = document.getElementById("search-button");
var mainCity = document.getElementById("main-city");
var mainDate = document.getElementById("main-date");
var mainTemp = document.getElementById("main-temperature");
var mainHumidity = document.getElementById("main-humidity");
var mainWind = document.getElementById("main-wind");
var searchID = localStorage.length + 1;

var date = [
	document.getElementById("date1"),
	document.getElementById("date2"),
	document.getElementById("date3"),
	document.getElementById("date4"),
	document.getElementById("date5"),
];
var temperature = [
	document.getElementById("temp1"),
	document.getElementById("temp2"),
	document.getElementById("temp3"),
	document.getElementById("temp4"),
	document.getElementById("temp5"),
];
var humidity = [
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




// uses ajax to call the api (openweather), pulls the data for a 5 day forecast; user inpute gets sent into the '{city}' in the api url through the function action
function forecastWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=d08fabd5a16007cee40332c9ce4a6108`,
		method: "GET",
	}).then(function (response) {
		for (let i = 0; i < 5; i++) {
			date[i].textContent = moment
				.unix(response.list[i * 8].dt)
				.format("L");
				temperature[i].textContent = response.list[i * 8].main.temp;
			humidity[i].textContent = response.list[i * 8].main.humidity;
			wind[i].textContent = response.list[i * 8].wind.speed;
		}
	});
}

// stores the previously searched cities in local storage right after it has been searched. It appends thecity name to 'past-searches'
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

// saves previously searched results in local storage and will stay there until page sata has been cleared
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


// pulls the main weather information from the weather api
function mainWeather(city) {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d08fabd5a16007cee40332c9ce4a6108`,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		mainCity.textContent = response.name;
		mainDate.textContent = moment().format("L")
		temperature.textContent = response.main.temp;
		mainhumidity.textContent = response.main.humidity;
		mainWind.textContent = response.wind.speed;
	});
}



//runs function
getCities();


// event listener for button that searchs
searchButton.addEventListener("click", function (event) {
	event.preventDefault();
	let currentCity = searchText.value;
	saveCity(currentCity);
	mainWeather(currentCity);
	forecastWeather(currentCity);
});
