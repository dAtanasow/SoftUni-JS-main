function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather)
    const currentLocationRef = document.getElementById("location");
    const forecastDivRef = document.getElementById("forecast");
    const currentForecastRef = document.getElementById("current");
    const upcomingRef = document.getElementById("upcoming");

    const getWeatherUrl = "http://localhost:3030/jsonstore/forecaster/locations"
    const todayWeatherUrl = "http://localhost:3030/jsonstore/forecaster/today/"
    const upcomingWeatherUrl = "http://localhost:3030/jsonstore/forecaster/upcoming/"

    async function getWeather() {
        try {
            const userInput = currentLocationRef.value;
            forecastDivRef.style.display = 'block';
            const response = await fetch(getWeatherUrl);
            const data = await response.json();
            const currentLocation = data.find(x => x.name === userInput);

            await todayWeather(currentLocation.code);
            await upcomingWeather(currentLocation.code);
        } catch (error) {
            forecastDivRef.textContent = "Error";
        }
    }

    async function todayWeather(code) {
        const response = await fetch(todayWeatherUrl + code);
        const data = await response.json();
        const todayInfo = createForecastTodaySection(data);
        currentForecastRef.appendChild(todayInfo);
    }

    async function upcomingWeather(code) {
        const response = await fetch(upcomingWeatherUrl + code);
        const data = await response.json();
        const upcomingInfo = createForecastUpcomingSection(data)
        upcomingRef.appendChild(upcomingInfo);
    }

    function createSpan(classContainer, classSpan, name, data) {
        const span = document.createElement("span");
        span.classList.add(classContainer)

        let nameSpan = document.createElement("span");
        nameSpan.classList.add(classSpan);
        classSpan === 'symbol' ? nameSpan.innerHTML = findSymbol(data.condition) : nameSpan.textContent = name

        let degrees = document.createElement("span");
        degrees.classList.add("forecast-data");
        degrees.innerHTML = `${data.low + findSymbol("Degrees")}/${data.high + findSymbol("Degrees")}`;

        let condition = document.createElement("span");
        condition.classList.add("forecast-data");
        condition.textContent = data.condition;

        span.appendChild(nameSpan);
        span.appendChild(degrees);
        span.appendChild(condition);

        return span;
    }

    function createForecastTodaySection(data) {
        const container = document.createElement("div");
        container.classList.add("forecasts");
        const conditionSpan = document.createElement("span");
        conditionSpan.classList.add("condition");
        conditionSpan.classList.add("symbol");
        conditionSpan.innerHTML = findSymbol(data.forecast.condition);

        container.appendChild(conditionSpan);
        const spanContainer = createSpan("condition", "forecast-data", data.name, data.forecast);

        container.appendChild(spanContainer);
        return container;
    }

    function createForecastUpcomingSection(data) {
        const container = document.createElement("div");
        container.classList.add("forecast-info");

        const upcoming1 = createSpan("upcoming", "symbol", data.name, data.forecast[0])
        const upcoming2 = createSpan("upcoming", "symbol", data.name, data.forecast[1])
        const upcoming3 = createSpan("upcoming", "symbol", data.name, data.forecast[2])

        container.appendChild(upcoming1);
        container.appendChild(upcoming2);
        container.appendChild(upcoming3);

        return container;
    }

    function findSymbol(condition) {
        switch (condition) {
            case "Sunny": return "&#x2600";
            case "Partly sunny": return "&#x26C5";
            case "Overcast": return "&#x2601";
            case "Rain": return "&#x2614";
            case "Degrees": return "&#176";
        }
    }
}

attachEvents();