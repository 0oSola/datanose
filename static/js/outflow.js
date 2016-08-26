// JavaScript Document
(function(){
	
	//test
	var datatest = '{"chart_type":"area","chart_name":["增加量","激活量"],"y_name":"人数","x_name":["12/14","12/15","12/16","12/17","12/18","12/19","12/20"],"chart_data":[[3, 4, 3, 5, 4, 10, 12],[1, 3, 4, 3, 3, 5, 4]],"data_list":[["日期","设备","新增账户","新增设备"],["2015-01-01","11","0","21"],["2012-01-01","11","10","21"],["2018-01-01","1","0","2"]],"totalCount":100,"error_code":0,"error_message":""}';
	//end test
	
	var pageSize = 10;
	
	//玩家类型
	var play_type = "";
	
	$(function(){
		
		$("html").on("click",function(){
			if($("#msg-box").css("top")=='0px'){
				$("#msg-box").animate({top:"-50%"});
			}
		});
		$("#msg-box").on("click",function(){
			$(this).animate({top:"-50%"});
		});
		
		
		Date.prototype.Format = function (fmt) {
			var o = {
				"M+": this.getMonth() + 1, //月份 
				"d+": this.getDate(), //日 
				"h+": this.getHours(), //小时 
				"m+": this.getMinutes(), //分 
				"s+": this.getSeconds(), //秒 
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				"S": this.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		
		var nowDate = new Date().Format("yyyy-MM-dd");
		
		
		
		$("#dtp_input1").val(nowDate);
		$("#dtp_input2").val(nowDate);
		$(".form-control1").val(nowDate);
		$(".form-control2").val(nowDate);
		
		//init
		dataLoader.loadList(".DAU-content");
		dataLoader.loadList(".days-content");
		
		
		eventsManager.searchData();
		eventsManager.typeSearch();
		eventsManager.pTypeChange();
		eventsManager.hideWindow();
		
		$(".menu-row").on("click",function(){
			var target = $(this).attr("data-type");
			dataLoader.loadList("."+target);
		});
		
	});
	
	
	var viewRender = {
		//模板加载
		renderList:function(target,data){
			//sigle odd
			//double even
			target.find(".data-tbody").html("");
			target.find(".table-title").html("");
			data.forEach(function(ele,idx){
				if(idx==0){
					ele.forEach(function(item,i){
						var td_tpl = '<th>'+item+'</th>'
						target.find(".table-title").append(td_tpl);
					});
				}else{
					var tpl = $('<tr class=" gradeA"></tr>');
					ele.forEach(function(item,i){
						var td_tpl = '<td>'+item+'</td>'
						tpl.append(td_tpl);
					});
					if(idx%2==0){
						tpl.addClass("odd");
					}else{
						tpl.addClass("even");
					}
					//操作列
					//tpl.append('<td><i class="fa fa-trash-o db-remove" data-uuid="'+ele[0]+'"></i></td>');
					target.find(".data-tbody").append(tpl);
				}
				
			});
			target.find(".datatable").addClass("sortable");
			$.bootstrapSortable(true);
			//clickManager.removeDs();
			//clickManager.checkDelete();
		}
	}
	
	
	var eventsManager = {
		//隐藏窗口
		hideWindow:function(){
			$(".delete-tab").off("click");
			$(".delete-tab").on("click",function(){
				$(this).parent().parent().parent().slideToggle("slow");
			});
		},
		//用户类型切换
		pTypeChange:function(){
			$(".ptype-btn").off("click");
			$(".ptype-btn").on("click",function(){
				$(".ptype-btn").removeClass("select");
				$(this).addClass("select");
				play_type = $(this).attr("data-type");
				dataLoader();
			});
		},
		//指定查询
		typeSearch:function(){
			$(".date-type").off("click");
			$(".date-type").on("click",function(){
				var type = $(this).attr("id");
				$(".date-type").removeClass("select");
				$(this).addClass("select");
				if(type=="today"){
					$("#dtp_input1").val(GetDateStr(0));
					$("#dtp_input2").val(GetDateStr(0));
					$(".form-control1").val(GetDateStr(0));
					$(".form-control2").val(GetDateStr(0));
				}else if(type=="yestday"){
					$("#dtp_input1").val(GetDateStr(-1));
					$("#dtp_input2").val(GetDateStr(-1));
					$(".form-control1").val(GetDateStr(-1));
					$(".form-control2").val(GetDateStr(-1));
				}else if(type=="lastweek"){
					$("#dtp_input1").val(GetDateStr(-7));
					$("#dtp_input2").val(GetDateStr(0));
					$(".form-control1").val(GetDateStr(-7));
					$(".form-control2").val(GetDateStr(0));
				}else if(type=="month"){
					$("#dtp_input1").val(GetDateStr(-30));
					$("#dtp_input2").val(GetDateStr(0));
					$(".form-control1").val(GetDateStr(-30));
					$(".form-control2").val(GetDateStr(0));
				}else if(type=="last2month"){
					$("#dtp_input1").val(GetDateStr(-90));
					$("#dtp_input2").val(GetDateStr(0));
					$(".form-control1").val(GetDateStr(-90));
					$(".form-control2").val(GetDateStr(0));
				}		
				dataLoader.loadList(".DAU-content");
				dataLoader.loadList(".days-content");
					
			});
		},
		//查询
		searchData:function(){
			$(".search-btn").off("click");
			$(".search-btn").on("click",function(){
				dataLoader.loadList(".DAU-content");
				dataLoader.loadList(".days-content");
			});
		},
		//分页
		bindPage:function(ele,totalPage){
			var pageNo = ele.attr("data-pageNo");
			ele.bootpag({
                total: totalPage,          // total pages
                page: pageNo,            // default page
                maxVisible: 10,     // visible pagination
                leaps: true         // next/prev leaps through maxVisible
            }).unbind("page").on("page", function(event, num){
				ele.attr("data-pageNo",num)
                dataLoader.loadList(ele);
            });
		}
	}
	
	
	//数据交互
	var dataLoader = {
		//获取新增玩家数据
		loadList:function(ele){
			$("#spin").css("display","block");
			$("#spin").css("height",$("#wrapper").height());
			var url = "";	
			var pageNo = $(ele).attr("data-pageNo");
			var startDate = $("#dtp_input1").val();
			var endDate = $("#dtp_input2").val();
			
			//test
			var dataJson = JSON.parse(datatest);
			if(dataJson.error_code==0){
				var targetChart = $(ele).find(".chart-content");
				if(targetChart.attr("data-type") == "area"){
					areaChart(dataJson.chart_data,dataJson.x_name,dataJson.y_name,dataJson.chart_name,targetChart.attr("id"));
				}else if(targetChart.attr("data-type") == "bar"){
					barChart(dataJson.chart_data,dataJson.x_name,dataJson.y_name,dataJson.chart_name,targetChart.attr("id"));
				}
				viewRender.renderList($(ele),dataJson.data_list);
				var totalPage = Math.ceil(dataJson.totalCount / pageSize);
				eventsManager.bindPage($(ele).find(".pageContainer"),totalPage);
			}else{
				$("#msg-content").html(dataJson.error_message);
				$("#msg-box").animate({top:"0"});
			}
			//end test
			

			$.ajax({
				url:url,
				type:"POST",
				data:{
					page_No:pageNo,
					page_size:pageSize,
					start_date:startDate,
					end_date:endDate
				},
				error: function(){
					$("#msg-content").html("连接服务器失败，请联系管理员");
					$("#msg-box").animate({top:"0"});
				},
				success: function(data){
					var dataJson = JSON.parse(data);
					if(dataJson.error_code==0){
						var targetChart = $(ele).find(".chart-content");
						if(targetChart.attr("data-type") == "area"){
							areaChart(dataJson.chart_data,dataJson.x_name,dataJson.y_name,dataJson.chart_name,targetChart.attr("id"));
						}else if(targetChart.attr("data-type") == "bar"){
							barChart(dataJson.chart_data,dataJson.x_name,dataJson.y_name,dataJson.chart_name,targetChart.attr("id"));
						}
						viewRender.renderList($(ele),dataJson.data_list);
						var totalPage = Math.ceil(dataJson.totalCount / pageSize);
						eventsManager.bindPage($(ele).find(".pageContainer"),totalPage);
					}else{
						$("#msg-content").html(dataJson.error_message);
						$("#msg-box").animate({top:"0"});
					}
				}
			});
			
			setTimeout('$("#spin").css("display","none")',2000);
		}
	};
	
	function GetDateStr(AddDayCount) 
	{ 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
		var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
		return y+"-"+m+"-"+d; 
	}
	
})();