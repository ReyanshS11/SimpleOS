function updateTime() {
    document.querySelector("#time").innerHTML = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    document.querySelector("#date").innerHTML = new Date().toLocaleDateString();
}

setInterval(updateTime, 1000);

dragElement(document.getElementById("welcome"));

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
