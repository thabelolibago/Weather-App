document.addEventListener("DOMContentLoaded", function() {
    const myweatherButton = document.getElementById("myweatherButton");
    const content = document.querySelector(".content");

    myweatherButton.addEventListener("click", function() {
        // Toggle the visibility of the content
        content.classList.toggle("hidden");
    });

    const grantAccessButton = document.getElementById("grantaccessButton");
    grantAccessButton.addEventListener("click", function() {
        // Check if geolocation is available
        if ("geolocation" in navigator) {
            // Request location access
            navigator.geolocation.getCurrentPosition(function(position) {
                // You can use the `position` object to access the latitude and longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetch weather data from OpenWeatherMap
                const apiKey = "";
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const cardContent = document.querySelector(".card-content");
                        cardContent.innerHTML = `
                            <h2 class="city">Weather in Your Location</h2>
                            <h1 class="temp">${(data.main.temp - 273.15).toFixed(1)}°C</h1>
                            <div class="flex">
                                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="" class="icon" />
                                <div class="description">${data.weather[0].description}</div>
                            </div>
                            <div class="humidity">Humidity: ${data.main.humidity}%</div>
                            <div class="wind">Wind speed: ${data.wind.speed} m/s</div>
                        `;
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });

                // Replace the card's content with weather information
                const card = document.querySelector(".card");
                card.innerHTML = `
                    <div class="button-container">
                        <div class="button-left">
                            <div class="dropdown">
                                <button><span class="menu-icon">&#9776;</span></button>
                                <div class="dropdown-options">
                                    <a href="about.html">About Weather App</a>
                                    <a href="contact.html">Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div class="button-center">
                            <button id="myweatherButton">My Weather</button>
                            <div class="content hidden">
                                <img src="images/location-pin.png" height="50">
                                <h2>Grant Location Access</h2>
                                <p>Allow Access to get Weather information</p>
                                <button id="grantaccessButton">GRANT ACCESS</button>
                            </div>
                        </div>
                        <div class="button-right">
                            <a href="search.html"><button id="searchButton">Search Weather</button></a>
                        </div>
                    </div>
                    <div class="card-content"></div> <!-- Weather data will be displayed here -->
                `;

                // Hide the content after obtaining location
                content.classList.add("hidden");
            }, function(error) {
                // Handle errors if the user denies access or if there's an issue with geolocation
                console.error("Error getting location:", error.message);
            });
        } else {
            // Geolocation is not supported in this browser
            alert("Geolocation is not supported in this browser.");
        }
    });
});
