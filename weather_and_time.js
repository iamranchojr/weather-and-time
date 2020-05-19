const fetchWeather = async (input) => {
  const apiAppId = "957ff3d1ecfe8f6d5d9312123df46df5";
  let url = `http://api.openweathermap.org/data/2.5/weather?appid=${apiAppId}`

  // if input is number, search by zip code
  url += isNaN(parseInt(input)) ? `&q=${input}` : `&zip=${input}`

  try {
    const data = await fetchData(url)

    // temperature by default is in Kelvin, we convert it to degree celcius
    const temperature = `${(data.main.temp - 273.15).toFixed(2)}°C`
    const windSpeed = `${data.wind.speed} m/s`

    return `${temperature}, Wind at ${windSpeed}, ${data.main.humidity}% Humidity`
  } catch (error) {
    return `An error occurred while retrieving weather for ${input}`
  }
};

const fetchTime = async (input) => {
  const apiKey = "6Jq2BcvdhL72HCr9PpcA7UGtBrsdz7"
  const url = `https://www.amdoren.com/api/timezone.php?api_key=${apiKey}&loc=${input}`

  try {
    const data = await fetchData(url)

    return `${input} is ${data.time.toTimeString()}`
  } catch (error) {
    return `An error occurred while retrieving time of ${input}`
  }
}

const fetchData = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

const getWeatherAndTime = (input) => {
  if (Array.isArray(input)) {
    input.forEach(async (item) => {
      const weather = await fetchWeather(item)
      const time = await fetchTime(item)

      console.log(`${item}: Weather = ${weather}. Time: ${time}`)
    })
  }

  console.log("Invalid input")
}
