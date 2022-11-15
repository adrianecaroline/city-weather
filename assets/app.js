import {key} from '../module/key.js'

const api = {
    key: key,
    lang: 'pt_br',
    units: 'metric'
}

let result = document.querySelector('.result');
let cityElement= document.querySelector('.city');
let tempElement = document.querySelector('.temp span');
let wheatherElement = document.querySelector('.clima');
let content = document.querySelector('.content');
let cityInput = document.querySelector('#text');
let searchButton = document.querySelector('#submit'); 
let img = document.querySelector('#weather');
let clean = document.querySelector('.close');
let date = document.querySelector('.date');


//funções
//acessa os dados da api
const getWeatherData = async(city) => {
    const wheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${api.units}&appid=${api.key}&lang=${api.lang}`

    const res = await fetch(wheatherURL)
    const data = await res.json();

    console.log(data)
    return data

}

//exibe os dados da api
const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    // content.style.borderRadius = "10px 10px 0px 0px";
    content.classList.add("border");
    clean.style.display = 'block'
    result.style.display = "flex";
    cityElement.innerHTML = data.name + ", " + data.sys.country;
    tempElement.innerText = parseInt(data.main.temp);
    img.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    
    let weather = data.weather[0].description;
    wheatherElement.innerHTML = weather[0].toUpperCase() + weather.substring(1).toLowerCase();
}

function deleteValue(city) {
    city = ""
    cityInput.value = city

}

clean.addEventListener('click', () => {
    result.style.display = 'none';
    clean.style.display = 'none';
    content.classList.remove("border")
    let city = cityInput.value;
    deleteValue(city)
})

//eventos
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let city = cityInput.value;
    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        let city = cityInput.value;
        showWeatherData(city)
    }
})








// const img = document.createElement("img"); //createElemente - cria uma tag
//     img.classList.add("weather"); //na tag criada add uma classe
//     img.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`); 

//     div.appendChild(img)