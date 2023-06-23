var panels,
  tabs,
  panelname = localStorage.getItem("panel") || "level";

window.addEventListener("load", () => {
  document.querySelector("#rootstyle").innerText = `:root {--main-height: ${window.innerHeight}px }`;
  panels = document.querySelector("div#panels");
  tabs = document.querySelector("nav#tabs ul");
  tabs.addEventListener("click", (event) => {
    changePanel(event.target.id);
  });
  var level = calculateView();
  drawLevel(level);
  drawCar(level);
  setTimeout(function () {
    drawSea(level);
  }, 30000);
  var doResize;
  window.addEventListener("resize", function () {
    this.clearTimeout(doResize);
    doResize = setTimeout(function () {
      document.querySelector("#rootstyle").innerText = `:root {--main-height: ${window.innerHeight}px }`;
      level = calculateView();
      drawLevel(level);
    }, 100);
  });
});

function changePanel(panelname) {
  tabs.querySelectorAll(".active").forEach((tab) => tab.classList.remove("active"));
  panels.querySelectorAll(".active").forEach((panel) => panel.classList.remove("active"));
  tabs.querySelector(`[id="${panelname}"]`).classList.add("active");
  panels.querySelector(`[id="${panelname}"]`).classList.add("active");
  localStorage.setItem("panel", panelname);
}

function calculateView() {
  document.querySelector("div.panel#level").classList.add("active");
  var level = { data: [], min: 10, max: 0, tides: [] };
  eval(/var data = \[\[.*\]\]/.exec(document.getElementById(rid).contentDocument.querySelector("script:not([src])").textContent)[0]);
  level.data = data;
  level.data.forEach(function (hor) {
    level.min = Math.floor(Math.min(hor[1], level.min));
    level.max = Math.floor(Math.max(hor[1], level.max));
  });
  level.max += 1;
  level.view = document.querySelector("div.panel#level");
  level.height = level.view.offsetHeight;
  level.width = level.view.offsetWidth;
  level.step = level.height / level.max;
  document.querySelector("#rootstyle").innerText = `:root {--main-step: ${level.step}px; --main-bottom: -${level.min * level.step}px; --main-height: ${window.innerHeight}px }`;
  document
    .getElementById(rid)
    .contentDocument.querySelectorAll(".hlt.hltOfTheDay .table-striped tbody tr")
    .forEach(function (tide) {
      var td = tide.querySelectorAll("td");
      if (td.length > 0) {
        if (td[0].innerText.trim() == "BM") {
          level.tides.push(td[1].innerText.trim());
        }
      }
    });
  changePanel(panelname);
  return level;
}

function drawLevel(level) {
  drawScale(level);
  drawSea(level);
}

function drawScale(level) {
  document.querySelector("#scale").innerHTML = "";
  for (var i = level.max + 1; i >= level.min; i--) {
    const li = document.createElement("li");
    const text = document.createTextNode(i);
    li.appendChild(text);
    document.querySelector("#scale").appendChild(li);
  }
  level.view.querySelector("#scale").style.background = `linear-gradient(0deg, lime 0, lime ${(2 - level.min) * level.step}px, orange ${(2.1 - level.min) * level.step}px, orange ${(2.5 - level.min) * level.step}px, red ${(2.7 - level.min) * level.step}px, red 100%)`;
}

function drawSea(level) {
  const now = new Date(Date.now());
  level.now = `${padTime(now.getHours())}:${padTime(now.getMinutes())}:${padTime(now.getSeconds())}`;
  level.current = 0;
  level.data.forEach(function (step, index) {
    if (level.current == 0 && step[0] > level.now) {
      level.current = index;
    }
  });
  var high = level.data[level.current][1];
  document.querySelector("#now").dataset.values = ["_date_", high];
  sea = level.height - Math.round((high - level.min) * level.step);
  var waves = [];
  [
    { pos: level.width / 2, beg: "0s" },
    { pos: level.width / 2, beg: "2s" },
    { pos: level.width / 3, beg: "1s" },
    { pos: (level.width / 3) * 2, beg: "0s" },
  ].forEach(function (w) {
    waves.push(`<path class="wave" d="M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}"><animate attributeName="d" dur="5s" begin="${w.beg}" values="M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}" repeatCount="indefinite" /></path>`);
  });

  var pathes = waves.join("");
  level.view.querySelector("#waves").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="sea" x="0px" y="0px" viewBox="0 0 ${level.width} ${level.height}" style="enable-background:new 0 0 ${level.width} ${level.height};" xml:space="preserve"><style type="text/css">.wave{opacity:0.5;fill:#0C3157;enable-background:new;}</style>${pathes}</svg>`;
  drawTimes(level);
  translate();
}

function padTime(number) {
  return number.toString().padStart(2, "0");
}

function drawTimes(level) {
  var next = Math.min(level.current + 1, level.data.length - 1);
  var flux = level.data[next][1] < level.data[level.current][1];
  var direction = document.createElement("li");
  direction.innerText = flux ? "🢃" : "🢁";
  document.querySelector("#times").innerHTML = "";
  document.querySelector("#times").appendChild(direction);
  var i = level.current,
    go = flux;
  while (go == flux && i < level.data.length - 1) {
    go = level.data[i + 1][1] < level.data[i][1];
    var li = document.createElement("li");
    var text = document.createTextNode(level.data[i][0].substring(0, 5));
    li.appendChild(text);
    li.style.bottom = (level.data[i][1] - level.min) * level.step + "px";
    document.querySelector("#times").appendChild(li);
    i++;
  }
  level.view.querySelector("#times").style.background = `linear-gradient(0deg, lime 0, lime ${(2 - level.min) * level.step}px, orange ${(2.1 - level.min) * level.step}px, orange ${(2.5 - level.min) * level.step}px, red ${(2.7 - level.min) * level.step}px, red 100%)`;
}

function drawCar(level) {
  var car = Math.floor(Math.random() * 5) + 1;
  var direction = Math.random() > 1 / 2 ? "left" : "right";
  var anim = document.createElement("img");
  level.view.appendChild(anim);
  anim.classList.add(`car`);
  anim.classList.add(`t${car}`);
  anim.src = `ressources/svg/car${car}.svg`;
  anim.classList.add(direction);
  setTimeout(() => {
    anim.remove();
    drawCar(level);
  }, 10000);
}
