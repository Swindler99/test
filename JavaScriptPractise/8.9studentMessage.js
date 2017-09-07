$(function() {
	//为查看课程信息添加事件
	var server = "http://172.13.16.2:8900/school/";
	$("#courseList").on("click", function() {
		/*$.post(server + "course/list", function(r) {
			for(var i = 0; i < r.data.length; i++) {
				createNewarrow(r.data[i].id, r.data[i].name, r.data[i].credit, r.data[i].content);
			}
		})*/
		clearAll();
		displayAll();
	});
	//为删除按钮添加事件
	$(document).on("click", "input[name=del]", function() {
		//console.log(this.parentNode.parentNode.firstElementChild.firstElementChild.value);
		/*if(this.parentNode.parentNode.firstElementChild.firstElementChild.checked) {*/
		console.log("ok");
		$.post(server + "course /del/" + this.parentNode.parentNode.firstElementChild.firstElementChild.value, function(r) {});
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
		/*}*/
	})
	//为修改按钮添加事件
	$(document).on("click", "input[name=change]", function() {
		/*if(this.parentNode.parentNode.firstElementChild.lastElementChild.checked) {*/
		$("#bigChange").css("display", "block");
		$("#changeId").val(this.parentNode.parentNode.firstElementChild.firstElementChild.value);
		//console.log(this.parentNode.parentNode.firstElementChild.nextElementSibling.innerText)
		$("#changeName").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.innerText);
		$("#changeCredit").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText);
		$("#changeContent").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText)
		/*}*/
		//为修改中的取消添加点击事件
		$("#cancel").on("click", function() {
			$("#changeId").val("");
			$("#changeName").val("");
			$("#changeCredit").val("");
			$("#changeContent").val("");
			$("#bigChange").css("display", "none");
		})
		//为修改中的确认按钮添加点击事件
		$("#affirm").on("click", function() {
			var data = {
				id: $("#changeId").val(),
				name: $("#changeName").val(),
				credit: $("#changeCredit").val(),
				content: $("#changeContent").val()
			}
			$.post(server + "course/update", data, function(r) {
				//alert(r.result);
			})
			$("#changeId").val("");
			$("#changeName").val("");
			$("#changeCredit").val("");
			$("#changeContent").val("");
			$("#bigChange").css("display", "none");
			chearAll();
			displayAll();
		})
	});

	function clearAll() //清除表格
	{
		$("#table").html("<tr><td></td><td>课程名</td><td>学分</td><td>内容</td><td>删除/修改</td></tr>");
	}

	function displayAll() //加载数据
	{
		$.post(server + "course/list", function(r) {
			for(var i = 0; i < r.data.length; i++) {
				createNewarrow(r.data[i].id, r.data[i].name, r.data[i].credit, r.data[i].content);
			}
			
		})
	}
	
	
	//位增加添加点击事件
	$("#add1").on("click", function() {
		
			var data = {
			name: $("#name").val(),
			credit: $("#credit").val(),
			content: $("#content").val()
		}
		/*for(var i=0;i<100;i++)
		{*/
		$.post(server + "course/add", data, function(data) {
			/*alert(data.result);*/
		});
		/*}*/
		
		clearAll();
		displayAll();
		$("#name").val("");
		$("#credit").val("");
		$("#content").val("")

	});
	//为全选或全不选添加点击事件
	$("#checkAll").on("click", function() {
		$("input[name=check]").prop("checked", this.checked);
	});
	//为删除选中添加点击事件
	$("#delchecked").on("click", function() {
		var delall = new Array();
		/*alert( $("input[name=check]:checked").length);*/
		$("input[name=check]:checked").each(function(i){
			delall[delall.length]=($(this).val());
		});
		for(var j = 0; j < delall.length; j++) {
			$.post(server + "course /del/"+delall[j],function(r) {});
		}
		clearAll();
		displayAll();
	});
	
	
	//为查询出来数据的分页添加事件
	
	
});

function createNewarrow(id, name, credit, content) {
	var tr = document.createElement("tr");
	var tds = new Array();
	for(var i = 0; i < 5; i++) {
		tds[tds.length] = document.createElement("td");
		switch(i) {
			case 0:
				var input = document.createElement("input");
				input.type = "checkbox";
				input.value = id;
				input.name = "check";
				tds[i].appendChild(input);
				break;
			case 1:
				tds[i].innerText = name;
				break;
			case 2:
				tds[i].innerText = credit;
				break;
			case 3:
				tds[i].innerText = content;
				break;
			case 4:
				var input1 = document.createElement("input");
				input1.type = "button";
				input1.value = "删除";
				input1.name = "del";
				var input2 = document.createElement("input");
				input2.type = "button";
				input2.value = "修改";
				input2.name = "change";
				tds[i].appendChild(input1);
				tds[i].appendChild(input2);
				break;
		}
	}
	for(var i = 0; i < tds.length; i++) {
		tr.appendChild(tds[i]);
	}

	document.getElementById("table").appendChild(tr);
}
