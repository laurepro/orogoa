const fileDir = "/sdcard/orogoa";
const regexdt = /var data = (\[\[.*\]\])/;

function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	webv = app.CreateWebView(1,1)
	
	lay.AddChild( webv );
	
	//Add layout to app.	
	app.AddLayout( lay );

    app.MakeFolder( fileDir );
    app.ShowProgress('Chargement SHOM');
	app.HttpRequest("GET","https://services.data.shom.fr/hdm/vignette/grande/FROMENTINE_EMBARCADERE?locale=fr","","",function(error,response){
        app.HideProgress();
    	if(!error) {
    	    app.WriteFile( fileDir + "/shom.js", response );
        	shom = '<html><head><script src="file:///android_asset/app.js"></script></head>';
        	shom += '<body style="text-align:center">';
        	shom += '<script src="file://' + fileDir + '/shom.js"></script>';
        	shom += '</body>';
        	shom += '</html>';
            webv.LoadHtml(shom);
            
            // récupération des marées hautes/basses
            
            // decodage des données de marée
            var regd = regexdt.exec(response);
            if(regd) {
                regd = regd[0].replace(/\\(.)/mg, "$1");
                eval(regd); // => data
            }
    	}
	});
}

// affichage des attribus objets
function pretty_print(objet) {
    var a,
      str = "";
    for (a in objet) {
        if (objet.hasOwnProperty(a)) {
            if (typeof objet[a] == "object") {
                if (objet[a] instanceof Number) {
                    str += a + " : " + objet[a] + " [" + objet[a].numerator + "/" + objet[a].denominator + "]\r\n";
                } else {
                    str += a + " : [" + objet[a].length + " values]\r\n";
                }
            } else {
                str += a + " : " + objet[a] + "\r\n";
            }
        }
    }
    return str;
}
