  document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.querySelector('#city-input')
    const getweatherBtn = document.querySelector('#get-weather-btn')
    const weatherInfo = document.querySelector('#weather-info')
    const citynameDisplay = document.querySelector('#city-name')
    const temperatureDisplay = document.querySelector('#temperature')
    const descriptiondis = document.querySelector('#description')
    const errormessage = document.querySelector('#error-message')


    const API_KEY = "888acc5dfbad598857e526f75cb392fb"// env variables
    getweatherBtn.addEventListener('click',async ()=>{
      const city = cityInput.value.trim()
      if(!city)return;

      // it may through error
      // server/ database is always in another continet
      try {
        console.log("Before fetch call");
        const weatherdata = await fetchweatherdata(city);
        console.log("After fetch call");
        displayWeatherData(weatherdata);
      } catch (error) {
        console.log("Error caught:", error);
        console.log("Error happened"); // 👈 add this
        ShowErrors();
      }

    })

    async function fetchweatherdata(city){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const response = await fetch(url);
  console.log("Response received");

  const data = await response.json();
  console.log("Data parsed:", data);

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

    function displayWeatherData(data){
      console.log(data);
      // console.log("Function called"); // 👈 add this
      const {name, main, weather} = data
      citynameDisplay.textContent = name
      temperatureDisplay.textContent = `temperature : ${main.temp}`
      descriptiondis.textContent = `Weather : ${weather[0].description}`

      // unlock the display
      weatherInfo.classList.remove('hidden')
      errormessage.classList.add('hidden')
    }

    function ShowErrors(){
      weatherInfo.classList.add('hidden')
      errormessage.classList.remove('hidden')
      console.log("error");
      
    }
  })