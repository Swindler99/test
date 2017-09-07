$(function() {
	var server = "http://172.13.16.2:8900/school/";
	var currentPage=0;
	function clearAll() //清除表格
	{
		$("#stuTab").html("<tr><td></td><td>课程名</td><td>学分</td><td>内容</td><td>删除/修改</td></tr>");
	}

	function displaystudent() {
		clearAll();
		$.post(server + "student/list", function(r) {
			
			for(var i = 0; i < r.data.data.length; i++) {
				createNewarrowStu(r.data.data[i].id, r.data.data[i].name, r.data.data[i].no, r.data.data[i].gender);
				
			}
			var totalPage = r.data.totalPage;
			/*alert(totalPage);*/
			if(totalPage <= 1) {
				$("#previousPage").addClass('disabled');
				$("#secondPage").addClass('disabled');
				$("#nextPage").addClass('disabled');
			} else {
				$("#previousPage").addClass('disabled');
			}
		})
	}
	//为第二页添加事件
	$("#secondPage").on("click",function(){
		currentPage=2;
		clearAll();
		$.post(server + "student/list/5", function(r) {
			for(var i = 0; i < r.data.data.length; i++) {
				createNewarrowStu(r.data.data[i].id, r.data.data[i].name, r.data.data[i].no, r.data.data[i].gender);
				console.log(r.data.data[i].name);
				
			}
			var totalPage = r.data.totalPage;
			/*alert(totalPage);*/
			if(totalPage <= 2) {
				$("#nextPage").removeClass('disabled');
			} else {
				$("#previousPage").removeClass('disabled');
				$("#previousPage").removeClass('disabled');
				$("#secondPage").removeClass('disabled');
			}
		})
	});
	$("#displayStudent").on("click", displaystudent());
	//为删除按钮添加点击事件
	$(document).on("click", "#del", function() {
		$.post(server + "student/del/" + this.parentNode.parentNode.firstElementChild.firstElementChild.value, function(r) {});
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	});
	//为修改按钮添加点击事件
	$(document).on("click", "#change", function() {
		var ids = this.parentNode.parentNode.firstElementChild.firstElementChild.value;
		$("#bigChange").css("display", "block");
		$.post(server + "student/view/" + ids, function(r) {
			console.log(r.data);
			/*var dialog = $.dialog({
				content: 'url:changeStuMess.html',
				title: '欢迎',
				lock: true,
				ok: function() {

				},
				cancel: function() {

				}
			});*/
			$("#changeId").val(r.data.id);
			$("#changeName").val(r.data.name);
			$("#changeNo").val(r.data.no);
			$("#changeGender").val(r.data.gender);
			$("#changeBirthdate").val(r.data.birthdate);
			$("#changeHomeCity").val(r.data.homeCity);
			$("#changeAvatar").val(r.data.avatar);
			$("#changePassword").val(r.data.password);
		});
	});
	//为修改中的取消添加点击事件
	$("#cancel").on("click", function() {
		$("#changeId").val("");
		$("#changeName").val("");
		$("#changeNo").val("");
		$("#changeGender").val("");
		$("#changeBirthdate").val("");
		$("#changeHomeCity").val("");
		$("#changeAvatar").val("");
		$("#changePassword").val("");
		$("#bigChange").css("display", "none");
	})
	//为修改中的确认按钮添加点击事件
	$("#affirm").on("click", function() {
		var data = {
			name: $("#changeName").val(),
			no: $("#changeNo").val(),
			gender: $("#changeGender").val(),
			birthdate: $("#changeBirthdate").val(),
			homeCity: $("#changeHomeCity").val(),
			avatar: $("#changeAvatar").val(),
			password: $("#changePassword").val()
		}
		$.post(server + "student/update", data, function(r) {
			//alert(r.result);
		$("#changeId").val("");
		$("#changeName").val("");
		$("#changeNo").val("");
		$("#changeGender").val("");
		$("#changeBirthdate").val("");
		$("#changeHomeCity").val("");
		$("#changeAvatar").val("");
		$("#changePassword").val("");
		$("#bigChange").css("display", "none");
		chearAll();
		displayAll();
		});
	})
	//为提交学生信息的按钮添加事件
	$("#submitStuMessage").on("click", function() {
		var data = {
			name: $("#studentName").val(),
			no: $("#studentNo").val(),
			gender: $("#studentSex").val(),
			birthdate: $("#studentBirthdate").val(),
			homeCity: $("#homeCity").val(),
			avatar: $("#avatar").val(),
			password: $("#studentPassword").val()
		}
		$.post(server + "student/add", data, function(data) {
			alert(data.result);
			alert(data.message);
			if(data.result) {
				$("#studentName").val("");
				$("#studentNo").val("");
				$("#studentSex").val("");
				$("#studentBirthdate").val("");
				$("#homeCity").val("");
				$("#avatar").val("");
				$("#studentPassword").val("");
			}
		});

	});
	

});

function createNewarrowStu(id, name, credit, content) {
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
				/*var input1 = document.createElement("input");*/
				/*input1.type = "button";
				input1.value = "删除";*/
				/*input1.appendChild(span);*/
				var span1=document.createElement("span");
				/*span.addClass("glyphicon glyphicon-trash");*/
				span1.className="glyphicon glyphicon-trash";
				span1.id = "del";
				span1.style.width="50px";
				/*var input2 = document.createElement("input");
				input2.type = "button";
				input2.value = "修改";
				input2.name = "change";*/
				var span2=document.createElement("span");
				span2.className="glyphicon glyphicon-pencil";
				span2.id ="change";
				tds[i].appendChild(span1);
				tds[i].appendChild(span2);
				break;
		}
	}
	for(var i = 0; i < tds.length; i++) {
		tr.appendChild(tds[i]);
	}

	document.getElementById("stuTab").appendChild(tr);
}