require.config({
	baseUrl: "./",
	paths: {				
		reader: "app/Utils/reader",
		Chart:  "js/Chart.bundle",
		http: "js/http",
		draw : "app/Utils/draw",
		jquery: ["js/jquery.min","http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"]
	},
	shim: {
		'draw': ['Chart'],
		'reader':   ['jquery']
	}
});