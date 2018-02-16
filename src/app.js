moment.locale('es');
buscar();

// Función que crea iconos.
function skycons() {
  var i,
    icons = new Skycons({
        "color" : "#00d2ff",
        "resizeClear": true
    }),
    list  = [ // listing of all possible icons
      "clear-day",
      "clear-night",
      "partly-cloudy-day",
      "partly-cloudy-night",
      "cloudy",
      "rain",
      "sleet",
      "snow",
      "wind",
      "fog"
    ];
  // loop thru icon list array
  for(i = list.length; i--;) {
    var weatherType = list[i], // select each icon from list array
    // icons will have the name in the array above attached to the 
    // canvas element as a class so let's hook into them.
      elements  = document.getElementsByClassName( weatherType );
    // loop thru the elements now and set them up
    for (e = elements.length; e--;) {
      icons.set(elements[e], weatherType);
    }
  }
     
  // animate the icons
  icons.play();
}

// buscar la posición
function buscar() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // console.log(pos.lat);
      // obtener los datos de la api del tiempo en la posición dada
      $.getJSON('https://api.darksky.net/forecast/dee89d5e9210fc4bb4366e0d5ccc2d0a/' + pos.lat + ',' + pos.lng + '?extend=daily&callback=?&units=auto', function(forecast) {
        console.log(forecast);
        // console.log(forecast.currently.temperature);
        // console.log(forecast.currently.icon);
        let container = $('.main-container');
        let todayTitle = $('<h2 class="title">').text('Hoy')
        // Current Day
        let skiconsCurrent = forecast.currently.icon;
        let temperature = $('<h2 class="temperature">').text(`${Math.floor(forecast.currently.temperature)}°`);
        let btnWeek = $('<button type="button" class="btn btn-style">').text('Predicciones de la semana');
        let windSpeed = $('<div class="extras">').html(`<p><span class="left">Viento</span> <span class="right">${forecast.currently.windSpeed}  m/s</span></p>`);
        let humidity = $('<div class="extras">').html(`<p><span class="left">Humedad</span> <span class="right">${forecast.currently.humidity}  %</span></p>`);
        let uvIndex = $('<div class="extras">').html(`<p><span class="left">Índice UV</span> <span class="right">${forecast.currently.uvIndex}</span></p>`);
        let pressure = $('<div class="extras">').html(`<p><span class="left">Presión</span> <span class="right">${forecast.currently.pressure}  hPa</span></p>`);
        let iconTemperature = $('<canvas class="' + skiconsCurrent + '"></canvas>');

        container.append(todayTitle, iconTemperature, temperature, windSpeed, humidity, uvIndex, pressure, btnWeek);

        btnWeek.on('click', function()  {
         btnWeekFunction();
        });

        let btnDaily = $('<button type="button" class="btn btn-style">').text('Volver');
        btnDaily.on('click', function() {
          btnDailyFunction();
        });
        function btnWeekFunction()  {
           container.empty();
          console.log(forecast.daily.data);
          let counter = -1;
          forecast.daily.data.forEach(function(element) {
            counter++
            let dailyDay = $('<p class="dailyTitle">').text(`${moment().add(counter, 'd').format('DD, MMMM')}`)
            let dailyTempMax = $('<p class="tempDaily">').html(`Min ${Math.floor(element.apparentTemperatureLow)}° - Max ${Math.floor(element.apparentTemperatureHigh)}°`);
            // let dailyTempLow = $('<p class="tempDaily">').text(`${element.apparentTemperatureLow}`);
            let dailyContainer = $('<div class="dailyContainer">');
            let dailyIcon = '<canvas class="' + element.icon + ' icon-size"></canvas>';

            console.log(element.icon);
            dailyContainer.append(dailyIcon, dailyDay, dailyTempMax, btnDaily);
            container.append(dailyContainer);
            
            btnDaily.on('click', function() {
              btnDailyFunction();
            });

            skycons();
          });
        }
        function btnDailyFunction() {
          container.empty();
          container.append(todayTitle, iconTemperature, temperature, windSpeed, humidity, uvIndex, pressure, btnWeek);
          
          btnWeek.on('click', function()  {
            btnWeekFunction();
          });
        }
        skycons();
      });

    }, function(error) {
      alert('Tenemos un problema en encontrar tu ubicación');
    });
  }
}
var today = moment().add(0, 'd').format('DD, MMMM')
console.log(today);
// probando con node
/* const fetch = require('node-fetch');
const weather = {};

let darksky = 'https://api.darksky.net/forecast/';
let key = 'b9f2b72c00e2be60693638fb0addf946';
let lat = -33.45;
let lng = -70.6667;
let uri = darksky + key + '/' + lat + ',' + lng;
console.log(uri);
// para ponerlo en grados celsius
uri = uri.concat('?units=ca');

let options = {
  method: 'GET',
  mode: 'cors'
};
let req = new fetch.Request(uri, options);
console.log(req);
fetch(req)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Bad HTTP!');
    }
  })
  .then((j) => {
    console.log(j.currently.temperature, j.currently.summary);
  })
  .catch((err) => {
    console.log(('ERROR', err.message));
  });

module.exports = weather;
*/
