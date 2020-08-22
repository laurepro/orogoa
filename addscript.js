
setTimeout(function(){
    var hltOfTheDay = ifrm.document.getElementsByClassName('hltOfTheDay')[0];
    var hltOfTheDay_table = hltOfTheDay.getElementsByTagName('table')[0];
    var hltOfTheDay_tbody = hltOfTheDay_table.getElementsByTagName('tbody')[0];
    var hltOfTheDay_tdval = hltOfTheDay_tbody.getElementsByTagName('td');
    var marees = []
    for(i in hltOfTheDay_tdval) {
        if(c=(hltOfTheDay_tdval[i].textContent)) {
            marees.push(c.trim());
        }
    }
    app.Execute("recupMaree(\'" + JSON.stringify(marees) + "\')");
}, 50);
