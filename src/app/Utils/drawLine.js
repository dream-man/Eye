define(['Chart','app/Utils/DateFormat','app/Utils/Color'],function (){
	
	var drawLine = function(ctx,srcData,color,dataTitle,lazy){
		if(color == undefined)
			color = "black";
		var config = {
			type: 'line',
			data: {
				labels:[],
				datasets: [{
					label: dataTitle,
					backgroundColor: color,
					pointRadius: 2.5,
					borderColor: color,
					borderWidth:2,
					data: [],
					fill: false,
				}]
			},
			options: {
				responsive: true,
				title:{
					display:true,
					text: dataTitle + ' Real Time'
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
		};
		//new a charts	
		//var ctx = document.getElementById("canvas").getContext("2d");
		var myLine = new Chart(ctx, config);

		//cpu and memory
		var YData = config.data.datasets[0].data;
		var XData = config.data.labels;
		var datanum = 60;
		//init data
		var time;
		var curPos = 0;
		for (var i = 0; i < datanum; i++,curPos++) {
			time = new Date((new Date).getTime() - ((59 - i) * 1000)); // for pageViewsPerSecond chart 
			time.setMilliseconds(0);
			//console.log("tiem:" + time.Format("hh:mm:ss"));
			XData.push(time.Format("hh:mm:ss"));
			YData.push(srcData[i]);//cpu
		}
		
		//update data
		function Update(){
			var time, time2;
			time = new Date();
			time.setMilliseconds(0);
			if(curPos >= srcData.length-1)
				curPos = 0;
			XData.push(time.Format("hh:mm:ss"));
			curPos++;
			YData.push(srcData[curPos]);//cpu
		
			if (YData.length > datanum)
			{
				XData.shift();
				YData.shift();				
			}				
			myLine.update(10);
		};
		setInterval(Update,lazy);	
	};
	
	//return function
	return {
		drawLine:drawLine
	}
});