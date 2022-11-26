//Variáveis
const apikey = "62f8c67a8734fe180b3ff7677012c755";
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.getElementById("city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperatura span")
const descElement = document.querySelector("#description")
const weatherIconElement =document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

//Funções



const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()
    
    console.log(data)
    return data


}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    cityElement.innerHTML = data.name
    tempElement.innerHTML = parseInt(data.main.temp)
    descElement.innerHTML = data.weather[0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`) 
    countryElement.setAttribute("src", apiCountryURL + data.sys.country)
    umidityElement.innerHTML = `${data.main.humidity}%`
    windElement.innerHTML = `${data.wind.speed}km/h`

    weatherContainer.classList.remove("hide")

}

//Evento
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city)

})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})