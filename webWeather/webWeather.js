const API_URL1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const API_KEY1 = "91e3df8b9aca62cb894538f3616d8a6e";

/*https://api.openweathermap.org/data/2.5/weather?lat=44.3629377&lon=23.7343773&appid=91e3df8b9aca62cb894538f3616d8a6e&units=metric*/


const displayWeather = (data) => {
    const cityName = data.name;
    const temperature = Math.floor(data.main.temp)+ "°C" + " " + "/" + " " + Math.floor(((data.main.temp) * 1.8 )+32) + "°F";
    const descriptionSkies = data.weather[0].main;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const speedWind = Math.floor(data.wind.speed);
    const minimTemperature = Math.floor(data.main.temp_min) + "°C" + " " + "/" + " " + Math.floor(((data.main.temp_min) * 1.8 )+32) + "°F";
    const maximTemperature = Math.floor(data.main.temp_max) + "°C" + " " + "/" + " " + Math.floor(((data.main.temp_max) * 1.8 )+32) + "°F";
    
    console.log(data);
    
    const city = `<div class="city">
                 <img class="wheater-icon" src="${icon}" />
                 <h2>${cityName}: ${temperature} </h2>
                 <p>Skies are: ${descriptionSkies}</p>
                 <p>Speed wind: ${speedWind} km/h</p>
                 <p>Minim temperature: ${minimTemperature}</p>
                 <p>Maxim temperature: ${maximTemperature}</p>
                 </div>`;  
 document.querySelector("#city-list").innerHTML = city; 
}

const locationSuccess = (position) => {
    console.log(position);
 const latitude = position.coords.latitude;
 const longitude = position.coords.longitude;
 const request = `${API_URL1}appid=${API_KEY1}&lat=${latitude}&lon=${longitude}`;
  fetch(request).then(response =>response.json()).then(displayWeather)
};



const locationError = () => {
    console.log("Error getting your location");
    document.querySelector(".location-error-message").style.display = "block";
};
const locationClick = () => {
    console.log();
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
};




//api.openweathermap.org/data/2.5/forecast?q=london&appid=5c9823f30ccfccef648f21e01a5589e4&units=metric
const API_URL2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&";
const API_KEY2 = "5c9823f30ccfccef648f21e01a5589e4";
const displayWeather2 = (data) => {
    console.log(data);
    const city = data.city.name;
    const temperature = Math.floor(data.list[0].main.temp);
    const descriptionSkies = data.list[0].weather[0].main;
    const icon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    const speedWind = Math.floor(data.list[0].wind.speed);
    const minimTemperature = Math.floor(data.list[0].main.temp_min);
    const maximTemperature = Math.floor(data.list[0].main.temp_max);
    const date = data.list[0].dt_txt;
    

    const day = `<div id="day1">
            <div class="image"><img src=${icon} id="img1" alt="img1"/></div>
            <p class="date" id="day1Date"> ${date}</p>
            <h2 class="city">${city}</h2>
            <p class="temp" id="day1Temp"> Temperature: ${temperature}°C</p>
            <p class="skies" id="day1Skies">Skies are: ${descriptionSkies}</p>
            <p class="wind" id="day1Wind">Speed wind: ${speedWind} km/h</p>
            <p class="tempMin" id="day1Min">Minim temperature: ${minimTemperature}°C</p>
            <p class="tempMax" id="day1Max">Maxim temperature: ${maximTemperature}°C</p>
        </div>`
        document.querySelector("#current-day").innerHTML = day; 

}

function hourForecast(forecast) {
    document.querySelector(".hour-list").innerHTML= "";
    for ( i = 0; i < 5; i++) {
        console.log(forecast.list[i]);
        const div = document.createElement("div");
        div.setAttribute("class","hourForecast");
        
        const time = document.createElement("p");
        time.setAttribute("class","time")
        time.innerHTML = new Date(forecast.list[i].dt*1000).toLocaleTimeString().replace(':00','');
        div.appendChild(time);

        const tempH = document.createElement("p");
        tempH.innerHTML = Math.floor(forecast.list[i].main.temp) + "°C";
        div.appendChild(tempH)

        const descriptionH = document.createElement("p");
        descriptionH.setAttribute("class","desc")
        descriptionH.innerHTML = "Sky:" + " " + forecast.list[i].weather[0].main;
        div.appendChild(descriptionH);

        const windH = document.createElement("p");
        windH.innerHTML= "Wind speed:" + " " + Math.floor(forecast.list[i].wind.speed) + "km/h";
        div.appendChild(windH);

        document.querySelector(".hour-list").appendChild(div)
}
}



function dayForecast (forecast) {
    document.querySelector(".days-list").innerHTML= " ";
    for ( i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i]);
        const div= document.createElement("div");
        div.setAttribute("class","dayForecast");
        
        const day= document.createElement("p");
        day.setAttribute("class","date")
        day.innerHTML= new Date(forecast.list[i].dt*1000).toDateString();
        div.appendChild(day);

        const temp= document.createElement("p");
        temp.innerHTML= Math.floor(forecast.list[i].main.temp) + "°C";
        div.appendChild(temp)

        const description= document.createElement("p");
        description.setAttribute("class","desc")
        description.innerHTML= "Sky:" + " " + forecast.list[i].weather[0].main;
        div.appendChild(description);

        const wind= document.createElement("p");
        wind.innerHTML= "Wind speed:" + " " + Math.floor(forecast.list[i].wind.speed) + "km/h";
        div.appendChild(wind);

        document.querySelector(".days-list").appendChild(div)
    }
}


const clickMe = () => {
    const city2 = document.querySelector("#city2").value;
    const request = `${API_URL2}appid=${API_KEY2}&q=${city2}`;
   
    fetch(request).then(response =>response.json()).then((data)=>{
        displayWeather2(data);
        dayForecast(data);
        hourForecast(data)} )
        .catch(error => {document.querySelector(".click-error-message").style.display = "block"});
        console.log(request)

};




const initPage = () => {
    console.log()
   document.querySelector("#btn-location").addEventListener("click", locationClick);
   document.querySelector("#click-me").addEventListener("click", clickMe);

   const input = document.querySelector("#city2");
   input.addEventListener("keypress", function(event) {
       if (event.key === "Enter") {
         event.preventDefault();
         document.querySelector("#click-me").click();
       }
});
}
window.addEventListener("load", initPage);

