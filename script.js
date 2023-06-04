const regexdt = /var data = \[\[.*\]\]/;

window.addEventListener("load", (event) => {
    const panels = document.querySelectorAll('div.panel');
    const tabs = document.querySelector('nav ul'); 
    tabs.addEventListener('click', (event) => {
        tabs.querySelector('.active').classList.remove('active');
        panels.forEach(panel => {
            if(event.target.id == panel.id) {
                panel.classList.add('active');
            }
            else {
                panel.classList.remove('active');
            }
        });
        event.target.classList.add('active');
    });
    eval(regexdt.exec(document.getElementById(rid).contentDocument.querySelector('script:not([src])').textContent)[0]);
    var min = 10, max = 0;
    data.forEach(function(hor){
        min = Math.floor(Math.min(hor[1], min));
        max = Math.floor(Math.max(hor[1], max));
    });
    for(var i=max+1; i>=min; i--) {
        const li = document.createElement("li");
        const text = document.createTextNode(i);
        li.appendChild(text);
        document.querySelector('#scale').appendChild(li);
    }
    drawLevel(data, min, max);
    setTimeout(function(){drawLevel(data, min, max)}, 300000);
    window.addEventListener("resize", function(){drawLevel(data, min, max);})
});

function padTime(number){
    return number.toString().padStart(2, '0')
}

function drawLevel(data, min, max){
    const now = new Date(Date.now());
    const cur = `${padTime(now.getHours())}:${padTime(now.getMinutes())}:${padTime(now.getSeconds())}`;
    var lev;
    data.forEach(function(hor){
        if(lev == undefined && hor[0]>cur) {
            lev = hor[1]; 
        }
    });
    document.querySelector('div.panel#level #info').innerHTML = `at ${cur} sea is ${lev} meters high !`;
    const view = document.querySelector('div.panel#level #view');
    const height =  view.offsetHeight;
    const width =  view.offsetWidth;
    const step = height / max;
    document.querySelector('div.panel#level').classList.remove('active');
    document.querySelector('div.panel#map').classList.remove('active');
    var floor = `${((2.7 - min) * step)}px`;
    var sea = Math.round(((lev - min) * step) );
    view.querySelector('#road').style.height = `${0.3 * step}px`;
    view.querySelector('#road').style.bottom = floor;
    view.querySelector('.car').style.height = `${1.2 * step}px`;
    view.querySelector('.car').style.bottom = floor;
    view.querySelector('#sand').style.height = floor;
    view.querySelector('#waves').innerHTML = drawSea(width, height, sea);       
    view.querySelector('#scale').style.background = `linear-gradient(0deg, lime 0, lime ${(2 - min)* step}px, orange ${(2.1 - min) * step}px, orange ${(2.5 - min) * step}px, red ${(2.7 - min) * step}px, red 100%)`;

}

function drawSea(width, height, top){
    sea = height - top;
    console.log(width, height, sea);
    var waves = [];
    [{pos:width/2, beg:"0s"},{pos:width/2, beg:"2s"}, {pos:width/3, beg:"1s"},{pos: width/3*2, beg:"0s"}].forEach(function(w){
        waves.push(`<path class="wave" d="M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${width} ${sea} L ${width} ${height} L 0 ${height} L 0 ${sea}"><animate attributeName="d" dur="5s" begin="${w.beg}" values="M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${width} ${sea} L ${width} ${height} L 0 ${height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea + 50} ${w.pos} ${sea - 50} ${width} ${sea} L ${width} ${height} L 0 ${height} L 0 ${sea}; M 0 ${sea} C ${w.pos} ${sea - 50} ${w.pos} ${sea + 50} ${width} ${sea} L ${width} ${height} L 0 ${height} L 0 ${sea}" repeatCount="indefinite" /></path>`);
    });

    var pathes = waves.join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="sea" x="0px" y="0px" viewBox="0 0 ${width} ${height}" style="enable-background:new 0 0 ${width} ${height};" xml:space="preserve"><style type="text/css">.wave{opacity:0.6;fill:#0C3157;enable-background:new;}</style>${pathes}</svg>`;
}
