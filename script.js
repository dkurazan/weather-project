
let infoBlock = document.querySelector(".main__data")
let searchButton = document.querySelector(".header__search button");
let inputContent = document.querySelector(".header__input input");


// default data
fetch(`https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&APPID=5d066958a60d315387d9492393935c19`)
    .then(res => res.json())
    .then(data => {
        
        return new WeatherInfo(
            data.name,
            data.sys.country,
            data.weather[0].icon,
            data.main.temp,
            data.main.feels_like,
            data.weather[0].description,
            data.wind.speed,
            data.main.humidity,
            data.visibility,
        ).render()
    })

//data from search
class WeatherInfo {
    constructor(city, region, img, temp, feelsLike, desc, windSpeed, hum, vis) {
        this.city = city;
        this.region = region;
        this.img = img;
        this.temp = temp;
        this.feelsLike = feelsLike;
        this.desc = desc;
        this.windSpeed = windSpeed;
        this.hum = hum;
        this.vis = vis;
    }
    render() {
        this.desc = this.desc[0].toUpperCase() + this.desc.substring(1);
        this.vis = this.vis/1000;
        this.temp = Math.round(this.temp);
        this.feelsLike = Math.round(this.feelsLike);
        this.windSpeed = Math.round(this.windSpeed * 10)/10;
        let date = new Date() + "";
        let month = date.substring(4, 7)
        let day = date.substring(8, 10)
        let time = date.substring(16, 21)
        infoBlock.innerHTML = `
        <div class="main__data">
            <h2 class="main__time">${month} ${day}, ${time}</h2>
            <h1 class="main__city">${this.city}, ${this.region}</h1>
            <div class="main__temp">
                <img src="https://openweathermap.org/img/w/${this.img}.png" alt="">
                <h1>${this.temp}°C</h1>
            </div>
            <h3 class="main__feels-like">Feels like ${this.feelsLike}°C. ${this.desc}</h3>
            <div class="main__other-info">
                <h3 class="wind-speed">${this.windSpeed} m/s</h3>
                <h3 class="humidity">Humidity: ${this.hum}%</h3>
                <h3 class="visibility">Visibility: ${this.vis}km</h3>
            </div>
        </div>
        `
    }
}

searchButton.addEventListener("click", () => {
    let myCity = inputContent.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
    .then(res => res.json())
    .then(data => {
        
        return new WeatherInfo(
            data.name,
            data.sys.country,
            data.weather[0].icon,
            data.main.temp,
            data.main.feels_like,
            data.weather[0].description,
            data.wind.speed,
            data.main.humidity,
            data.visibility,
        ).render()
    })
})

inputContent.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let myCity = inputContent.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
        .then(res => res.json())
        .then(data => {
            
            return new WeatherInfo(
                data.name,
                data.sys.country,
                data.weather[0].icon,
                data.main.temp,
                data.main.feels_like,
                data.weather[0].description,
                data.wind.speed,
                data.main.humidity,
                data.visibility,
            ).render()
        })
    }
});
