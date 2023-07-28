const place = document.querySelector(".location");

const weather = () => {
    const error = () => {
        place.innerHTML = `<h4>Please allow access to location</h4>`;
    }
    navigator.geolocation.getCurrentPosition(showWeather, error);
}

//required async function
const showWeather = async (position) => {
    // to get the city from the recieved coordinates
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);

    const data = await response.json();
    // inserts location in HTML
    place.innerHTML =`<h4>${data.address.state_district}</h4>`;

    // to get the weather related info
    const retVal = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=355bbcb56da387e34db422246e891ea3&units=metric`);

    const value = await retVal.json();
    
    // inserts required info at their placeholder => (basic-info) part
    document.querySelector(".date-time").innerHTML = `<h5>${new Date(value.dt*1000)}</h5>`;
    document.querySelector(".temp-logo").innerHTML = `<img src='http://openweathermap.org/img/w/${value.weather[0].icon}.png'><h1>${value.main.temp}°</h1>`;
    document.querySelector(".feels").innerHTML = `<h3>${value.main.temp_max}°/${value.main.temp_min}° feels like ${value.main.feels_like}°</h3>`;
    document.querySelector(".forecast").innerHTML = `<h3>${value.weather[0].main}</h3>`;

    // inserts required info at their placeholder => (detailed-info) part
    document.querySelector(".humidity").innerHTML += `<p>${value.main.humidity}%</p>`;
    document.querySelector(".pressure").innerHTML += `<p>${value.main.pressure}hPa</p>`;
    document.querySelector(".wind-speed").innerHTML += `<p>${value.wind.speed}m/s</p>`;
    document.querySelector(".wind-dir").innerHTML += `<p>${value.wind.deg}°</p>`;
    // the data related to rain is not available for all places, so an if check
    if(value.rain !== undefined){
        document.querySelector(".precipitation").innerHTML += `<p>${value.rain}mm</p>`;
    } else {
        document.querySelector(".precipitation").innerHTML += `<p>Data unavailable</p>`;
    }
    document.querySelector(".visibility").innerHTML += `<p>${value.visibility/1000}km</p>`;
    document.querySelector(".clouds").innerHTML += `<p>${value.clouds.all}%</p>`;
}

weather();