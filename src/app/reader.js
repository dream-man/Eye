define(['jquery'],function (fs){
	var initData = function (url,callback)
	{
		//console.log("reading.....");
		$.getJSON(url,function(result)
		{
			//console.log(result);
			$.each(result, function(i, field)
			{
				switch(i)
				{
					case "cpu":
					cpudata = field;
					//console.log(cpudata);
					break;
					case "mem":
					memdata = field;
					//console.log(memdata);
					break;
				}
				/*
				if(i == 'cpu')
				{
					cpudata = field;
					//console.log(cpudata);
				}
				if(i == 'mem')
				{
					memdata = field;
					//console.log(memdata);					
				}
				//console.log(memdata);			
				*/
			});
			return callback();
		});		
	};
	/*
	var read = function(url)
	{		
		fs.readFile(url,function(err,data){
		if(err) throw err;
		
		var jsonObj = JSON.parse(data);
		var space = ' ';
		var newLine = '\n';
		var chunks = [];    
		var length = 0;

		for(var i=0,size=jsonObj.length;i<size;i++){
			var one = jsonObj[i];
			//what value you want 
		}
		
		var resultBuffer = new Buffer(length);
		for(var i=0,size=chunks.length,pos=0;i<size;i++){
			chunks[i].copy(resultBuffer,pos);
			pos += chunks[i].length;
		}
		
		fs.writeFile('./resut.text',resultBuffer,function(err){
			if(err) throw err;
			console.log('has finished');
			});		
		});	
	};*/
	return{
		initData:initData,
		//read:read
	};
});