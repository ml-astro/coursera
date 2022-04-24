let weatherData;

fetch('https://api.openweathermap.org/data/2.5/weather?lat=59.468192&lon=24.9896751&appid=e097db01d3950d1fa7a66a2926093e0f')
.then(function (resp) {return resp.json()})
.then(function (data) {
    document.querySelector('.city p').textContent=data.name;
    document.querySelector('.temp').textContent=Math.floor((data.main.temp-273.15)*10)/10+'\xB0 C';
    document.querySelector('.clouds').lastChild.textContent=data.clouds.all+'%';
    document.querySelector('.pressure').lastChild.textContent=data.main.pressure+' hPa';

    console.log(data)});
