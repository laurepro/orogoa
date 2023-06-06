window.addEventListener("load", (event) => {
  const panels = document.querySelectorAll("div.panel");
  const tabs = document.querySelector("nav ul");
  tabs.addEventListener("click", (event) => {
    tabs.querySelector(".active").classList.remove("active");
    panels.forEach((panel) => {
      if (event.target.id == panel.id) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });
    event.target.classList.add("active");
  });
  var level = calculateView();
  drawLevel(level);
  setTimeout(function () {
    drawSea(level);
  }, 30000);
  var doResize;
  window.addEventListener("resize", function () {
    this.clearTimeout(doResize);
    doResize = setTimeout(function () {
      level = calculateView();
      drawLevel(level);
    }, 100);
  });
});

function calculateView() {
  var isActive = document.querySelector("div.panel#level").classList.contains("active");
  document.querySelector("div.panel#level").classList.add("active");
  const now = new Date(Date.now());
  var level = { data: [], min: 10, max: 0 };
  eval(/var data = \[\[.*\]\]/.exec(document.getElementById(rid).contentDocument.querySelector("script:not([src])").textContent)[0]);
  level.data = data;
  level.data.forEach(function (hor) {
    level.min = Math.floor(Math.min(hor[1], level.min));
    level.max = Math.floor(Math.max(hor[1], level.max));
  });
  level.cur = `${padTime(now.getHours())}:${padTime(now.getMinutes())}:${padTime(now.getSeconds())}`;
  level.data.forEach(function (hor) {
    if (level.lev == undefined && hor[0] > level.cur) {
      level.lev = hor[1];
    }
  });
  level.view = document.querySelector("div.panel#level #view");
  level.height = level.view.offsetHeight;
  level.width = level.view.offsetWidth;
  level.step = level.height / level.max;
  level.sand = (2.7 - level.min) * level.step;
  level.road = 0.3 * level.step;
  level.car = (2.7 - level.min) * level.step + 0.3 * level.step;
  level.sea = Math.round((level.lev - level.min) * level.step);
  if (!isActive) {
    document.querySelector("div.panel#level").classList.remove("active");
  }
  return level;
}

function padTime(number) {
  return number.toString().padStart(2, "0");
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

function drawLevel(level) {
  document.querySelector("div.panel#level #info").innerHTML = `at ${level.cur} sea is ${level.lev} meters high !`;
  level.view.querySelector("#road").style.height = level.road;
  level.view.querySelector("#road").style.bottom = level.sand;
  level.view.querySelector("#sand").style.height = level.sand;
  drawScale(level);
  drawSea(level);
}

function drawSea(level) {
  sea = level.height - level.sea;
  var waves = [];
  [
    {
      pos: level.width / 2,
      beg: "0s",
    },
    {
      pos: level.width / 2,
      beg: "2s",
    },
    {
      pos: level.width / 3,
      beg: "1s",
    },
    {
      pos: (level.width / 3) * 2,
      beg: "0s",
    },
  ].forEach(function (w) {
    waves.push(`<path class="wave" d="M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}"><animate attributeName="d" dur="5s" begin="${w.beg}" values="M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}" repeatCount="indefinite" /></path>`);
  });

  var pathes = waves.join("");
  level.view.querySelector("#waves").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="sea" x="0px" y="0px" viewBox="0 0 ${level.width} ${level.height}" style="enable-background:new 0 0 ${level.width} ${level.height};" xml:space="preserve"><style type="text/css">.wave{opacity:0.6;fill:#0C3157;enable-background:new;}</style>${pathes}</svg>`;
}

function drawCar(width, floor, ratio) {
  var car = `car${Math.random(5) + 1}.svg`;
  var anim = new Element("img");
  anim.src = car;
  view.querySelector("#view").appendChild(anim);
}
