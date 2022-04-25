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
    return Math.round(temp-273.15)+'\xB0C';
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
            case 7:
            return 'Воскресенье';
            break;
            default:
                break;
        }
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
    document.querySelector('.city p').textContent=data.name.toUpperCase();
    document.querySelector('.temp p').textContent=temperature(data.main.temp);
    document.querySelector('.clouds p').textContent=data.weather[0].description;
    document.querySelector('.pressure').lastChild.textContent=data.main.pressure+' hPa';
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
            <p>${temperature(data.daily[i].temp.day)}</p>
            <img src=${getImage(data.daily[i].weather[0].main)}>
            <p>${data.daily[i].weather[0].description}</p>
            <p>${data.daily[i].clouds+'%'}</p>
            `;
        }
    });
    
}
