let daysTiles = document.querySelectorAll('li');
let latitude;
let longitude;
document.querySelector('.selectCity input').addEventListener('keypress',function(event){
    if(event.key == 'Enter'){
    document.querySelector('button').click();
}
})
navigator.geolocation.getCurrentPosition(setPosition);
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getCurrentWeather(latitude, longitude);
  }

function selectCity(){
    let city = document.querySelector('input');
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=5&appid=e097db01d3950d1fa7a66a2926093e0f`)
    .then(function (resp) {return resp.json()})
    .then((function (data) {
        document.querySelector('.cityresults').style.display='block';
        document.querySelector('.cityresults').innerHTML='';
        data.forEach(element => {
            let town = document.createElement('li');
            town.innerHTML = element.name + ' ' + element.country;
            town.addEventListener('click', function(){getCurrentWeather(element.lat,element.lon)});
            document.querySelector('.cityresults').append(town);
        });
        
    }))
}

function getTime(unix){
    return new Date(unix*1000).toLocaleTimeString();
}

function temperature(temp){
    return `<b>${Math.round(temp-273.15)+'\xB0C'}</b>`;
}

function getWeekday(unix){
    let weekday = new Date(unix*1000).getDay();
    let today = new Date().getDay();
    if(weekday - today == 0){
        return 'Сегодня';
    }
    if(weekday - today == 1){
        return 'Завтра';
    } else {
        switch (weekday) {
            case 1:
                return 'Понедельник';
            case 2:
                return 'Вторник';
            case 3:
                return 'Среда';
            case 4:
                return 'Четверг';
            case 5:
                return 'Пятница';
            case 6:
                return 'Суббота';
            case 0:
                return 'Воскресенье';
            default:
                break;
        }
    }
}

function getWindDirection(deg){
    switch (true) {
        case (deg<22.5 || deg<360 && deg>=337.5):
            return '&#8595; С'
        case deg < 67.5:
            return '&#8601; С-В'
        case deg < 112.5:
            return '&#8592; В'
        case deg < 157.5:
            return '&#8598; Ю-В'
        case deg < 202.5:
            return '&#8593; Ю'
        case deg < 247.5:
            return '&#8599; Ю-З'
        case deg < 292.5:
            return '&#8594; З'
        case deg < 337.5:
            return '&#8600; С-З'
        default:
            break;
    }
}

function getImage(conditions){
    switch (true) {
        case conditions == 800:
            return './img/clear.jpg'
        case conditions < 300:
            return './img/storm.jpg';
        case conditions < 400:
            return './img/drizzle.jpg';
        case conditions < 600:
            return './img/rain.jpg';
        case conditions < 700:
            return './img/snowfall.jpg'
        case conditions < 770:
            return './img/mist.jpg'
        case conditions < 800:
            return './img/shelf_cloud.jpg'
        case conditions < 803:
            return './img/scattered.jpg'
        case conditions < 805:
            return './img/overcast.jpg'
    }
}

function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=e097db01d3950d1fa7a66a2926093e0f`)
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        document.querySelector('section').style.display='flex';
        document.querySelector('section').innerHTML=`
        <p>Погода в</p>
        <h1 class="city">${data.name.toUpperCase()}</h1>
        <p class="temp">${temperature(data.main.temp)}</p>
        <p class="description">${data.weather[0].description}</p>
        <p>Ощущается как: ${temperature(data.main.feels_like)}</p>
        <p>Ветер ${getWindDirection(data.wind.deg)}<br><b>${Math.round(data.wind.speed)}</b> м/с</p>
        ${data.wind.gust?`<p>Порывы до <b class='warning'>${Math.round(data.wind.gust)}</b> м/с</p>`:``}
        <p class="pressure">Давление: <span>${data.main.pressure} hPa</span></p>
        <p>Восход: ${getTime(data.sys.sunrise)}</p>
        <p>Закат: ${getTime(data.sys.sunset)}</p>
        `;
    document.querySelector('body').style.backgroundImage = `url(${getImage(data.weather[0].id)})`;
    getForecast(lat, lon);
});
}

function getForecast(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&exclude=current,minutely,hourly,alerts&appid=e097db01d3950d1fa7a66a2926093e0f`)
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        console.log(data.daily);
        document.querySelector('.forecast').style.display='block';
        for (let i = 0; i < daysTiles.length; i++) {
            daysTiles[i].innerHTML = `
            <h2>${getWeekday(data.daily[i].dt)}</h2>
            <p class="temp">${temperature(data.daily[i].temp.day)}</p>
            <p class="pressure">Ночью ${temperature(data.daily[i].temp.night)}</p>
            <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">
            <p class="description">${data.daily[i].weather[0].description}</p>
            <p class="pressure">Давление: <span>${data.daily[i].pressure}</span>&nbsp;hPa</p>
            <p>Ветер ${getWindDirection(data.daily[i].wind_deg)}<br><b>${Math.round(data.daily[i].wind_speed)}</b> м/с</p>
            `;
        }
    });
    
}
