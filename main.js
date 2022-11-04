let weather = document.querySelector('.weather__scene');
let weather__temp = document.querySelector('.weather__deg');
let humidity = document.querySelector('.humidity');
let speed = document.querySelector('.wind__speed');
let rainChance = document.querySelector('.rain');
let icon = document.querySelector('.weather__icon');
let days = document.querySelector('.day');
let searchCity = 'Pune'
let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
const getWeather = (cityName) => {
    // API ID
    const api = "bcfc77ac65464a98c49c08f86b306628";
    // API URL
    const base =
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api}`;
    fetch(base).then((response) => {
        return response.json();
    }).then((data) => {
        addweatherToPage(data);
    })
}
document.addEventListener('onload', getWeather(searchCity));
const addweatherToPage = (data) => {
    if (data.name) {
        weather.innerHTML = data.weather[0].main;
        weather__temp.innerHTML = data.main.temp + ' &#176;';
        humidity.innerHTML = data.main.humidity + "%";
        speed.innerHTML = data.wind.speed + "km/h";
        rainChance.innerHTML = data.clouds.all + "%";
        icon.innerHTML = `<img src="icons/${data.weather[0].icon}.png">`;
        days.innerHTML = daysInWeek[date.getDay()];
    } else {
        weather.innerHTML = weather__temp.innerHTML = humidity.innerHTML = speed.innerHTML = rainChance.innerHTML = '--';
        icon.innerHTML = '<img src="icons/error.png">';
    }
}
const changeMode = () => {
    document.querySelector('.location__input').innerHTML = `<input type="text">`;
    document.querySelector('.location__input input[type=text]').addEventListener('blur', (e) => {
        searchCity = e.target.value;
        document.querySelector('.location__input').innerHTML = `<span class="location__name">${searchCity}</span>`;
        getWeather(searchCity)
    });
}