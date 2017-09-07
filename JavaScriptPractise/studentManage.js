$(function() {
	var server = "http://172.13.16.2:8900/school/";
	//为课程列表添加一个点击事件
	$("#courseList").on("click", function() {
		$.post(server + "course/list", function(r) {
			var data = {
				courses: r.data
			}
			var coursesList1 = template('courseMode', data);
			$("#displayCourse").html(coursesList1);
		})

	});
	//为course删除图标添加点击事件
	$(document).on("click", "#delCourse", function() {
		$.post(server + "course/del/" + this.parentNode.parentNode.firstElementChild.innerText, function(r) {});
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	});
	//为course修改添加点击事件
	$(document).on("click", "#changeCourse", function() {
		$("#modalCourseId").val(this.parentNode.parentNode.firstElementChild.innerText);
		$("#modalCourseName").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.innerText);
		$("#modalCourseCredit").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText);
		$("#modalCourseContent").val(this.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText)
	});
	//为course模态框中的确认添加点击事件，并将修改的内容传到数据库
	$("#modalCourseAffirm").on("click", function() {
		var data = {
			id: $("#modalCourseId").val(),
			name: $("#modalCourseName").val(),
			credit: $("#modalCourseCredit").val(),
			content: $("#modalCourseContent").val()
		}
		$.post(server + "course/update", data, function(r) {
			alert(r.message);
		})
	});
	//为addCourse添加事件
	$("#addCourseAffirm").on("click", function() {
		var data = {
			name: $("#addCourseName").val(),
			credit: $("#addCourseCredit").val(),
			content: $("#addCourseContent").val()
		}
		$.post(server + "course/add", data, function(r) {
			alert(r.message);
		});

		$("#addCourseName").val("");
		$("#addCourseCredit").val("");
		$("#addCourseContent").val("")
	});
	//为学生列表添加一个点击事件
	$("#studentList").on("click", function() {
		$.post(server + "student/list", function(r) {
			console.log(r.data);
			var data = {
				students: r.data.data
			}
			var studentsList1 = template('studentMode', data);
			$("#displayStudent").html(studentsList1);
			//为学生分页模板添加数据
			var stuPageArray = new Array();
			for(var i = 1; i <= r.data.totalPage; i++) {
				stuPageArray[stuPageArray.length] = i;
			}
			var data1 = {
				totalPage: stuPageArray
			}
			var page1 = template("studentPageMode", data1);
			$("#displayStudent").append(page1);
			$("#stuPagePrevious").addClass("disabled");
		});

	});
	//为学生列表的删除图标添加事件
	$(document).on("click", "#delStudent", function() {
		$.post(server + "student/del/" + this.parentNode.parentNode.firstElementChild.innerText, function(r) {
			alert(r.message);
		});
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	})
	//为student修改添加点击事件
	$(document).on("click", "#changeStudent", function() {

		var presentId = 0;
		presentId = this.parentNode.parentNode.firstElementChild.innerText;
		$.post(server + "student/view/" + this.parentNode.parentNode.firstElementChild.innerText, function(r) {
			$("#modalStudentId").val(r.data.id);
			$("#modalStudentName").val(r.data.name);
			$("#modalStudentNo").val(r.data.no);
			$("#modalStudentGender").val(r.data.gender);
			$("#modalStudentBirthdate").val(r.data.birthdate);
			$("#modalStudentHomecity").val(r.data.homeCity);
			$("#modalStudentAvarta").val(r.data.avarta);
			$("#modalStudentPassword").val(r.data.password);

		});
	});
	//为student模态框中的确认添加点击事件，并将修改的内容传到数据库
	$("#modalStudentAffirm").on("click", function() {
		var data = {
			id: $("#modalStudentId").val(),
			name: $("#modalStudentName").val(),
			no: $("#modalStudentNo").val(),
			gender: $("#modalStudentGender").val(),
			birthdate: $("#modalStudentBirthdate").val(),
			homeCity: $("#modalStudentHomecity").val(),
			avarta: $("#modalStudentAvarta").val(),
			password: $("#modalStudentPassword").val()
		}
		$.post(server + "student/update", data, function(r) {
			alert(r.message);
		})
	});
	//为增加学生的确认按钮增加点击事件，并将增加的学生添加到数据库
	$("#addStudentAffirm").on("click", function() {
		var formData=new FormData();
		formData.append("name",$("#addStudentName").val());
		formData.append("no",$("#addStudentNo").val());
		formData.append("gender",$("[name=addStudentGender]").val());
		formData.append("birthdate",$("#addStudentBirthdate").val());
		formData.append("homeCity",$("#addStudentHomecity").val());
		formData.append("password",$("#addStudentPassword").val());
		formData.append("file",$("#addStudentAvatar")[0].files[0]);
		var request=new XMLHttpRequest();
		request.open("POST",server+"student/add");
		request.onload=function(){
			console.log(request.responseText);
		}
		request.send(formData);
		/*var data = {
			name: $("#addStudentName").val(),
			no: $("#addStudentNo").val(),
			gender: $("[name=addStudentGender]").val(),
			birthdate: $("#addStudentBirthdate").val(),
			homeCity: $("#addStudentHomecity").val(),
			avatar: $("#addStudentAvatar").val(),
			password: $("#addStudentPassword").val()
		}
		console.log(data);
		$.post(server + "student/add", data, function(r) {
			alert(data.result);
			alert(r.message);
			if(r.result) {
				$("#addStudentName").val("");
				$("#addStudentNo").val("");
				$("[name=addStudentGender]").val("");
				$("#addStudentBirthdate").val("");
				$("#addStudentHomecity").val("");
				$("#addStudentAvatar").val("");
				$("#addStudentPassword").val("");
			}
		});*/

	});
	//为学生列表的分页添加点击事件
	$(document).on("click", ".stuPageNum", function() {
		var presentPage = this.innerText;
		$(".stuPageNum").each(function() {
			$(this).removeClass("active");
		})

		$.post(server + "student/list/" + this.innerText, function(r) {
			/*console.log(r.data.data);*/

			var data = {
				students: r.data.data
			}
			var studentsList1 = template('studentMode', data);
			$("#displayStudent").html(studentsList1);
			var stuPageArray = new Array();
			for(var i = 1; i <= r.data.totalPage; i++) {
				stuPageArray[stuPageArray.length] = i;
			}
			var data1 = {
				totalPage: stuPageArray
			}
			var page1 = template("studentPageMode", data1);
			$("#displayStudent").append(page1);
			if(presentPage == 1) {
				$("#stuPagePrevious").addClass("disabled");
				$("#stuPageNext").removeClass("disabled");
			} else if(presentPage == r.data.totalPage) {
				$("#stuPageNext").addClass("disabled");
				$("#stuPagePrevious").removeClass("disabled");
			} else {
				$("#stuPagePrevious").removeClass("disabled");
				$("#stuPageNext").removeClass("disabled");
			}
			/*$("#stuPagePrevious").addClass("disabled");*/
			//console.log($(".stuPageNum"));
			$(".stuPageNum").each(function() {
				//console.log($(this).index());
				//console.log(presentPage);
				if($(this).index() == presentPage) {
					$(this).addClass("active");
				}
			});
		});
	});
	//为成绩列表添加点击事件
	$(document).on("click", "#gradeList", function() {
		$.post(server + "score/list", function(r) {
			console.log(r.data);
			var data1={
				scores:r.data.data
			}
			var page1 = template("gradeMode", data1);
			$("#displayGradeList").html(page1);
			
		})

	})
	/*//为增加成绩添加事件
	$(document).on("click", "#addGrade", function() {
		var totalPage = 0;
		$.ajax({
			type: "post",
			url: server + "student/list",
			async: false,
			success: function(r) {
				totalPage = r.data.totalPage;
			}
		});
		for(var i=1;i<=totalPage;i++)
		{
			$.post(server+"student/list/"+i,function(r){
				console.log(r.data.data.length);
				for(var j=0;j<r.data.data.length;i++)
				{
					console.log(r.data.data[j].id);
				}
			})
		}
	});*/
	//为增加成绩表下面的确认按钮添加点击事件
	$(document).on("click", "#addGradeAffirm", function() {
		var data = {
			studentId: $("#addStudentId").val(),
			courseId: $("#addCourseId").val(),
			score: $("#addCourseGrade").val()
		}
		$.post(server + "score/add", data, function(r) {
			alert(r.message);
		});
	});	
	//为成绩列表中的修改添加事件
	$(document).on("click","#changeScore",function(){
		var presentScoreId=this.parentElement.previousElementSibling.previousElementSibling.innerText;
		$.post(server+"score/view/"+presentScoreId,function(r){
			alert(r.message);
			$("#modalScoreCourseId").val(r.data.courseId);
			$("#modalScoreCourseName").val(r.data.courseName);
			$("#modalScoreStudentId").val(r.data.studentId);
			$("#modalScoreStudentName").val(r.data.studentName);
			$("#modalScoreId").val(r.data.id);
			$("#modalScore").val(r.data.score);
		})
	});
	//为成绩列表模态框中的确认添加事件
	$(document).on("click","#modalScoreAffirm",function(){
		var data={
			id:$("#modalScoreId").val(),
			score:$("#modalScore").val()
		}
		$.post(server+"score/update",data,function(r){
			alert(r.message);
		})
	})
	
});