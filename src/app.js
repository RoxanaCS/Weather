buscar();

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
        console.log(forecast.currently.temperature);
        let fToCel = `${forecast.currently.temperature}°`;
        let temperature = $('<h2>').text(fToCel);
        let container = $('.main-container');
        let boton = $('.boton');
        let btn = $('<button type="button" class="btn btn-default">').text('Predicciones de la semana');
        let windSpeed = $('<p>').text(`${forecast.currently.windSpeed}  m/s`);
        let humidity = $('<p>').text(`${forecast.currently.humidity}  %`);
        let uvIndex = $('<p>').text(`${forecast.currently.uvIndex}`);
        let pressure = $('<p>').text(`${forecast.currently.pressure}  hPa`);

        container.append(temperature, windSpeed, humidity, uvIndex, pressure);
        boton.append(btn);
      });
    }, function(error) {
      alert('Tenemos un problema en encontrar tu ubicación');
    });
  }
}

var skycons = new Skycons({"color": "black"});
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

  // ...or by the canvas DOM element itself.
  skycons.add(document.getElementById("icon2"), Skycons.RAIN);

  // if you're using the Forecast API, you can also supply
  // strings: "partly-cloudy-day" or "rain".

  // start animation!
  skycons.play();

  // you can also halt animation with skycons.pause()

  // want to change the icon? no problem:
  skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

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
