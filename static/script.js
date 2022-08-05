
function $(id) {
    return document.querySelector(id);
}

if (localStorage.getItem("title") && localStorage.getItem("sc")) {
	document.title = localStorage.getItem("title");
	let oldFavicon = undefined;
	var link = document.createElement('link')
	link.id = 'favicon';
	link.type = 'image/x-icon'
	link.rel = 'icon';
	link.href = localStorage.getItem("sc");
	if (oldFavicon) {
    document.head.removeChild(oldFavicon);
	}
	document.head.appendChild(link);
}

function cloak() {
	var title = prompt('If you have a title for the tab, input it here, or the title will be "Google Docs"') || "Google Docs";
	localStorage.setItem("title", title);
	document.title = localStorage.getItem("title");
	let oldFavicon = undefined;
	var link = document.createElement('link')
	link.id = 'favicon';
	link.type = 'image/x-icon'
	link.rel = 'icon';
	var sc = prompt("If you have a tab icon, input it here, or Google Doc's icon will be used.") || "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
	localStorage.setItem("sc", sc);
	link.href = localStorage.getItem("sc");
	if (oldFavicon) {
    document.head.removeChild(oldFavicon);
	}
	document.head.appendChild(link);
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

window.onclick = () => { closep() }

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
    if (tabs.length > 1 && currentTab > 0) {
    document.getElementsByClassName("tab")[currentTab].remove();
    go(0);
    } else {
        alert("We are sorry, but you cannot close the last tab.");
			return false;
    }
}


var totaltabs = 1;
$("#newTab").onclick = () => {
    var d = document.createElement("div");
    d.className = "tab auto";
    d.innerText = "🧭";
    d.title = "Tab";
    $("#tabs").appendChild(d);
    tabs.push("newPage");
    d.onclick = "go(tabs.length-1)";
    go(tabs.length-1);
    input.focus();
	totaltabs++;
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
	  if (tabs.length < 2) return;
    for (var i = 0; i < tabs.length; i++) {
				if (tabs[i]) {
        	$("#" + tabs[i].toString().replace("#", "")).style.display="none";
				}
    }
	if (tabs[tab]) {
	var frame = 
    $("#" + tabs[tab].toString().replace("#", ""));
		frame.style.display="initial";
    frame.focus();
		currentTab = tab;
	}
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
    $("#tabs").appendChild(d);
    tabs.push("newPage");
    d.onclick = () => { go(totaltabs.length-1) };
    go(tabs.length-1);
    var frame = document.createElement("iframe");
    frame.src = src;
    input.value = "";
    frame.className = "page";
    frame.zIndex = "50";
    frame.id = "page" + currentTab;
    $("#main").appendChild(frame);
    tabs[currentTab] = frame.id.toString();
		totaltabs++;
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
