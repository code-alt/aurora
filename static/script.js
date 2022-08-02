
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
    }, 500);
}, 1500);
};

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
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        var frame = document.createElement("iframe");
        frame.src = __uv$config.prefix + __uv$config.encodeUrl(input.value);
        input.value = "";
        frame.className = "page";
        frame.zIndex = "50";
        frame.id = "page" + currentTab;
        $("#main").appendChild(frame);
        tabs[currentTab] = frame.id.toString();
    });
}

currentTab = 0;
function go(tab) {
    for (var i = 0; i < tabs.length; i++) {
        $("#" + tabs[i].toString().replace("#", "")).style.display="none";
    }
    $("#" + tabs[tab].toString().replace("#", "")).style.display="initial";
    $("#" + tabs[tab].toString().replace("#", "")).focus();
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

var games = [["2048", "/2048"], ["Astray", "/astray"], ["Breaklock", "/breaklock"], ["Chroma", "/chroma"], ["Cookie Clicker", "/cookie"], ["Cubefield", "/cubefield"], ["Dinosaur", "/dinosaur"], ["Doodle Jump", "/doodle-jump"], ["Drift", "/drift"], ["Ducklife", "/ducklife"], ["Ducklife 2", "/ducklife2"], ["Ducklife 3", "/ducklife3"], ["Ducklife 4", "/ducklife4"], ["Fireboy and Watergirl Forest Temple", "/fireboy-and-watergirl-forest-temple"], ["Flappy 2048", "/flappy-2048"], ["Flappy Bird", "/flappybird"], ["Friendly Fire", "/friendlyfire"], ["Geometry Dash", "/geometry"], ["Gopher Kart", "/gopher-kart"], ["Hexgl", "/hexgl"], ["Minecraft Classic", "/mc-classic"], ["Microsoft Flight Simulator", "/microsoft-flight-simulator"], ["PacMan", "/pacman"], ["Radius Raid", "/radius-raid"], ["Ritz", "/ritz"], ["Run3", "/run3"], ["Slope", "/slope"], ["Super Mario 64", "/sm64"], ["Space Invaders", "/spaceinvaders"], ["Swfs", "/swfs"], ["Vex 3", "/vex3"], ["Vex 4", "/vex4"], ["Vex 5", "/vex5"]];

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