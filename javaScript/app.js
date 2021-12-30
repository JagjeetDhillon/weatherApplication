//select Elements first
const tempElement = document.querySelector(".temprature-value p");
const discElement = document.querySelector(".temprature-description p");
const locationElement = document.querySelector(".location");
const iconElement = document.querySelector(".weather-icon");
const notificationElement = document.querySelector(".notification");
const preasureElement = document.querySelector(".preasure p");
const button = document.getElementById('searchButton');

//App data

 var weather =function(){
  
  this.description=null;
  this.iconId=null;
  this.city=null;
  this.country=null;
  this.maxTemp = null;
  this.minTemp = null;
  this.time=null;
  this.preasure=null;
  //this.temprature=temprature;
  this.tempratureValue=null;
  //this.tempratureUnit=Celcius;

};


const KELVIN = 273;
const key = "42e62cc7afe798e6d96e90b1c045b1cd";

button.onclick = function(event){
  event.preventDefault();
  var cityName = document.getElementById('searchBar').value;
  getCurrentWeather(cityName);
  getWeatherForecast(cityName);
}

// else{
//   notificationElement.style.display = "block";
//   notificationElement.innerHTML ="<p> Please Enter a valid city name </p>";
//}

//const cName= "chandigarh, in"

//to fetch weather from API
function getWeatherForecast(cityName){
  var api = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&mode=json&appid=${key}`;
  fetch(api)
    .then(function(response){
      var dataOne = response.json();
      return dataOne;
    })
    .then(function(dataOne){
     
     // const tempratureInstance =['one','two','three','four','five','six','seven','eight'];
      var allData = [];

      for(var i =0; i<=39; i++){
        //tempratureInstance[i] = new weather();
        tempratureInstance = new weather();
        tempratureInstance.tempratureValue = Math.floor(dataOne.list[i].main.temp - KELVIN);
        //tempratureInstance.tempratureValue = dataOne.list[i].main.temp;
        tempratureInstance.description = dataOne.list[i].weather[0].description;
        tempratureInstance.iconId = dataOne.list[i].weather[0].icon;
        tempratureInstance.preasure = dataOne.list[i].main.pressure;

        allData.push(tempratureInstance);
      }
      return allData;
       
    })
      .then(function(allData){
        //to get next five days
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        
        let table = document.getElementById("table").getElementsByTagName("tbody")[0];
         table.innerHTML="";
        
        let rows = [];
        let newRowOne = table.insertRow(table.rows.length);
        
        let newRowTwo = table.insertRow(table.length);
        let newRowThree = table.insertRow(table.length);
        let newRowFour = table.insertRow(table.length);
        let newRowFive = table.insertRow(table.length);
        rows.push(newRowOne);
        rows.push(newRowTwo);
        rows.push(newRowThree);
        rows.push(newRowFour);
        rows.push(newRowFive);
        let count = 0; 
        for(let j=0; j<=4; j++){
          
          let cell1 = rows[j].insertCell(0),
          cell2 = rows[j].insertCell(1),
          cell3 = rows[j].insertCell(2),
          cell4 = rows[j].insertCell(3),
          cell5 = rows[j].insertCell(4),
          cell6 = rows[j].insertCell(5),
          cell7 = rows[j].insertCell(6),
          cell8 = rows[j].insertCell(7),
          cell9 = rows[j].insertCell(8);

          
            cell1.innerHTML =`<p>${weekday[d.getDay()+j+1]}</p>`;

            cell2.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count].iconId}.png"/></div>
            <div>${allData[count].description}</div>
            <div>${allData[count].tempratureValue}&#x2103;</div>`;
            cell3.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+1].iconId}.png"/></div>
            <div>${allData[count+1].description}</div>
            <div>${allData[count+1].tempratureValue}&#x2103;</div>`;
            cell4.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+2].iconId}.png"/></div>
            <div>${allData[count+2].description}</div>
            <div>${allData[count+2].tempratureValue}&#x2103;</div>`;
            cell5.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+3].iconId}.png"/></div>
            <div>${allData[count+3].description}</div>
            <div>${allData[count+3].tempratureValue}&#x2103;</div>`;
            cell6.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+4].iconId}.png"/></div>
            <div>${allData[count+4].description}</div>
            <div>${allData[count+4].tempratureValue}&#x2103;</div>`;
            cell7.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+5].iconId}.png"/></div>
            <div>${allData[count+5].description}</div>
            <div>${allData[count+5].tempratureValue}&#x2103;</div>`;
            cell8.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+6].iconId}.png"/></div>
            <div>${allData[count+6].description}</div>
            <div>${allData[count+6].tempratureValue}&#x2103;</div>`;
            cell9.innerHTML =`<div><img src="icons/forcastWeatherIcon/${allData[count+7].iconId}.png"/></div>
            <div>${allData[count+7].description}</div>
            <div>${allData[count+7].tempratureValue}&#x2103;</div>`;
            count +=8;

        }


    })
}
function getCurrentWeather(cityName){
  var currentWeatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
  fetch(currentWeatherApi)
    .then(function(response){
      var data = response.json();
      return data;
    })
    .then(function(data){
      var cweather = new weather();
      cweather.tempratureValue = Math.floor(data.main.temp - KELVIN);
      cweather.description = data.weather[0].description;
      cweather.iconId =data.weather[0].icon;
      cweather.city = data.name;
      cweather.country = data.sys.country;
      cweather.preasure = data.main.pressure;
      return cweather;
      
    })
    .then(function(cweather){
      locationElement.innerHTML =`${cweather.city}, ${cweather.country}`;
      iconElement.innerHTML=`<img src="icons/CurrentWeatherIcon/${cweather.iconId}.png"/>`;
      tempElement.innerHTML =`${cweather.tempratureValue}&#x2103;`;
      discElement.innerHTML = cweather.description;
      preasureElement.innerHTML = `${cweather.preasure} hpa`;
    })
};


// if(cityName != null){
//   getCurrentWeather(cityName)
// }wa
//getWeatherForecast(cName,countName);
