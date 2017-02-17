define(['jquery'],function ($){
	
	//构造函数
	var table = function table(tableId,tableJson) {
		this.Json = tableJson;
		this.id = '#'+tableId;
		this.data = null;
		var JsonData = JSON.parse(tableJson);		
		//分离表名和数据
		for(var name in JsonData){//遍历对象属性名 
			this.name = name;
			this.data = JsonData[name];
		}
		this.rows = 0;         //记录表格的行数
		this.columns = 0;      //记录表格的最大列数
		//大表格控制显示
		this.MaxRows = 13;     //每一次加载表格的最大行数
		this.OUTRANGE = false; //每一次加载的时候超过this.MaxRows时 为true
		this.CurRow = 0;       //记录当前加载到的行号
		//bind 到 html的div
		this.table = $("<table border=\"1\">");
		this.table.appendTo($(this.id));		
	}
	
	//创建表格
	table.prototype.create = function(){		
		
		var table = this.table;
		var data = this.data;
		
		//样式设置
		$("<caption>" + this.name + "</caption>").appendTo(table);
		table.addClass("tableCss");
		
		//1: 加表头
		var thead = $("<thead></thead>");
		var trHeader = $("<tr></tr>");
		trHeader.appendTo(thead);
		for(var cell in data){//遍历对象属性名
			if(this.rows < data[cell].length){
				this.rows = data[cell].length
			}
			var th = $("<th>" + cell + "</th>");
			th.attr("title","点击在下可以按我" + cell + "排序哦!");
			th.appendTo(trHeader);
			this.columns++;
		}
		//添加行删除控制的表头
		$("<th>delete</th>").appendTo(trHeader);
		this.columns++;
		thead.appendTo(table);
				
		//2: 加表体内容  tbody
		var tbody = $("<tbody></tbody>");
		for(var i = 0;i < this.rows; ++i,++this.CurRow){
			var tr = $("<tr></tr>");
			if(i < this.MaxRows){				
				for(var cell in data){//遍历对象属性名
					var td = $("<td>" + data[cell][i] + "</td>");
					td.appendTo(tr);
				}
				//添加删除控制的窗口
				$("<td>Yes</td>").css("color","red").appendTo(tr);
			}else{
				this.OUTRANGE = true;
				break;
			}
			tr.appendTo(tbody);
		}
		//处理超过 MaxRows 的行，新增扩展控制行
		if(this.OUTRANGE){
			//3: 添加表尾tfoot，用来扩展大表格
			var tfoot = $("<tfoot></tfoot>");
			tfoot.attr("title","点击在下有惊喜哦！");
			$("<td>...</td>").attr("colspan",this.columns).appendTo(tfoot);
			tfoot.appendTo(table);
		}		
		tbody.appendTo(table);
		
		//4: 封闭table标签
		$(this.id).append("</table>");
		//添加事件处理函数
		this.click();
		this.dblclick();
	}
	
	//展开大表格的剩下部分(如果需要的话 this.OUTRANGE == true)
	table.prototype.updateBody = function(){
		this.OUTRANGE == false;
		var tbody = $("<tbody></tbody>");
		var num = 0;
		for(var i = this.CurRow;i < this.rows; ++num,++i,++this.CurRow){
			var tr = $("<tr></tr>");
			if(num < this.MaxRows){				
				for(var cell in this.data){//遍历对象属性名
					var td = $("<td>" + this.data[cell][i] + "</td>");
					td.appendTo(tr);
				}
				//添加删除控制的窗口
				$("<td>Yes</td>").css("color","red").appendTo(tr);
			}else{
				this.OUTRANGE = true;
				break;
			}		
			tr.appendTo(tbody);
		}
		tbody.appendTo(this.table);
		//如果整个表加载完 删除扩展表尾
		if(this.CurRow == this.rows){
			$("table tfoot").remove();
		}
	}
	
	//在调用sort后要用这个函数来吧table的body刷新
	table.prototype.sortBody = function(){
		var data = this.data;
		//定位table body 然后删除他
		$(this.id).find("table tbody").remove();
		//重新加数据更新后的表体内容  tbody
		var tbody = $("<tbody></tbody>");
		for(var i = 0;i < this.rows; ++i){
			var tr = $("<tr></tr>");
			if(i < this.CurRow){
				for(var cell in data){//遍历对象属性名
					var td = $("<td>" + data[cell][i] + "</td>");
					td.appendTo(tr);
				}
				//添加删除控制的窗口
				$("<td>Yes</td>").css("color","red").appendTo(tr);
			}else{
				this.OUTRANGE = true;
				break;
			}
			tr.appendTo(tbody);
			tbody.appendTo(this.table);
		}
		//处理超过 MaxRows 的行，新增扩展控制行
		if($("table tfoot") == undefined && this.CurRow == this.rows){
			//3: 添加表尾tfoot，用来扩展大表格
			var tfoot = $("<tfoot></tfoot>");
			$("<td>...</td>").attr("colspan",this.columns).appendTo(tfoot);
			tfoot.appendTo(this.table);
		}		
	}
	
	//单元格的事件(单击)
	table.prototype.click = function(){
		var that = this;
		
		//点击表体(body)获取点击的数据
		$(this.id).find("table tbody tr").each(function(){
			var tdArr = $(this).children();
			tdArr.mousedown(function(e){
				switch (e.which){
					case 1://左键
					console.log("cell number:" + this.cellIndex + " cell text:" + this.innerText);
					if(this.nextSibling == null){
						console.log("will delete this rows");
						//$(this).parent().css("text-decoration","line-through");
						$(this).parent().remove();
					}else{
						return this.innerText;
					}	
					break;
					case 2://中键
						console.log("cell number:" + this.cellIndex + " cell text:" + this.innerText);
					break;
					case 3://右键
						console.log("cell number:" + this.cellIndex + " cell text:" + this.innerText);
					break;
					default:
					break;
				}			
			});			
		});
		
		//点击表尾 扩展未显示的部分表格
		$(this.id).find("table tfoot").each(function(){
			var tdArr = $(this).children();
			tdArr.click(function(){
				that.updateBody();
			});			
		});
		
		//点击表头的单元格,按照该列排序
		$(this.id).find("table thead tr").each(function(){
			var thArr = $(this).children();
			thArr.click(function(){
				console.log("cell number:" + this.cellIndex + " cell text:" + this.innerText + "will sort");
				that.sort(this.innerText);
			});			
		});

		/*	
		$(this.id).find("table caption").mousemove(function (event) {
				console.log("cell number:" + this.cellIndex + " cell text:" + this.innerText + "will sort");
		});
		*/
	}
	
	//行间事件(双击)
	table.prototype.dblclick = function(){
		var that = this;
		$(this.id).find("table tbody").each(function(){
			var trArr = $(this).children();
			trArr.dblclick(function(){
				console.log("row number:" + this.rowIndex + " row texts:" + this.innerText);
				return this.innerText;
				$(this).removeAttr("style");
				$(this).toggleClass("line");
			});
		});
	};
	
	//hide:true -> hide others  false -> not hide others
	table.prototype.search = function(key,hide){
		if(hide == undefined){hide = false;}	
		if(hide){
			$("table tbody tr").hide().filter(":contains('"+ key +"')").css("background-color","#B2E0FF").show(); //行高亮
		}else{
			$("table tbody tr").filter(":contains('"+ key +"')").css("background-color","#B2E0FF"); //行高亮
			$("table tbody tr td").filter(":contains('"+ key +"')").css("background-color","#99CC33"); //关键字单元格高亮
		}
	}
		
	//UorD: true -> Up ;false -> Down
	//这个函数将更新this.data的值，最后调用sortBody即可刷新表格
	table.prototype.sort = function(keyword,UorD){ 
		if(UorD == undefined){UorD = false;}
		var data = this.data;
		var sorted = 0;
		if(UorD){
			while(1){
				for(var r = 0; r < this.rows;++r){
					if(data[keyword][r] > data[keyword][r+1]){			
						for(var key in data){
							//参考: http://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
							data[key][r+1] = [data[key][r],data[key][r] = data[key][r+1]][0];
						}
					}else{
						sorted++;
					}
				}
				if(sorted == this.rows){
					break;
				}else{
					sorted = 0;
				}
			}
		}else{
			while(1){
				for(var r = 0; r < this.rows;++r){
					if(data[keyword][r] < data[keyword][r+1]){			
						for(var key in data){
							//参考: http://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript
							data[key][r+1] = [data[key][r],data[key][r] = data[key][r+1]][0];
						}
					}else{
						sorted++;
					}
				}
				if(sorted == this.rows){
					break;
				}else{
					sorted = 0;
				}
			}
		}
		this.sortBody();
	}
	
	return{
		table:table
	};
});