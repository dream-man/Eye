require(['reader','http','tabler','draw'],function(reader,httper,tabler,drawer){
	
	//table 表格系列
	var tab = '{"icTable": {"icIndex": [6,2,3],"icIndex2": [2,1,5],"icChannelName": ["SEACnnnnnNx_PG","SEACnnnnnNy_PG","haha"],"icUsedBandwidth": [0,9,3],"icTotalBandwidth": [0,7,4],"icRunningSessCount": [6,0,4],"icStatus": ["n/a","n/a","hehe"]}}';
	
	//测试自定义数据 绘制表格
	var Table = new tabler.table("tableId",tab);
	Table.create();
	Table.search("SEACnnnnnNy_PG");
	
	//测试连接TianShan中的服务 绘制表格
	var Http = new httper.http("rtspProxy","icTable");
	Http.GET(function(data,state){
		console.log((new Date).getTime() + " response " + ": " + data + " state:" + state);
		var Table = new tabler.table("tableId2",data);
		Table.create();
		Table.search("SEACnnnnnNy_PG");
	});
	
	//line 线状图系列
	//var result  = reader.readJson("/fvar/data/cpu_mem.json");
	
	//测试多组数据绘制在一张图的情况
	var ctx1 = document.getElementById("cpu").getContext("2d");
	var data = []
	var data3 = []
	var data4 = []
	var Render = new drawer.render(ctx1,"line",[data,data3,data4],["cpu","mem","bindwith"]);
	Render.draw();
	var i = 0;
	setInterval(
		 function(){
			 i++;
			 if(i <= 10){
				Render.update([reader.random(100),reader.random(100),reader.random(100)]);
			 }else{
				 Render.update([reader.random(100),reader.random(100)]);
			 }
		 },
	1000);
	
	/*
	//测试一组自定义数据绘制在一张图的情况
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

	//测试连接TianShan中的服务
	var ctxRtsp = document.getElementById("mem").getContext("2d");
	var rtspdata = [0];
	var rtspRender = new drawer.render(ctxRtsp,"line",[rtspdata],["rtspdata"],["red"]);
	rtspRender.draw();
	
	var Http = new httper.http("rtspProxy","rtspProxy-Statistics-Average-Process-Latency");
	var timer = setInterval(function(){
		Http.GET(function(data,state){
				console.log((new Date).getTime() + " response " + ": " + data + " state:" + state);
				var data = parseFloat(data.split(":")[1]);				
				rtspRender.update([data+reader.random(1)]);
		}).fail(function(state){//失败处理，关闭update定时器			
			console.log("fail: " + state.statusText + " status: " + state.status + "  timer will be close");
			clearInterval(timer);
		});
	},
	1000);	
	
	//pie 圆形图系列
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
