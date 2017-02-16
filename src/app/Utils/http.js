define(['jquery'],function ($){
	
	var http = function http(serviceType, varname, ipPort, getWay, instanceId){
		if (ipPort == undefined) {
			this.ipPort = "192.168.81.78:9978"
		}
		if (getWay == undefined) {
			this.getWay = "svar"
		}
		if (instanceId == undefined) {
			this.instanceId = 0
		}
		this.xmlHttp = null;
		try {// Firefox, Opera 8.0+, Safari, IE7
			this.xmlHttp = new XMLHttpRequest();
		}
		catch (e) {// Old IE
			try {
				this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {
				alert("Your browser does not support XMLHTTP!");
				return;
			}
		}
		this.url = "http://" + this.ipPort + "/" + this.getWay + "/" + serviceType + "/" + this.instanceId + "/" + varname + "?";
	}
	
	http.prototype.GET = function(cb){
		this.xmlHttp.open("GET", this.url, true);
		this.xmlHttp.send(null);
		this.xmlHttp.onreadystatechange = cb;
	}
	/*
	var getData = function (cb,serviceType, varname, ipPort, getWay, instanceId) {
		if (ipPort == undefined) {
			ipPort = "192.168.81.78:9978"
		}
		if (getWay == undefined) {
			getWay = "svar"
		}
		if (instanceId == undefined) {
			instanceId = 0
		}
		var xmlHttp = null;
		try {// Firefox, Opera 8.0+, Safari, IE7
			xmlHttp = new XMLHttpRequest();
		}
		catch (e) {// Old IE
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {
				alert("Your browser does not support XMLHTTP!");
				return;
			}
		}
		var url = "http://" + ipPort + "/" + getWay + "/" + serviceType + "/" + instanceId + "/" + varname + "?";
		xmlHttp.open("GET", url, true);
		xmlHttp.send(null);
		xmlHttp.onreadystatechange = cb;
	};	
	function stateChanged() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) { 
			alert(xmlHttp.getAllResponseHeaders()); 
			alert(xmlHttp.responseText); // 这个有 
		} 
	}
	*/
	return{
		http:http,
	};
});