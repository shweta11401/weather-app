
let weather = {
  apiKey: "1f00cb5ae27d727c3fbb1e624289eb5f",
  unsplashApiKey: "zgVKEjKk3j5FZZ4eJ9ND1J0Xc4ZDK7nHNxH_ikd7dAk", // Replace with your Unsplash API Key

  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&appid=" 
      + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    console.log(name, icon, description, temp, humidity, speed, country);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/hr";
    document.querySelector(".weather").classList.remove("loading");

    // Fetch and set background image based on city name
    this.fetchBackgroundImage(name, country);
  },

  fetchBackgroundImage: function(city, country) {
    const location = city + " " + country; // Combine city and country for better search results
    fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${this.unsplashApiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;
          document.body.style.backgroundImage = `url('${imageUrl}')`;
        } else {
          // If no image is found for the city, you can fall back to a default image
          document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60')";
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        // Fallback image if there's an error fetching from Unsplash
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60')";
      });
  },

  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Default fetch for Denver
weather.fetchWeather("Mumbai");
