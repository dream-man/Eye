require(['reader','draw'],function(read,line){
	//line
	var result  = read.readJson("/data/cpu_mem.json");
	var ctx1 = document.getElementById("cpu").getContext("2d");
	var ctx2 = document.getElementById("mem").getContext("2d");
	line.drawLine(ctx1,result.cpu,"rgb(255,0,0)","CPU",1000);
	line.drawLine(ctx2,result.mem,"green","Memory",1000);
	
	//pie
	var CircleData = read.readJson("/data/part.json");
	var ctx3 = document.getElementById("part").getContext("2d");
	line.drawCircle(ctx3,CircleData,"Server Static");
	
	//
});
