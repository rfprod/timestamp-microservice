'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	var pattern = new RegExp(/\/.+/);
	app.route(pattern).get(function (req, res) {
		//console.log(req.url);
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"];
		var urlParam = req.url.substr(1,req.url.length);
		var unixTime = null;
		var naturalTime = null;
		if (urlParam != "" && urlParam != null){
			if (urlParam.indexOf("%20") == -1) {
				urlParam = parseInt(urlParam);
				naturalTime = months[(new Date(urlParam).getMonth()+1)]+" "+(new Date(urlParam).getDate())+", "+(new Date(urlParam).getFullYear());
			}else{
				//console.log(unescape(urlParam));
				urlParam = Date.parse(unescape(urlParam));
				naturalTime = "\""+months[(new Date(urlParam).getMonth())]+" "+(new Date(urlParam).getDate())+", "+(new Date(urlParam).getFullYear())+"\"";
			}
			unixTime = new Date(urlParam).getTime();
		}
		if (isNaN(unixTime)){
			unixTime = null;
			naturalTime = null;
		}
		var output = "{\"unix\": "+unixTime+", \"natural\": "+naturalTime+"}";
		res.format({
			'application/json': function(){
				res.send(output);
        		res.end();
			}
		});
	});
};
