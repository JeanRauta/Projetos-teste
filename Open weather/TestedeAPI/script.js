
// variaveis: input e button ------------------------------------------------------------------------------------->

const search_input = document.querySelector('#input')
const search_button = document.querySelector('.btn')

// pegar valor do input pelo button ------------------------------------------------------------------->

search_button.addEventListener('click', function() {
    searchResults(search_input.value)
    isCelsius = true;
    teste01.style.color = 'white'
    teste02.style.color = '#ffffff73'
})

// pegar valor do input pela tecla enter --------------------------------------------------------------->

search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
        isCelsius = true;
        teste01.style.color = 'white'
        teste02.style.color = '#ffffff73'
    }
}


// pegar nome da cidade por lon e lat sugerido pelo google ----------------------------------------------------------

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude
  
      var geoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=bd0b7f8f10c3319e823d4e86aaba6c6b`
  
      fetch(geoUrl)
        .then(function(response) {
          return response.json()
        })
        .then(function(geoData) {
          var cityName = geoData[0].name
  
          var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pt_br&units=metric&APPID=bd0b7f8f10c3319e823d4e86aaba6c6b`
  
          return fetch(weatherUrl)
        })
        .then(function(response) {
          return response.json()
        
        })

// elementos com innerText/html ---------------------------------------->

        .then(function(weatherData) {
            console.log(weatherData)
            var temperatura = weatherData.main.temp
            var name = weatherData.name
            var lat = weatherData.coord.lat
            var lon = weatherData.coord.lon
            var humidade = weatherData.main.humidity
            var vento = weatherData.wind.speed
            var clima = weatherData.weather[0].description
            var icon = weatherData.weather[0].icon
          
  
          var teste = document.getElementById("temp")
          teste.textContent = `${temperatura.toFixed(0)}`
          var teste1 = document.getElementById("city")
          teste1.textContent = ` ${name}`
          var teste2 = document.getElementById("latlon")
          teste2.textContent = ` Lat: ${lat} Lon: ${lon}`
          var teste3 = document.getElementById("humid")
          teste3.textContent = `Humidade: ${humidade}%`
          var teste4 = document.getElementById("speed")
          teste4.textContent = `Vento: ${vento}m/s`
          var teste5 = document.getElementById('clima')
          teste5.textContent = `${clima}`
          var teste6 = document.getElementById("div-img")
          teste6.innerHTML = `<img src="../icons/${icon}.png">`;
        })

        .catch(function(error) {
          console.error("Erro na requisição:", error)
        })
    }, function(error) {
      console.error("Erro ao obter a localização: " + error.message)
    })
  } else {
    console.error("Geolocalização não suportada pelo navegador")
  }
  
// requisição da api por cidade/city -------------------------------------------------

  function searchResults(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&APPID=bd0b7f8f10c3319e823d4e86aaba6c6b
    `)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Essa cidade não existe`)
            }
            return response.json();
        })

// elementos com innerText/html ---------------------------------------->

        .then(function(weatherData) {
            console.log(weatherData)
            var temperatura = weatherData.main.temp
            var name = weatherData.name
            var lat = weatherData.coord.lat
            var lon = weatherData.coord.lon
            var humidade = weatherData.main.humidity
            var vento = weatherData.wind.speed
            var clima = weatherData.weather[0].description
            var icon = weatherData.weather[0].icon
          
  
          var teste = document.getElementById("temp")
          teste.textContent = `${temperatura.toFixed(0)}`
          var teste1 = document.getElementById("city")
          teste1.textContent = ` ${name}`
          var teste2 = document.getElementById("latlon")
          teste2.textContent = ` Lat: ${lat} Lon: ${lon}`
          var teste3 = document.getElementById("humid")
          teste3.textContent = `Humidade: ${humidade}%`
          var teste4 = document.getElementById("speed")
          teste4.textContent = `Vento: ${vento}m/s`
          var teste5 = document.getElementById('clima')
          teste5.textContent = `${clima}`
          var teste6 = document.getElementById("div-img")
          teste6.innerHTML = `<img src="../icons/${icon}.png">`;
          
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });

        
}

// btn's responsaveis pela troca de temperatura ----------------------------------------------------

var teste01 = document.querySelector('#celsius-button')
var teste02 = document.querySelector('#fahrenheit-button')
var isCelsius = true;

function celsiusToFahrenheit(celsius) {
  teste02.style.color = 'white'
  teste01.style.color = '#ffffff73'
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  teste02.style.color = '#ffffff73'
  teste01.style.color = 'White'
  return (fahrenheit - 32) * 5/9;
}

function Temperature(unit) {
  var testeElement = document.getElementById('temp');
  var currentTemp = parseFloat(testeElement.textContent);

  if (isCelsius && unit === 'c') {
    var fahrenheitTemp = celsiusToFahrenheit(currentTemp);
    testeElement.textContent = fahrenheitTemp.toFixed(0);
    isCelsius = false;
  } else if (!isCelsius && unit === 'f') {
    var celsiusTemp = fahrenheitToCelsius(currentTemp);
    testeElement.textContent = celsiusTemp.toFixed(0);
    isCelsius = true;
  }
}
Temperature('f');

// function responsavel pelo relogio ----------------------------------------------------------

const mostrarTempo = () =>{
    const clockTag = document.querySelector('time');
    
    let dateNow = new Date();
    let hh = dateNow.getHours();
    let mm = dateNow.getMinutes();
    let ss = dateNow.getSeconds();
    
    hh = hh < 10 ? '0'+ hh : hh; 
    mm = mm < 10 ? '0'+ mm : mm; 
    ss = ss < 10 ? '0'+ ss : ss; 
     
    clockTag.innerText = hh +':'+ mm ;
  }
  mostrarTempo()
  setInterval(mostrarTempo, 1000);



var imagem = document.getElementById('teste');
var testett = document.getElementById('teste11')
var urls = ['../icons/teste01t.png', '../icons/teste01tt.png'];

var indice = 0;

function mouseover() {
    indice = (indice + 1) % urls.length;
    imagem.src = urls[indice];
};

function mouseout() {
  indice = (indice - 1) % urls.length; 
  imagem.src = urls[indice];
};
