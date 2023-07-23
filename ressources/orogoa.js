Date.prototype.hms = function() {
	return `${this.getHours().pad(2)}:${this.getMinutes().pad(2)}:${this.getSeconds().pad(2)}`;
}

Date.prototype.hm = function() {
	return `${this.getHours().pad(2)}:${this.getMinutes().pad(2)}`;
}

Number.prototype.pad = function(pad) {
	return this.toString().padStart(pad, "0");
}


const registerServiceWorker = async () => {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
			if (registration.installing) {
				console.log("Service worker installation");
			} else if (registration.waiting) {
				console.log("Service worker installed");
			} else if (registration.active) {
				console.log("Service worker active");
			}
		} catch (error) {
			console.error(`L'enregistrement a échoué : ${error}`);
		}
	}
};

var panels,
	panelname = localStorage.getItem("panel") || "level";

window.addEventListener("load", () => {

	var roots = {};
	const setRootCss = (key, value) => {
		roots[key] = value;
		var root = "";
		for (const [key, value] of Object.entries(roots)) {
			root += `${key}: ${value};`;
		}
		document.querySelector("#rootstyle").innerText = `:root {${root}}`;
	}


	const changePanel = (panelname) => {
		document.querySelector("nav#tabs ul").querySelectorAll(".active").forEach((tab) => tab.classList.remove("active"));
		panels.querySelectorAll(".active").forEach((panel) => panel.classList.remove("active"));
		document.querySelector("nav#tabs ul").querySelector(`[id="${panelname}"]`).classList.add("active");
		panels.querySelector(`[id="${panelname}"]`).classList.add("active");
		localStorage.setItem("panel", panelname);
	}

	const calculateView = () => {
		document.querySelector("div.panel#level").classList.add("active");
		var level = {
			data: [],
			min: 10,
			max: 0,
			tides: []
		};
		eval(/var data = \[\[.*\]\]/.exec(document.getElementById(rid).contentDocument.querySelector("script:not([src])").textContent)[0]);
		level.data = data;
		level.data.forEach(function(hor) {
			level.min = Math.floor(Math.min(hor[1], level.min));
			level.max = Math.floor(Math.max(hor[1], level.max));
		});
		level.max = 6;
		level.view = document.querySelector("div.panel#level");
		level.height = level.view.offsetHeight;
		level.width = level.view.offsetWidth;
		level.step = level.height / level.max;
		setRootCss("--main-step", `${level.step}px`);
		setRootCss("--main-bottom", `-${level.min * level.step}px`);
		var todayTides = extractTide(
			document.getElementById(rid).contentDocument.querySelector("#data-container .hlt.hltOfTheDay table"),
			0
		);
		var tomorrowTides = extractTide(
			document.getElementById(rid).contentDocument.querySelector("#data-container .hlt:not(.hltOfTheDay) table"),
			1
		);
		level.tides = todayTides.concat(tomorrowTides);
		changePanel(panelname);
		return level;
	}

	const extractTide = (table, upday) => {
		var tides = [],
			high = 120;
		table.querySelectorAll("tbody tr")
			.forEach(function(tide) {
				var td = tide.querySelectorAll("td");
				if (td.length > 0) {
					if (td[0].innerText.trim() == "PM") {
						high = Math.min(high, parseInt(td[3].innerText));
					}
				}
			});

		table.querySelectorAll("tbody tr")
			.forEach(function(tide) {
				var td = tide.querySelectorAll("td");
				if (td.length > 0) {
					if (td[0].innerText.trim() == "BM") {
						var [hour, minute] = td[1].innerText
							.trim()
							.split(":")
							.map((v) => parseInt(v));
						var inNow = new Date();
						inNow.setHours(hour);
						inNow.setMinutes(minute);
						var range = (high - 20) * 60000;
						var inTime = (Math.round(inNow.getTime() / 1000) * 1000) + (upday * 86400000)
						var inStart = inTime - range;
						var inStop = inTime + range;
						tides.push({
							tide: inTime,
							start: inStart,
							stop: inStop
						});
					}
				}
			});
		return tides;
	}

	const drawLevel = (level) => {
		drawScale(level);
		drawSea(level);
	}

	const drawScale = (level) => {
		document.querySelector("#scale").innerHTML = "";
		for (var i = 0; i <= level.max + 1; i++) {
			const li = document.createElement("li");
			li.classList.add('metric');
			li.style.bottom = ((i - level.min) * level.step) + "px";
			const text = document.createTextNode(i);
			li.appendChild(text);
			document.querySelector("#scale").appendChild(li);
		}
		feetstep = level.step * 0.3048;
		feetmax = Math.floor((level.max + 1) / 0.3048);
		feetmin = level.min / 0.3048;
		for (var i = 0; i <= feetmax + 1; i++) {
			const li = document.createElement("li");
			li.classList.add('imperial');
			li.style.bottom = ((i - feetmin) * feetstep) + "px";
			const text = document.createTextNode(i);
			li.appendChild(text);
			document.querySelector("#scale").appendChild(li);
		}
		level.view.querySelector("#scale").style.background = `linear-gradient(0deg, lime 0, lime ${(2.4 - level.min) * level.step}px, orange ${(2.5 - level.min) * level.step}px, orange ${(2.7 - level.min) * level.step}px, red ${(2.8 - level.min) * level.step}px, red 100%)`;
	}

	const drawSea = (level) => {
		const now = new Date();
		level.current = 0;
		level.data.forEach(function(step, index) {
			if (level.current == 0 && step[0] > now.hms()) {
				level.current = index;
			}
		});
		var high = level.data[level.current][1];
		document.querySelector("#now").dataset.values = [now.hm(), high + "m"];
		document.querySelector("#above").dataset.values = [high - 3 + "m"];
		document.querySelector("#above").style.display = high > 3 ? "" : "none";
		document.querySelector("#under").dataset.values = [Math.abs(high - 3) + "m"];
		document.querySelector("#under").style.display = high < 3 ? "" : "none";
		var tide = false,
			next = false;
		level.tides.forEach((range) => {
			if (range.stop > now.getTime()) {
				if (!tide) {
					document.querySelector("#range").dataset.values = [(new Date(range.start)).hm(), (new Date(range.stop)).hm()];
					document.querySelector("#current").dataset.values = [(new Date(range.start)).hm(), (new Date(range.stop)).hm()];
					tide = true;
					if (range.start < now.getTime()) {
						next = true;
					}
				}
			}
			document.querySelector("#tomorrow").style.display = (new Date(range.start)).getDay() == now.getDay() ? "" : "none";
			document.querySelector("#current").style.display = next ? "" : "none";
			document.querySelector("#next").style.display = next ? "none" : "";
			document.querySelector("#range").style.display = next ? "none" : "";
			translate();
		});
		sea = level.height - Math.round((high - level.min) * level.step);
		var waves = [];
		[{
				pos: level.width / 2,
				beg: "0s"
			},
			{
				pos: level.width / 2,
				beg: "2s"
			},
			{
				pos: level.width / 3,
				beg: "1s"
			},
			{
				pos: (level.width / 3) * 2,
				beg: "0s"
			},
		].forEach((w) => {
			waves.push(`<path class="wave" d="M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}"><animate attributeName="d" dur="5s" begin="${w.beg}" values="M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${level.width} ${sea} L ${level.width} ${level.height} L 0 ${level.height} L 0 ${sea}" repeatCount="indefinite" /></path>`);
		});

		var pathes = waves.join("");
		level.view.querySelector("#waves").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="sea" x="0px" y="0px" viewBox="0 0 ${level.width} ${level.height}" style="enable-background:new 0 0 ${level.width} ${level.height};" xml:space="preserve"><style type="text/css">.wave{opacity:0.5;fill:#0C3157;enable-background:new;}</style>${pathes}</svg>`;
		drawTimes(level);
		translate();
	}

	const drawTimes = (level) => {
		var next = Math.min(level.current + 1, level.data.length - 1);
		var flux = level.data[next][1] < level.data[level.current][1];
		var direction = document.createElement("li");
		direction.innerHTML = `<img src="ressources/svg/arrow.svg" class="${flux?'down':'up'}">`;
		document.querySelector("#times").innerHTML = "";
		document.querySelector("#times").appendChild(direction);
		var i = level.current,
			go = flux;
		while (go == flux && i < level.data.length - 1) {
			go = level.data[i + 1][1] < level.data[i][1];
			var li = document.createElement("li");
			li.innerHTML = `<span class="label" data-i18n-dyn="content" data-values="${level.data[i][0].substring(0, 5)}"></span>`;
			li.style.bottom = (level.data[i][1] - level.min) * level.step + "px";
			document.querySelector("#times").appendChild(li);
			i++;
		}
		translate();
		level.view.querySelector("#times").style.background = `linear-gradient(0deg, lime 0, lime ${(2.4 - level.min) * level.step}px, orange ${(2.5 - level.min) * level.step}px, orange ${(2.7 - level.min) * level.step}px, red ${(2.8 - level.min) * level.step}px, red 100%)`;
	}

	const drawCar = (level) => {
		var car = Math.floor(Math.random() * 5) + 1;
		var direction = Math.random() > 1 / 2 ? "left" : "right";
		var anim = document.createElement("img");
		level.view.appendChild(anim);
		anim.classList.add(`car`);
		anim.classList.add(`t${car}`);
		anim.src = `ressources/svg/car${car}.svg`;
		setTimeout(() => {
			setRootCss("--main-car", `${anim.offsetWidth}px`);
			anim.classList.add(direction);
		}, 1000);
		anim.addEventListener("animationend", () => {
			anim.remove();
			drawCar(level);
		});
	}

	const geolocalize = () => {
		const inpixel = {
			width: {
				large: 11648,
				right: 292.5
			},
			height: {
				large: 17070,
				bottom: 518
			}
		}
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				var p = [
					[47, -2.166667], // 612,603
					[47, -2.083333], // 1583,603
					[46.916667, -2.166667], // 1583,2026
					[46.916667, -2.083333], // 612,2026
					[46.933865, -2.134730], // refuge
					[46.893613, -2.148931], // pointe
					[46.847667, -1.919233], // hors cadre
					[position.coords.latitude, position.coords.longitude]
				];
				var coord = p[4];
				gps.top = ((map.height) - (((coord[0] - 46.916667) * inpixel.height.large) + (inpixel.height.bottom)));
				gps.left = ((map.width) - (Math.abs(((coord[1] + 2.083333) * inpixel.width.large)) + (inpixel.width.right)));
				gps.make();
			});
		}
	}

	if (!"geolocation" in navigator) {
		document.querySelectorAll('#map')
			.forEach((m) => {
				m.classList.add('hidden');
			});
	}

	localStorage
		.setItem('shom', (new Date()).getDay());
	setRootCss("--main-height", `${window.innerHeight}px`);
	panels = document.querySelector("body>div#panels");

	var level = calculateView();
	drawLevel(level);
	drawCar(level);
	geolocalize();

	setInterval(() => {
		if ((new Date()).getDay() != parseInt(localStorage.getItem('shom'))) {
			location.reload();
		} else {
			drawSea(level);
			geolocalize();
		}
	}, 60000);

	document.querySelector("nav#tabs ul")
		.addEventListener("click", (event) => {
			if (event.target.id != '') {
				changePanel(event.target.id);
			}
		});

	let gps = {
		top: 0,
		left: 0,
		scale: 1,
		make: () => {
			document.querySelector('body>div#panels>div#map.panel>svg#content>g#gps')
				.setAttribute('transform', `translate(${gps.left},${gps.top}) scale(${gps.scale})`);
		}
	}

	let map = {
		scale: 100,
		temp: 0,
		hypo: undefined,
		container: document.querySelector('body>div#panels>div#map.panel'),
		img: document.querySelector('body>div#panels>div#map.panel>svg'),
		height: 2544,
		width: 1876,
		min: document.querySelector('div#map.panel').clientHeight / this.height * 100,
		resize: (scale) => {
			min = document.querySelector('div#map.panel').clientHeight / map.height * 100;
			scale = Math.min(Math.max(min, scale), 100);
			map.img.style.height = (map.height * scale / 100) + 'px';
			map.img.style.width = (map.width * scale / 100) + 'px';
			gps.scale = 2 - (scale / 100);
			gps.make();
			return scale;
		},
	}
	map.container
		.addEventListener('wheel', (event) => {
			if (event.ctrlKey) {
				var
					pointX = ((map.container.scrollTop + event.clientX) * map.scale / 100),
					pointY = ((map.container.scrollTop + event.clientY) * map.scale / 100);
				if (Math.abs(event.deltaY) < 50) {
					map.scale -= event.deltaY;
				} else {
					map.scale -= (event.deltaY / 10);
				}
				map.scale = map.resize(map.scale);
				// map.container.scrollTop = Math.abs(event.clientY)
			}
		});
	map.container
		.addEventListener('touchmove', (event) => {
			if (event.targetTouches.length === 2) {
				let hypo1 = Math.hypot((event.targetTouches[0].pageX - event.targetTouches[1].pageX),
					(event.targetTouches[0].pageY - event.targetTouches[1].pageY));

				if (map.hypo === undefined) {
					map.hypo = hypo1;
				}
				map.temp = map.resize(map.scale * (hypo1 / map.hypo));
			}
		}, false);
	map.container
		.addEventListener('touchend', (event) => {
			if (map.hypo != undefined) {
				map.scale = map.temp;
				map.hypo = undefined;
			}
		}, false);

	var doResize;
	window
		.addEventListener("resize", () => {
			this.clearTimeout(doResize);
			doResize = setTimeout(() => {
				setRootCss("--main-height", `${window.innerHeight}px`);
				level = calculateView();
				drawLevel(level);
				map.resize(map.scale);
			}, 100);
		});

	var times = document.querySelector("#times");
	times
		.addEventListener('touchmove', (e) => {
			var rect = times.getBoundingClientRect();
			var height = rect.height - e.touches[0].clientY + rect.top;
			var pos = 0,
				sli = null;
			times
				.querySelectorAll('li').forEach((li) => {
					li.classList.remove('hover');
					var pli = parseInt(li.style.bottom);
					if (pli < height) {
						pos = Math.max(pos, pli);
						if (pos == pli) {
							sli = li;
						}
					}
				});
			if (sli) {
				sli.classList.add('hover');
			}
		}, {
			passive: true
		});
	times
		.addEventListener('touchend', (e) => {
			times.querySelectorAll('li').forEach((li) => {
				li.classList.remove('hover');
			});
		});
});