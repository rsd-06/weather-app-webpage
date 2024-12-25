// make something like if its rainy change the colour to blue, if its hot, change it yellow, like that !

//DEFINING VARIABLES FOR ACCESSING HTML ELEMENTS

//Brief View Elements
const navBarSearch = document.querySelector('#navBar-search');
const navBarDetails = document.querySelector('#navBar-details');
const displayTemperatureC = document.querySelector('#display-temperature_c').firstElementChild;
const displayTemperatureF = document.querySelector('#display-temperature_f').firstElementChild;
const displayCity = document.querySelector('#display-city').firstElementChild;
const displayDateTime = document.querySelector('#display-date-time').firstElementChild;
const displayWeatherSummary = document.querySelector('#display-weather').firstElementChild;
const displayWeatherIcon = document.querySelector('#display-icon').firstElementChild;
const inputLocation = document.querySelector('#input-location');
const searchButton = document.querySelector('#input-searchButton');

//Detailed View Elements
const displayFeelslike_C = document.querySelector('#detailed-display-feelslike_c').firstElementChild;
const displayFeelslike_F = document.querySelector('#detailed-display-feelslike_f').firstElementChild;
const displayLatitude = document.querySelector('#detailed-display-latitude').firstElementChild;
const displayLongitude = document.querySelector('#detailed-display-longitude').firstElementChild;
const displayWind_KPH= document.querySelector('#detailed-display-wind_kph').firstElementChild;
const displayWind_MPH = document.querySelector('#detailed-display-wind_mph').firstElementChild;
const displayWind_Degree = document.querySelector('#detailed-display-wind_degree').firstElementChild;
const displayWind_Direction = document.querySelector('#detailed-display-wind_dir').firstElementChild;
const displayPrecip_MM = document.querySelector('#detailed-display-precip_mm').firstElementChild;
const displayHumidity = document.querySelector('#detailed-display-humidity').firstElementChild;
const displayWindchill_C = document.querySelector('#detailed-display-windchill_c').firstElementChild;
const displayWindchill_F = document.querySelector('#detailed-display-windchill_f').firstElementChild;
const displayHeatIndex_C = document.querySelector('#detailed-display-heatindex_c').firstElementChild;
const displayHeatIndex_F = document.querySelector('#detailed-display-heatindex_f').firstElementChild;
const displayDewpoint_C = document.querySelector('#detailed-display-dewpoint_c').firstElementChild;
const displayDewpoint_F = document.querySelector('#detailed-display-dewpoint_f').firstElementChild;
const displayAQI_CO = document.querySelector('#detailed-display-co').firstElementChild;
const displayAQI_NO2 = document.querySelector('#detailed-display-no2').firstElementChild;
const displayAQI_SO2 = document.querySelector('#detailed-display-so2').firstElementChild;
const displayAQI_PM2_5 = document.querySelector('#detailed-display-pm2_5').firstElementChild;
const displayAQI_PM10 = document.querySelector('#detailed-display-pm10').firstElementChild;


const BASE_URL = "https://api.weatherapi.com/v1/current.json";
const URL_KEY = "bf44f13b3b1d40e0b3d73906241912";
let URL;


let currentLatitude;
let currentLongitude;
let weatherInfo;

/*HTML Geolocation API

Locate the User's Position :
The HTML Geolocation API is used to get the geographical position of a user.
Since this can compromise privacy, the position is not available unless the user approves it.

Using HTML Geolocation -
The getCurrentPosition() method is used to return the user's position.

The example below returns the latitude and longitude of the user's position:
<script>
const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
</script>


Example explained:

Check if Geolocation is supported
If supported, run the getCurrentPosition() method. If not, display a message to the user
If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter (showPosition)
The showPosition() function outputs the Latitude and Longitude


Handling Errors and Rejections
The second parameter of the getCurrentPosition() method is used to handle errors. It specifies a function to run if it fails to get the user's location:

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

The getCurrentPosition() Method - Return Data
The getCurrentPosition() method returns an object on success. The latitude, longitude and accuracy properties are always returned. The other properties are returned if available:

Property	                    Returns
coords.latitude	        The latitude as a decimal number (always returned)
coords.longitude	    The longitude as a decimal number (always returned)
coords.accuracy	        The accuracy of position (always returned)
coords.altitude	        The altitude in meters above the mean sea level (returned if available)
coords.altitudeAccuracy	The altitude accuracy of position (returned if available)
coords.heading	        The heading as degrees clockwise from North (returned if available)
coords.speed	        The speed in meters per second (returned if available)
timestamp	            The date/time of the response (returned if available)

Geolocation Object - Other interesting Methods
The Geolocation object also has other interesting methods:

watchPosition() - Returns the current position of the user and continues to return updated position as the user moves (like the GPS in a car).
clearWatch() - Stops the watchPosition() method.
 */


const showPosition = (position) => { //Position object is sent by getLocation to showPosition
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
   // console.log(typeof currentLatitude, typeof currentLongitude); //GIVES NUMBER // WE NEED TO CONVERT IT INTO STRING TO ATTACH IT TO URL AS WELL AS DISPLAY
    currentLatitude = currentLatitude.toString();
    currentLongitude = currentLongitude.toString();
    console.log(typeof currentLatitude, typeof currentLongitude);
    console.log("currentLatitude, currentLongitude :" + currentLatitude, currentLongitude);
    URL = `${BASE_URL}?key=${URL_KEY}&q=${currentLatitude},${currentLongitude}&aqi=yes`
    console.log("url :" + URL);
    inputLocation.value = `${currentLatitude},${currentLongitude}`;
    weatherInfo(URL);
}

const showError = (error) => {
    console.log(error)
    switch (error.code) {
        case error.PERMISSION_DENIED: console.log("User denied the request for Geolocation"); break;
        case error.POSITION_UNAVAILABLE : console.log("Location information is unavailable"); break;
        case error.TIMEOUT : console.log("The request to get user location timed out"); break;
        case error.UNKNOWN_ERR: console.log("An unknown error occurred."); break;
    }
}

const getLocation = async () => {
    if(navigator.geolocation){ //navigator.geolocation==true; //checking if the browser supports navigator object's geolocation object.
        console.log("location access granted...")
        navigator.geolocation.getCurrentPosition(showPosition, showError); //  Callbacking showPosition and showError functions //WILL SEND position object and error Object to showPosition and showError Functions respectively. ( THE getLocation always sends two objects to two different functions which are inside the attribute of getLocation function )
    }
    else {
        console.log("Geolocation is not supported by the browser!");
    }
}



weatherInfo = async (URL) => {
    const  response =  await fetch(URL);
    const weatherData = await response.json();
    console.log("weatherData :" + weatherData);
    const tempC = weatherData["current"]["temp_c"];
    const tempF = weatherData["current"]["temp_f"];
    displayTemperatureC.innerText = `Temp°C: ${tempC}°C`;
    displayTemperatureF.innerText = `Temp°F: ${tempF}°F`;
    const location_city = weatherData["location"]["name"];
    console.log("location :" + location_city);
    const location_region = weatherData["location"]["region"];
    const location_country = weatherData["location"]["country"];
    displayCity.innerText = `${location_city}, ${location_region}, ${location_country}`;
    const date = weatherData["location"]["localtime"].split(" ")[0];
    console.log("date :" + date);
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = weekdays[new Date(date).getDay()];

    /* The new Date() Constructor

    In JavaScript, date objects are created with new Date().

    new Date() returns a date object with the current date and time.

                Date Get Methods
    Method	                    Description
    getFullYear()	    Get year as a four digit number (yyyy)
    getMonth()	        Get month as a number (0-11)
    getDate()	        Get day as a number (1-31)
    getDay()	        Get weekday as a number (0-6)
    getHours()	        Get hour (0-23)
    getMinutes()	    Get minute (0-59)
    getSeconds()	    Get second (0-59)
    getMilliseconds()	Get millisecond (0-999)
    getTime()	        Get time (milliseconds since January 1, 1970)

    Note 1
    The get methods above return Local time.
    Universal time (UTC) is documented at the bottom of this page.

    Note 2
    The get methods return information from existing date objects.
    In a date object, the time is static. The "clock" is not "running".
    The time in a date object is NOT the same as current time.

    Note
    In JavaScript, January is month number 0, February is number 1, ...
    Finally, December is month number 11.

    Note
    You can use an array of names to return the month as a name:

    Note
    In JavaScript, the first day of the week (day 0) is Sunday.
    Some countries in the world consider the first day of the week to be Monday.

    EXAMPLES :
    const d = new Date("2021-03-25");
    d.getDay();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()]; //GIVES TODAY'S DATE'S DAY

    const d = new Date();
    d.getFullYear();  // GIVES TODAY'S DATE YEAR
     */

    const time = weatherData["location"]["localtime"].split(" ")[1]
    displayDateTime.innerText = `${date}\t${day},\t${time}`;
    const weather_condition = (weatherData["current"]["condition"]["text"]).toString();
    displayWeatherSummary.innerText = `${weather_condition}`;
    if (weather_condition.includes("Sun") || weather_condition.includes("Clear")) {
        displayWeatherIcon.src = "sun-solid.svg"
        displayWeatherIcon.alt = "sun-solid"
        // document.querySelector(".container-brief").style.backgroundImage = "linear-gradient(to right,#F2BB05,#DAE0F2)";
        // document.querySelector(".container-detailed").style.backgroundImage = "linear-gradient(to right,#F2BB05,#DAE0F2)";
        document.querySelector(".container").style.backgroundImage = "linear-gradient(to right,#F2BB05,#DAE0F2)";
    }
    else if(weather_condition.includes("Rain") || weather_condition.includes("rain")) {
        displayWeatherIcon.src = "cloud-rain-solid.svg"
        displayWeatherIcon.alt = "cloud-rain-solid"
        // document.querySelector(".container-brief").style.backgroundImage = "linear-gradient(to right,#0E4A67,#DAE0F2)";
        // document.querySelector(".container-detailed").style.backgroundImage = "linear-gradient(to right,#0E4A67,#DAE0F2)";
        document.querySelector(".container").style.backgroundImage = "linear-gradient(to right,#0E4A67,#DAE0F2)";
    }
    else if(weather_condition.includes("Wind")){
        displayWeatherIcon.src = "wind-solid.svg"
        displayWeatherIcon.alt = "wind-solid"
        // document.querySelector(".container-brief").style.backgroundImage = "linear-gradient(to right,#708C9A,#DAE0F2)";
        // document.querySelector(".container-detailed").style.backgroundImage = "linear-gradient(to right,#708C9A,#DAE0F2)";
        document.querySelector(".container").style.backgroundImage = "linear-gradient(to right,#708C9A,#DAE0F2)";
    }
    else if(weather_condition.includes("Thunderstorm") || weather_condition.includes("Storm")){
        displayWeatherIcon.src = "cloud-bolt-solid.svg"
        displayWeatherIcon.alt = "cloud-bolt-solid"
        // document.querySelector('.container-brief').style.backgroundImage = "linear-gradient(to right,#111D4A,#DAE0F2)";
        // document.querySelector('.container-detailed').style.backgroundImage = "linear-gradient(to right,#111D4A,#DAE0F2)";
        document.querySelector('.container').style.backgroundImage = "linear-gradient(to right,#111D4A,#DAE0F2)";
    }
    else if(weather_condition.includes("Cloudy")){
        displayWeatherIcon.src = "cloud-solid.svg"
        displayWeatherIcon.alt = "cloud-solid"
        // document.querySelector('.container-brief').style.backgroundImage = "linear-gradient(to right,#95B4DA,#DAE0F2)";
        // document.querySelector('.container-detailed').style.backgroundImage = "linear-gradient(to right,#95B4DA,#DAE0F2)";
        document.querySelector('.container').style.backgroundImage = "linear-gradient(to right,#95B4DA,#DAE0F2)";
    }


    //Detailed_elements View
    displayFeelslike_C.innerText = `Feelslike °C : ${weatherData["current"]["feelslike_c"]}°C`;
    displayFeelslike_F.innerText = `Feelslike °F : ${weatherData["current"]["feelslike_f"]}°F`;
    displayLatitude.innerText = `Latitude : ${weatherData["location"]["lat"]}`;
    displayLongitude.innerText = `Longitude : ${weatherData["location"]["lon"]}`;
    displayWind_KPH.innerText = `Wind-Km/Hr : ${weatherData["current"]["wind_kph"]}`
    displayWind_MPH.innerText = `Wind-Km/Hr : ${weatherData["current"]["wind_mph"]}`
    displayWind_Degree.innerText = `Wind-Degree : ${weatherData["current"]["wind_degree"]}`
    displayWind_Direction.innerText = `Wind-Direction : ${weatherData["current"]["wind_dir"]}`
    displayPrecip_MM.innerText = `Precipitation-mm : ${weatherData["current"]["precip_mm"]}`
    displayHumidity.innerText = `Humidity : ${weatherData["current"]["humidity"]}`
    displayWindchill_C.innerText = `Windchill °C :  ${weatherData["current"]["windchill_c"]}`
    displayWindchill_F.innerText = `Windchill °F :  ${weatherData["current"]["windchill_f"]}`
    displayHeatIndex_C.innerText = `HeatIndex °C :  ${weatherData["current"]["heatindex_c"]}`
    displayHeatIndex_F.innerText = `HeatIndex °F :  ${weatherData["current"]["heatindex_f"]}`
    displayDewpoint_C.innerText = `Dewpoint °C : ${weatherData["current"]["dewpoint_c"]}`
    displayDewpoint_F.innerText = `Dewpoint °F : ${weatherData["current"]["dewpoint_f"]}`
    displayAQI_CO.innerText = `AQI-CO2 : ${weatherData["current"]["air_quality"]["co2"]}`
    displayAQI_NO2.innerText = `AQI-NO2 : ${weatherData["current"]["air_quality"]["no2"]}`
    displayAQI_SO2.innerText = `AQI-SO2 : ${weatherData["current"]["air_quality"]["so2"]}`
    displayAQI_PM2_5.innerText = `AQI-PM2.5 : ${weatherData["current"]["air_quality"]["pm2_5"]}`
    displayAQI_PM10.innerText = `AQI-PM10 : ${weatherData["current"]["air_quality"]["pm10"]}`


}


window.addEventListener('load', async() => {
    await getLocation();
});

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    let city;
    city = inputLocation.value;
    console.log("City :" + city);

    URL = `${BASE_URL}?key=${URL_KEY}&q=${city}&aqi=yes`
    console.log("url :" + URL);

    weatherInfo(URL);
});





