require(['reader','drawLine'],function(read,line){
	//read.read("./cpu_mem.json");
	read.initData("/data/cpu_mem.json",function()
	{
		var ctx1 = document.getElementById("cpu").getContext("2d");
		var ctx2 = document.getElementById("mem").getContext("2d");
		line.drawLine(ctx1,cpudata,"red","CPU",1000);
		line.drawLine(ctx2,memdata,"green","Memory",1000);
		//line.drawLine(color.color.green,memdata,1000);
		/*
		var config = {
			type: 'line',
			data: {
				labels:[],
				datasets: [{
					label: "CPU dataset",
					backgroundColor: uitls.color.green,
					pointRadius: 2,
					borderColor: uitls.color.green,
					borderWidth:1,
					data: [],
					fill: false,
				}, {
					label: "Memory dataset",
					fill: false,
					backgroundColor: uitls.color.red,
					pointRadius: 2,
					borderColor: uitls.color.red,
					borderWidth:1,
					data: [],
				}]
			},
			options: {
				responsive: true,
				title:{
					display:true,
					text:'CPU and Memory - Real Time'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							stacked: true,
							labelString: 'Time'
						},
						ticks: {						
	            			userCallback: function(tick) {
	            				var remain = tick.split(":");
	            				if (remain[remain.length-1] % 3 === 0) {//隔3个单位显示x坐标的刻度
	            					return tick;
	            				}
	            				return '';
	            			},
	            		}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							stacked: false,
							labelString: 'percent'
						}
					}]
				}
			}
		}
		
		//cpu and memory
		var cpuConfigData = config.data.datasets[0].data;
		var memConfigData = config.data.datasets[1].data;
		var ConfigDate = config.data.labels;
		var datanum = 60;
		//init data
		var time;
		var curPos = 0;
		for (var i = 0; i < datanum; i++,curPos++) {
			time = new Date((new Date).getTime() - ((59 - i) * 1000)); // for pageViewsPerSecond chart 
			time.setMilliseconds(0);
			//console.log("tiem:" + time.Format("hh:mm:ss"));
			ConfigDate.push(time.Format("hh:mm:ss"));
			cpuConfigData.push(cpudata[i]);//cpu
			memConfigData.push(memdata[i]);//mem
		}
		//new a charts	
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new chart(ctx, config);
		
		//update data
		function Update(){
			var time, time2;
			time = new Date();
			time.setMilliseconds(0);
			if(curPos >= cpudata.length-1)
				curPos = 0;
			ConfigDate.push(time.Format("hh:mm:ss"));
			curPos++;
			cpuConfigData.push(cpudata[curPos]);//cpu
			memConfigData.push(memdata[curPos]);//mem
		
			if (cpuConfigData.length > datanum)
			{
				ConfigDate.shift();
				cpuConfigData.shift();
				memConfigData.shift();					
			}				
			/*
			if (memConfigData.length > 60)
			{
				ConfigDate.shidt();
				memConfigData.shift();
			}
			
			window.myLine.update(10);
		};
		setInterval(Update,1000);	*/		
	});
});