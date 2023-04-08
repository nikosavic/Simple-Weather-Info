'use strict';

const prikazInfa = document.querySelector('.prikaz');

class App {
  constructor() {
    // get position function

    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates.bind(this),
        function () {
          alert('Could not get your position.');
        }
      );
  }

  getCoordinates(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(position);

    const coords = [latitude, longitude];
    const lat = latitude;
    const lng = longitude;
    //   console.log(latitude);
    console.log(coords);

    const weatherInfo = function () {
      //   this.getCoordinates.bind(this);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=41dc57659c6652971fb22930212fa729
              `
      )
        .then(response => response.json())
        .then(data => {
          //   this.getCoordinates.bind(this);
          const placeDiv = document.getElementById('location');
          const placeLabel = document.createElement('h1');
          const location = data.name;
          placeLabel.innerHTML = location;
          placeDiv.appendChild(placeLabel);

          console.log(data);
          const info = JSON.stringify(data.name);
          const temperature = data.main.temp;
          const timeSunrise = new Date(data.sys.sunrise * 1000);
          const tSun = timeSunrise.toLocaleTimeString('default');
          const timeSunset = new Date(data.sys.sunset * 1000);
          const tSunset = timeSunset.toLocaleTimeString('default');

          const date = new Date().toLocaleTimeString();
          console.log(data.temp);
          console.log(data.main);
          console.log(info);
          const getInfo = Object.keys(data.main);
          console.log(getInfo);

          let html = `
          <li class="weather weather--information" data-id="1234567890">
          <h2 class="weather__title">As of ${date}</h2>
          <div class="weather__details">
            <span title="Current Temperature" class="weather__icon">🌡️</span>
            <span title="Current Temperature" class="weather__value">${temperature}</span>
            <span class="weather__unit">C</span>
          </div>
          <div class="weather__details">
            <span title="Cloud Coverage" class="weather__icon">🌥️</span>
            <span title="Cloud Coverage" class="weather__value">${data.clouds.all}</span>
            <span class="weather__unit">%</span>
          </div>
          <div class="weather__details">
            <span class="weather__icon">⚡️</span>
            <span class="weather__value">${data.weather[0].main}</span>
            <span class="weather__unit"></span>
          </div>
          <div class="weather__details">
            <span title="Humidity" class="weather__icon">🥵</span>
            <span title="Humidity" class="weather__value">${data.main.humidity}</span>
            <span class="weather__unit">%</span>
          </div>
          <div class="weather__details">
            <span title="Wind Speed" class="weather__icon">💨</span>
            <span title="Wind Speed" class="weather__value">${data.wind.speed}</span>
            <span class="weather__unit">km/h</span>
          </div>
          <div class="weather__details">
            <span title="Sunrise" class="weather__icon">🌅</span>
            <span title="Sunset" class="weather__value">${tSun}</span>
            <span class="weather__unit"></span>
          </div>
          <div class="weather__details">
            <span title="Sunset" class="weather__icon">🌅</span>
            <span title="Sunset" class="weather__value">${tSunset}</span>
            <span class="weather__unit"></span>
          </div>
          <div class="weather__details">
            <span class="weather__icon">⏱</span>
            <span class="weather__value">${data.sys.timezone}</span>
            <span class="weather__unit"></span>
          </div>
          </li>`;

          // prikazInfa.insertAdjacentHTML('afterend', html);

          return fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=1a91f37d3ae74c1fa90964c9293e4e72`
          )
            .then(response => response.json())
            .then(result => {
              console.log(result);
              // console.log(result.features[0].properties);

              let html2 = `
            <li class="weather weather--information" data-id="1234567890">
            <h2 class="weather__title">Other info</h2>
            <div class="weather__details">
              <span title="Current Temperature" class="weather__icon"></span>
              <span title="Current Temperature" class="weather__value">County: ${result.features[0].properties.county}</span>
              <span class="weather__unit"></span>
            </div>
            <div class="weather__details">
              <span title="Current Temperature" class="weather__icon"></span>
              <span title="Current Temperature" class="weather__value">Suburb: ${result.features[0].properties.suburb}</span>
              <span class="weather__unit"></span>
            </div>
            <div class="weather__details">
              <span title="Current Temperature" class="weather__icon"></span>
              <span title="Current Temperature" class="weather__value">State: ${result.features[0].properties.state}</span>
              <span class="weather__unit"></span>
            </div>
            <div class="weather__details">
              <span title="Current Temperature" class="weather__icon"></span>
              <span title="Current Temperature" class="weather__value">Time zone: ${result.features[0].properties.timezone.name}</span>
              <span class="weather__unit"></span>
            </div>
            `;

              prikazInfa.insertAdjacentHTML('afterend', html2);
              prikazInfa.insertAdjacentHTML('afterend', html);
            })
            .catch(error => console.log('error', error));

          // console.log(Object.keys(result));
          // console.log(info.city.name);

          // const population = JSON.stringify(info.city.population);
          // console.log(population);
        });
    };

    return weatherInfo();
  }
}

const app = new App();

// Funkcija koja fetchuje OpenWeather api. Format: https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=41dc57659c6652971fb22930212fa729
// latitude i longitude bi trebalo da budu uzeti iz getCoordinates funkcije iznad
