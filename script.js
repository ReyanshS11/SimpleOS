function updateTime() {
    document.querySelector("#time").innerHTML = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    document.querySelector("#date").innerHTML = new Date().toLocaleDateString();
}

setInterval(updateTime, 1000);

getLocation();

function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

let latitude = null;
let longitude = null;

function successCallback(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

function errorCallback(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
        case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
        case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
        case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
}

dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notes"));
dragElement(document.querySelector("#weather"));
dragElement(document.querySelector("#timer"));
dragElement(document.querySelector("#browser"));
dragElement(document.querySelector("#settings"));

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    }
    else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragging;
    }

    function dragging(e) {
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex"
    element.style.flex
}

var welcomeScreen = document.querySelector("#welcome");

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var notesScreen = document.querySelector("#notes");

var notesScreenClose = document.querySelector("#notesclose");
var notesScreenOpen = document.querySelector("#notesopen");

notesScreenClose.addEventListener("click", function() {
    closeWindow(notesScreen);
});

notesScreenOpen.addEventListener("click", function() {
    openWindow(notesScreen);
});

var timerScreen = document.querySelector("#timer");

var timerScreenClose = document.querySelector("#timerclose");
var timerScreenOpen = document.querySelector("#timeropen");

timerScreenClose.addEventListener("click", function() {
    closeWindow(timerScreen);
});

timerScreenOpen.addEventListener("click", function() {
    openWindow(timerScreen);
});

var browserScreen = document.querySelector("#browser");

var browserScreenClose = document.querySelector("#browserclose");
var browserScreenOpen = document.querySelector("#browseropen");

browserScreenClose.addEventListener("click", function() {
    closeWindow(browserScreen);
});

browserScreenOpen.addEventListener("click", function() {
    openWindow(browserScreen);
});

var settingsScreen = document.querySelector("#settings");

var settingsScreenClose = document.querySelector("#settingsclose");
var settingsScreenOpen = document.querySelector("#settingsopen");

settingsScreenClose.addEventListener("click", function() {
    closeWindow(settingsScreen);
});

settingsScreenOpen.addEventListener("click", function() {
    openWindow(settingsScreen);
});

var weatherScreen = document.querySelector("#weather");

var weatherScreenClose = document.querySelector("#weatherclose");
var weatherScreenOpen = document.querySelector("#weatheropen");

weatherScreenClose.addEventListener("click", function() {
    closeWindow(weatherScreen);
});

const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing Rime Fog",
  51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
  56: "Light Freezing Drizzle", 57: "Dense Freezing Drizzle",
  61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
  66: "Light Freezing Rain", 67: "Heavy Freezing Rain",
  71: "Slight Snowfall", 73: "Moderate Snowfall", 75: "Heavy Snowfall",
  77: "Snow Grains",
  80: "Slight Rain Showers", 81: "Moderate Rain Showers", 82: "Violent Rain Showers",
  85: "Slight Snow Showers", 86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Slight Hail", 99: "Thunderstorm with Heavy Hail"
};

weatherScreenOpen.addEventListener("click", function() {
    openWindow(weatherScreen);

    if (latitude) {
        const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weather_code&current=weather_code,temperature_2m,apparent_temperature,precipitation&temperature_unit=fahrenheit`;
    
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const current = data.current;
                const units = data.current_units;

                if (current.weather_code == 0) {
                    document.querySelector("#weatherimage").src = "Assets/sun-solid-full.svg";
                }
                else if (current.weather_code == 1 || current.weather_code == 2) {
                    document.querySelector("#weatherimage").src = "Assets/cloud-sun-solid.svg";
                }
                else if (current.weather_code == 3) {
                    document.querySelector("#weatherimage").src = "Assets/cloud-solid-full.svg";
                }
                else if (current.weather_code == 45 || current.weather_code == 48) {
                    document.querySelector("#weatherimage").src = "Assets/smog-solid-full.svg";
                }
                else if (current.weather_code == 51 || current.weather_code == 53 || current.weather_code == 55 || current.weather_code == 56 || current.weather_code == 57 || current.weather_code == 61 || current.weather_code == 63 || current.weather_code == 65 || current.weather_code == 66 || current.weather_code == 67 || current.weather_code == 80 || current.weather_code == 81 || current.weather_code == 82) {
                    document.querySelector("#weatherimage").src = "Assets/cloud-rain-solid-full.svg";
                }
                else if (current.weather_code == 71 || current.weather_code == 73 || current.weather_code == 75 || current.weather_code == 77 || current.weather_code == 85 || current.weather_code == 86) {
                    document.querySelector("#weatherimage").src = "Assets/snowflake-solid-full.svg";
                }
                else if (current.weather_code == 95 || current.weather_code == 96 || current.weather_code == 99) {
                    document.querySelector("#weatherimage").src = "Assets/cloud-bolt-full.svg";
                }

                document.querySelector("#weathertext").textContent = `${weatherCodeMap[current.weather_code]}`;
                document.querySelector("#precipitation").textContent = `Precipitation: ${current.precipitation} ${units.precipitation}`;
                document.querySelector("#temperature").textContent = `Temperature: ${current.temperature_2m} ${units.temperature_2m}`;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
});

var topBar = document.querySelector("#taskbar");
let biggestIndex = 1;

const windows = document.querySelectorAll(".window");

windows.forEach(window => {
    addWindowTapHandling(window);
});

function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    );
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

var content = [
    {
        title: "Welcome",
        date: `${new Date().toLocaleDateString()}`,
        content: `
            <p contenteditable="True">
                <span contenteditable="true">These are some simple notes.
                    </br>
                    </br>
                    There are some simple and generic notes here.
                    The kind you would find in anyone's notes app.
                    
                    </br>
                    </br>
                    Why would you want to see this? <b>idk</b>
                    </br>
                    You can look if you want.
                </span>
            </p>
        `
    },
    {
        title: "To-Do",
        date: `${new Date().toLocaleDateString()}`,
        content: `
            <p contenteditable="True">
                <span contenteditable="true">This is a To-Do list.
                If you somehow didn't figure that out, there's no hope for you.
                </span>
            </p>
            <ul contenteditable="True">
                <li>Ship project</li>
                <li>Work on SimpleOS</li>
                <li>Homework</li>
            </ul>        `
    }
]

function setNotesContent(index) {
    var notesContent = document.querySelector('#notestext');

    notesContent.innerHTML = content[index].content;
}

setNotesContent(0);

var sidebar = document.querySelector("#sidebar");

function addToSideBar(index) {
    var note = content[index];
    
    var newDiv = document.createElement("div");

    newDiv.innerHTML = `
        <p style="margin: 0px;" contenteditable="True">
            ${note.title}
        </p>
        <p style="font-size: 12px; margin: 0px;">
            ${note.date}
        </p>
    `

    newDiv.style.fontSize = "large";

    newDiv.addEventListener("click", function() {
        setNotesContent(index);
    });

    sidebar.appendChild(newDiv);
}

var currentHighestIndex = 0;

for (let i = 0; i < content.length; i++) {
    addToSideBar(i);

    currentHighestIndex = i;
}

function newNote() {
    content.push(
        {
        title: "My Note",
        date: `${new Date().toLocaleDateString()}`,
        content: `
            <p contenteditable="True">
                <span contenteditable="true">Write your thoughts down here.
                </span>
            </p>
            `
        }
    )

    currentHighestIndex += 1;
    addToSideBar(currentHighestIndex);

    console.log("added note");
}

let timerInterval;
let isRunning = false;

let minutesRemaining = parseInt(document.getElementById("timertext").textContent.slice(0, 2), 10);
let secondsRemaining = parseInt(document.getElementById("timertext").textContent.slice(3, 5), 10);
let millisecondsRemaining = parseInt(document.getElementById("timertext").textContent.slice(6), 10);

let initialTime = minutesRemaining * 60000 + secondsRemaining * 1000 + millisecondsRemaining;
let timeRemaining = initialTime;

function addOneMin() {
    if (isRunning)
    {
        return;
    }

    minutesRemaining += 1;

    timeRemaining = minutesRemaining * 60000 + secondsRemaining * 1000 + millisecondsRemaining;
    updateDisplay();
}

function addOneMin() {
    if (isRunning) return;

    timeRemaining += 60000;
    updateDisplay();
}

function subOneMin() {
    if (isRunning) return;

    timeRemaining = Math.max(0, timeRemaining - 60000);
    updateDisplay();
}

function addTenMin() {
    if (isRunning) return;

    timeRemaining += 600000;
    updateDisplay();
}

function subTenMin() {
    if (isRunning) return;

    timeRemaining = Math.max(0, timeRemaining - 600000);
    updateDisplay();
}

function addTenSec() {
    if (isRunning) return;

    timeRemaining += 10000;
    updateDisplay();
}

function subTenSec() {
    if (isRunning) return;

    timeRemaining = Math.max(0, timeRemaining - 10000);
    updateDisplay();
}

function updateDisplay() {
    let minutes = Math.floor(timeRemaining / 60000);
    let seconds = Math.floor((timeRemaining % 60000) / 1000);
    let milliseconds = timeRemaining % 1000;

    let mm = String(minutes).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');
    let mmm = String(milliseconds).padStart(3, '0');

    document.getElementById("timertext").textContent = `${mm}:${ss}:${mmm}`;
}

function startTimer() {
    if (isRunning) {
        return;
    }

    isRunning = true;

    let lastTimeStamp = performance.now();

    timerInterval = setInterval(() => {
        let now = performance.now();
        let deltaTime = Math.round(now - lastTimeStamp);
        lastTimeStamp = now;

        if (timeRemaining > 0) {
            timeRemaining -= deltaTime;

            if (timeRemaining < 0)
            {
                timeRemaining = 0;
            }
            updateDisplay();
        }
        else {
            clearInterval(timerInterval);
            isRunning = false;
            updateDisplay();
        }
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeRemaining = initialTime;
    updateDisplay();
}

updateDisplay();

function changeBackgroundColorToWhite() {
    document.body.style.backgroundColor = "white";
}

function changeBackgroundColorToGray() {
    document.body.style.backgroundColor = "lightgray";
}

function changeBackgroundColorToLightBlue() {
    document.body.style.backgroundColor = "lightblue";
}

function changeBackgroundColorToLightGreen() {
    document.body.style.backgroundColor = "lightgreen";
}

function changeBackgroundColorToTomato() {
    document.body.style.backgroundColor = "tomato";
}