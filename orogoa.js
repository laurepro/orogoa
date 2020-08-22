const fileDir = "/sdcard/orogoa";
const regexdt = /var data = (\[\[.*\]\])/;
var marees = [], courbe = {};

function OnStart()
{
	mainlay = app.CreateLayout( "linear", "VCenter,FillXY" );	
    tabs = app.CreateTabs( "Indicateur,SHOM", 1, 1, "VCenter,FillXY" );	
	mainlay.AddChild( tabs );
	sublay = app.CreateLayout( "linear", "VCenter,FillXY" );
	//tabs.AddChild(sublay,0);
	webv = app.CreateWebView(1,1)
	tabs.AddChild(webv,1);
	app.AddLayout( mainlay );
	
	

    app.MakeFolder( fileDir );
    
    if(app.FileExists( fileDir + "/shom.js" ) && app.GetFileDate( fileDir + "/shom.js" ).toDateString() == (new Date()).toDateString()) {
        executeShom(app.ReadFile( fileDir + "/shom.js" ));
    }
    else {
        app.ShowProgress('Chargement SHOM');
    	app.HttpRequest("GET","https://services.data.shom.fr/hdm/vignette/grande/FROMENTINE_EMBARCADERE?locale=fr","","",function(error,response){
            app.HideProgress();
        	if(!error) {
        	    app.WriteFile( fileDir + "/shom.js", response );
        	    executeShom(response);
        	}
    	});
    }
}

function executeShom(contentShom){
    webv.LoadHtml(app.ReadFile('shom.html'));
    // récupération des marées hautes/basses
    
    // decodage des données de marée
    var regd = regexdt.exec(contentShom);
    if(regd) {
        regd = regd[0].replace(/\\(.)/mg, "$1");
        eval(regd); // => data
    }
    data.forEach(function(data){
        courbe[(data[0]).substr(0,5)] = data[1];
    });
    alert(pp(courbe));
}

function recupMaree(jsonString) {
    var cnt = 0;
    var mar;
    JSON.parse(jsonString).forEach(function(item) {
        switch (cnt % 4) {
            case 0: 
                mar = {};
                mar.maree = item;
                break;
            case 1:
                mar.horaire = item;
                break;
            case 2:
                mar.hauteur = parseFloat(item);
                break;
            case 3:
                mar.coefficient = parseInt(item) || '';
                marees.push(mar);
                break;
        }
        cnt++;
    });
    alert(pp(marees));
}

// affichage des attribus objets
function pp(objet) {
    var a,
      str = "";
    for (a in objet) {
        if (objet.hasOwnProperty(a)) {
            if (typeof objet[a] == "object") {
                if (objet[a] instanceof Number) {
                    str += a + " : " + objet[a] + " [" + objet[a].numerator + "/" + objet[a].denominator + "]\r\n";
                } else {
                    str += a + " : [" + pp(objet[a]) + "]\r\n";
                }
            } else {
                str += a + " : " + objet[a] + "\r\n";
            }
        }
    }
    return str;
}
