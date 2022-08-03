
function $(id) {
    return document.querySelector(id);
}

var tabs = ["newPage"];

window.onload = () => {
$("#loadText").innerHTML = "Welcome to Oasis";
window.setTimeout(() => { // load for a bit more, than initialize
    $("#start").style.opacity = "0";
    window.setTimeout(() => {
        $("#start").style.display = "none";
        $("#start").remove();
    }, 500);
}, 1500);
};

var pointerX = 0;
var pointerY = 0;
document.onmousemove = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
}

var menu = document.getElementById("cm");

function closep() {
    menu.style.left = "-50000px";
}

function removeLet(str) {
  return str.replace(/\a-z*/g, '');
}

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (pointerY > window.innerHeight - menu.clientHeight + removeLet(menu.style.padding)) {
    menu.style.top = pointerY - menu.clientHeight - removeLet(menu.style.padding) + "px";
  } else {
    menu.style.top = pointerY + "px";
  }
  if (pointerX > window.innerWidth - menu.clientWidth - removeLet(menu.style.padding)) {
    menu.style.left = pointerX - menu.clientWidth - removeLet(menu.style.padding) + "px";
  } else {
    menu.style.left = pointerX + "px";
  }
});

function closeCurrentTab() {
    if (tabs.length > 1) {
    if (tabs[currentTab] != "newPage") {
        $("#" + tabs[currentTab].toString().replace("#", "")).remove();
    }
    document.getElementsByClassName("tab")[currentTab].remove();
    tabs = tabs.splice(currentTab, 1);
    currentTab--;
    go(currentTab);
    } else {
        alert("You can't close the last tab");
    }
}


var totaltabs = 1;
$("#newTab").onclick = () => {
    var d = document.createElement("div");
    d.className = "tab auto";
    d.innerText = "🧭";
    d.title = "Tab";
    var t = totaltabs;
    $("#tabs").appendChild(d);
    tabs.push("newPage");
    d.onclick = () => { go(t) };
    go(t);
    totaltabs++;
    input.focus();
}

var input = $("#newPageInputText");
$("#proxyInp").onsubmit = async (e) => {
    e.preventDefault(); 
	if (input.value.trim()) {
  window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        var frame = document.createElement("iframe");
        frame.src = __uv$config.prefix + __uv$config.encodeUrl("https://" + input.value.replace("https://", "").trim());
        input.value = "";
        frame.className = "page";
        frame.zIndex = "50";
        frame.id = "page" + currentTab;
        $("#main").appendChild(frame);
        tabs[currentTab] = frame.id.toString();
    });
	}
}

currentTab = 0;
function go(tab) {
    for (var i = 0; i < tabs.length; i++) {
        $("#" + tabs[i].toString().replace("#", "")).style.display="none";
    }
	var frame = 
    $("#" + tabs[tab].toString().replace("#", ""));
		frame.style.display="initial";
    frame.focus();
    currentTab = tab;
}

function goTo(id) {
    $("#" + id).style.display = "initial";
    $("#back").style.display = "initial";
}

function closePane() {
    $("#back").style.display = "none";
    $("#games").style.display = "none";
    $("#settings").style.display = "none";
    $("#" + tabs[currentTab].toString().replace("#", "")).focus();
}

function createGameTab(src, title) {
    var d = document.createElement("div");
    d.className = "tab auto";
    d.innerText = "🎮";
    d.title = title || "Tab";
    var t = totaltabs;
    $("#tabs").appendChild(d);
    tabs.push("newPage");
    d.onclick = () => { go(t) };
    go(t);
    totaltabs++;
    var frame = document.createElement("iframe");
    frame.src = src;
    input.value = "";
    frame.className = "page";
    frame.zIndex = "50";
    frame.id = "page" + currentTab;
    $("#main").appendChild(frame);
    tabs[currentTab] = frame.id.toString();
    frame.focus();
}

var games = [["2048", "/2048"], ["Astray", "/astray"], ["Breaklock", "/breaklock"], ["Chroma", "/chroma"], ["Cookie Clicker", "/cookie"], ["Cubefield", "/cubefield"], ["Dinosaur", "/dinosaur"], ["Doodle Jump", "/doodle-jump"], ["Drift", "/drift"], ["Ducklife", "/ducklife"], ["Ducklife 2", "/ducklife2"], ["Ducklife 3", "/ducklife3"], ["Ducklife 4", "/ducklife4"], ["Fireboy and Watergirl Forest Temple", "/fireboy-and-watergirl-forest-temple"], ["Flappy 2048", "/flappy-2048"], ["Flappy Bird", "/flappybird"], ["Friendly Fire", "/friendlyfire"], ["Geometry Dash", "/geometry"], ["Hexgl", "/hexgl"], ["Minecraft Classic", "/mc-classic"], ["Microsoft Flight Simulator", "/microsoft-flight-simulator"], ["PacMan", "/pacman"], ["Radius Raid", "/radius-raid"], ["Ritz", "/ritz"], ["Run3", "/run3"], ["Slope", "/slope"], ["Super Mario 64", "/sm64"], ["Space Invaders", "/spaceinvaders"], ["Swfs", "/swfs"], ["Vex 3", "/vex3"], ["Vex 4", "/vex4"], ["Vex 5", "/vex5"]];

for (var i = 0; i < games.length; i++) {
    let elem = document.createElement("a");
    elem.href = "javascript:createGameTab('/games/" + games[i][1] + "', 'Game')";
    elem.innerText = games[i][0];
    $("#gameList").innerHTML = $("#gameList").innerHTML + elem.outerHTML + "<br />";
}


window.onerror = function (msg, url, line) {
    alert("Error: " + msg);
    alert("File: " + url + " at line " + line);
  };
