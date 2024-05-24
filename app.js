var input = document.querySelector("#search");
var searchbtn = document.querySelector("#searchbtn");
var temp = document.querySelector("#temp");
var description = document.querySelector("#description");
var cityname = document.querySelector("#cityname");
var countrycode = document.querySelector("#countrycode");
var humid = document.querySelector("#humidity");
var windspeed = document.querySelector("#windspeed");
var head = document.querySelector("#headtext")
var weatherimage = document.querySelector("#weatherimage");

var weathershow = document.querySelector(".weathershow");

const showingData = (data) => {

    if(data.cod === `404`){
        var notfound = document.querySelector(".weathershow");
        notfound.innerHTML = "NOT SUCH PLACE AVAILABLE"
        notfound.style.fontSize = "3vw"
        notfound.style.fontWeight = "900"
        notfound.style.textAlign = "center"
        notfound.style.backgroundImage = "url('not.png')"
        notfound.style.backgroundSize = "cover"
        notfound.style.backgroundRepeat = "no-repeat"
        return;
    }

    weathershow.style.display = "flex"
    head.innerHTML = `${data.name}`
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}`;
    description.innerHTML = `${data.weather[0].description}`;

    cityname.innerHTML = `${data.name}`;
    countrycode .innerHTML = `${data.sys.country}`;
    humid.innerHTML = `${data.main.humidity}%`;
    windspeed.innerHTML = `${data.wind.speed}Km/H`;


    switch(data.weather[0].main){
        case 'Clouds':
            weatherimage.src = "cloud.png";
            break;
        case 'Clear':
            weatherimage.src = "clear.png";
            break;
        case 'Rain':
            weatherimage.src = "rain.png";
            break;
        case 'Mist':
            weatherimage.src = "mist.png";
            break;
        case 'Snow':
            weatherimage.src = "snow.png";
            break;

    }
}

async function getweather(city){
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=110e0636b736d453a8aa32b6a90aef3f`).then(res => res.json())
    
    showingData(data)

}

searchbtn.addEventListener('click', ()=>{
    getweather(input.value)
});

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const main = async () => {
    try {
        const currentPosition = await getCurrentLocation();
        console.log(currentPosition);

        const { latitude, longitude} = currentPosition.coords

        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=110e0636b736d453a8aa32b6a90aef3f`).then(res => res.json())

        console.log(data);

        showingData(data)

    } catch (error) {
        console.error('Error getting location:', error);
    }
};

main();
