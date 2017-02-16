require(['reader','http','tabler','draw'],function(reader,httper,tabler,drawer){
	
	//table
	var tab = '{"icTable": {"icIndex": [6,2,3],"icIndex2": [2,1,5],"icChannelName": ["SEACnnnnnNx_PG","SEACnnnnnNy_PG","haha"],"icUsedBandwidth": [0,9,3],"icTotalBandwidth": [0,7,4],"icRunningSessCount": [6,0,4],"icStatus": ["n/a","n/a","hehe"]}}';
	
	var Table = new tabler.table("tableId",tab);
	Table.create();
	Table.search("SEACnnnnnNy_PG");
	
	/*
	//测试连接TianShan中的服务 绘制表格
	var Http = new httper.http("rtspProxy","icTable");
	Http.GET(function(){
		if (this.readyState == 4 && this.status == 200) {
			console.log("response " + this.responseText)
			var Table = new tabler.table("tableId",this.responseText);
			Table.create();
			Table.search("SEACnnnnnNy_PG");
		}
	});
	*/
	
	//line
	//var result  = reader.readJson("/fvar/data/cpu_mem.json");
	
	//测试多组数据绘制在一张图的情况
	var ctx1 = document.getElementById("cpu").getContext("2d");
	var data = []
	var data3 = []
	var data4 = []
	var Render = new drawer.render(ctx1,"line",[data,data3,data4],["cpu","mem","bindwith"],["red","green","blue"]);
	Render.draw();	
	setInterval(
		 function(){
			 Render.update([reader.random(100),reader.random(100),reader.random(100)]);			 
		 },
	1000);
	
	/*
	//测试一组数据绘制在一张图的情况
	var ctx1 = document.getElementById("cpu").getContext("2d");
	var data = []
	var Render = new drawer.render(ctx1,"line",data,"cpu","red");
	Render.draw();	
	setInterval(
		 function(){
			 Render.update(reader.random(100));			 
		 },
	1000);
	*/
	/*
	//测试连接TianShan中的服务
	var ctxRtsp = document.getElementById("mem").getContext("2d");
	var rtspdata = [0];
	var rtspRender = new drawer.render(ctxRtsp,"line",[rtspdata],["rtspdata"],["red"]);
	rtspRender.draw();
	
	var Http = new httper.http("rtspProxy","rtspProxy-Statistics-Average-Process-Latency");
	setInterval(function(){
		Http.GET(function(){
			if (this.readyState == 4 && this.status == 200) {
				console.log("response " + this.responseText)
				var data = parseFloat(this.responseText.split(":")[1]);
				rtspRender.update([data+reader.random(1)]);
			}
		});
	},
	1000);
	*/
	
	//pie
	// var CircleData = reader.readJson("/fvar/data/part.json");
	var data2 = [
		["Sentry",45],
		["EventChannl",20],
		["EventGateWay",22],
		["RtspProxy",13],
		["EdgeFE",30],
		["MQTT",13]
	]
	var ctx2 = document.getElementById("part").getContext("2d");
	var Render2 = new drawer.render(ctx2,"circle",data2,"server List");
	Render2.draw();
	Render2.update(["xxxx",35]);
	Render2.update(["yyyy",37]);
	Render2.update(["zzzz",37]);
	
	
});
