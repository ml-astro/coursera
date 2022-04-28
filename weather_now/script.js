//восход, закат
//направление ветра стрелкой, скорость
//ощущается как
//7 day/night

//заход, время сумерек
//прогноз на ночь
//северное сияние
//серебристые облака
//к индекс
//солнечные пятна
//фаза луны
//восход и заход луны
//clearoutside meteoblue
//иконки день / ночь
//фоновое изображение погодных условий
//ясно - белый, пасмурно - синий
//направление ветра стрелкой, скорость
//ощущается как
//темная тема для астро

let daysTiles = document.querySelectorAll('li');
let latitude;
let longitude;
navigator.geolocation.getCurrentPosition(setPosition);
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
  }

function getTime(unix){
    return new Date(unix*1000).toLocaleTimeString();
}

function temperature(temp){
    let tempValue = '+';
    if(temp < 0){
        tempValue='-';
    }
    return tempValue+=Math.round(temp-273.15)+'\xB0C';
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
                break;
            case 2:
                return 'Вторник';
                break;
            case 3:
                return 'Среда';
                break;
            case 4:
                return 'Четверг';
                break;
            case 5:
                return 'Пятница';
                break;
            case 6:
                return 'Суббота';
                break;
            case 0:
                return 'Воскресенье';
                break;
            default:
                break;
        }
    }
}

function getWindDirection(deg){
    switch (true) {
        case (deg<22.5 || deg<360 && deg>=337.5):
            return '&#8595; северный'
            break;
        case deg < 67.5:
            return '&#8601; северо-восточный'
            break;
        case deg < 112.5:
            return '&#8592; восточный'
            break;
        case deg < 157.5:
            return '&#8598; юго-восточный'
            break;
        case deg < 202.5:
            return '&#8593; южный'
            break;
        case deg < 247.5:
            return '&#8599; юго-западный'
            break;
        case deg < 292.5:
            return '&#8594; западный'
        case deg < 337.5:
            return '&#8600; северо-западный'
            break;
        default:
            break;
    }
}

function getImage(conditions){
    switch (conditions) {
        case 'Rain':
            return './img/rain_1920.jpg';
            break;
        case 'Clouds':
            return './img/broken.jpg';
            break;
        case 'Clear':
            return './img/clearsky.jpg';
            break;
        default:
            return './img/scattered.jpg';
            break;
    }
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=e097db01d3950d1fa7a66a2926093e0f`)
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        document.querySelector('section').innerHTML=`
        <p>Погода в</p>
        <h1 class="city">${data.name.toUpperCase()}</h1>
        <p class="temp">${temperature(data.main.temp)}</p>
        <p>Ощущается как: ${temperature(data.main.feels_like)}</p>
        <p class="description">${data.weather[0].description}</p>
        <p class="pressure">Давление: <span>${data.main.pressure} hPa</span></p>
        <p>Ветер ${getWindDirection(data.wind.deg)}<br>${Math.round(data.wind.speed)} м/с</p>
        `;
    document.querySelector('body').style.backgroundImage = `url(${getImage(data.weather[0].main)})`;
    getForecast();
});
}

function getForecast(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=59.468192&lon=24.9896751&lang=ru&exclude=current,minutely,hourly,alerts&appid=e097db01d3950d1fa7a66a2926093e0f')
    .then(function (resp) {return resp.json()})
    .then(function (data) {
        console.log(data);
        
        for (let i = 0; i < daysTiles.length; i++) {
            daysTiles[i].innerHTML = `
            <h2>${getWeekday(data.daily[i].dt)}</h2>
            <p class="temp">${temperature(data.daily[i].temp.day)}</p>
            <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">
            <p class='description'>${data.daily[i].weather[0].description}</p>
            <p>Облачность ${data.daily[i].clouds+'%'}</p>
            `;
        }
    });
    
}
