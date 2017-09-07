var pageNum = 0; //记录当前屏幕显示的第几页，页数的记载是从1到7页
var resultPageNum=1;//当前显示的是查询到的结果的第几页
var saveDatas = new Array(); //用于存储经过查询条件后查出来的所有数据
window.onload = function() {
	navSlectPage(1);
	document.getElementById("liLastpage").onclick = lastPage;
	document.getElementById("liFirstPage").onclick = function() { navSlectPage(1) };
	document.getElementById("liTwoPage").onclick = function() { navSlectPage(2) };
	document.getElementById("liThreePage").onclick = function() { navSlectPage(3) };
	document.getElementById("liFourPage").onclick = function() { navSlectPage(4) };
	document.getElementById("liFivePage").onclick = function() { navSlectPage(5) };
	document.getElementById("liSixPage").onclick = function() { navSlectPage(6) };
	document.getElementById("previousPage").onclick = function() { previousPage() }; //为向上翻页添加点击事件
	document.getElementById("nextPage").onclick = function() { nextPage() }; //为向下翻页添加点击事件
	document.getElementById("clickJump").onclick = function() { clickJump() }; //为点击跳转添加事件
	document.getElementById("dropDownBox").onchange = function() { dropDownBoxPage() }; //为下拉框添加事件
	document.getElementById("search").onclick = function() { displaySearchDatas() };
	document.getElementById("resultPreviousPage").onclick=function(){resultPreviousPage()};//为查询到的结果添加向上翻页事件
	document.getElementById("resultNextPage").onclick=function(){resulltNextPage()};
}

function ajaxRequest() //ajax发出请求的函数将返回来的json字符串转换成json对象用data储存
{
	var xhr = new XMLHttpRequest();
	var data;
	xhr.open("GET", "8.5周任务一.json", false);
	var trs;
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			data = JSON.parse(xhr.responseText);
		}
	}
	xhr.send();
	return data;
}

function lastPage() { //无筛选情况下显示最后一页表格
	clearAllchild();
	var trs = document.getElementsByTagName("tr");
	var lastPa = ajaxRequest();
	for(var i = 1; i < 3; i++) {
		trs[i].children[0].innerHTML = lastPa[lastPa.length - i].picture;
		trs[i].children[1].innerText = lastPa[lastPa.length - i].name;
		trs[i].children[2].innerText = lastPa[lastPa.length - i].sex;
		trs[i].children[3].innerText = lastPa[lastPa.length - i].age;
		trs[i].children[4].innerText = lastPa[lastPa.length - i].team;
		trs[i].children[5].innerText = lastPa[lastPa.length - i].nationality;
	}
	pageNum = 7; //记录点击了之后的页面是7
}

function clearAllchild() //清除所有表格中的数据
{
	var trs = document.getElementsByTagName("tr");
	for(var i = 1; i < trs.length; i++) {
		var childAllNode = trs[i].childNodes;
		for(var j = 0; j < childAllNode.length; j++) {
			childAllNode[j].innerText = "";
		}
	}
}

function navSlectPage(n) { //根据导航的数字显示对应数据
	clearAllchild();
	var trs = document.getElementsByTagName("tr");
	var lastPa = ajaxRequest();
	for(var i = 1; i < 6; i++) {
		trs[i].children[0].innerHTML = lastPa[i + 5 * (n - 1) - 1].picture;
		trs[i].children[1].innerText = lastPa[i + 5 * (n - 1) - 1].name;
		trs[i].children[2].innerText = lastPa[i + 5 * (n - 1) - 1].sex;
		trs[i].children[3].innerText = lastPa[i + 5 * (n - 1) - 1].age;
		trs[i].children[4].innerText = lastPa[i + 5 * (n - 1) - 1].team;
		trs[i].children[5].innerText = lastPa[i + 5 * (n - 1) - 1].nationality;
	}
	pageNum = n; //记录当前页面数
}

function previousPage() //向上翻一页
{
	if(pageNum == 1) //如果当前页面是第一页就无法向上翻页
	{
		return;
	} else {
		navSlectPage(pageNum - 1); //调用导航的这个函数实现向上翻页
		//pageNum--;
	}
}

function nextPage() //向下翻一页
{
	if(pageNum == 7) //当前页面为第7页无法向下翻页
	{
		return;
	} else if(pageNum == 6) {
		lastPage();
	} else {
		navSlectPage(pageNum + 1); //调用导航的这个函数实现向下翻页
		//pageNum++;
	}
}

function clickJump() //点击跳转到输入的页面
{
	var num = document.getElementById("interPage").value;
	if(num >= 1 && num <= 6) {
		navSlectPage(num);
	} else if(num == 7) {
		lastPage();
	} else {
		alert("请输入1到7的数字");
	}
}

function dropDownBoxPage() //跳转到下拉框选择的页面
{
	var dropDownBoxnum = document.getElementById("dropDownBox").value;
	dropDownBoxnum = parseInt(dropDownBoxnum);
	if(dropDownBoxnum == 7) {
		lastPage();
	} else {
		navSlectPage(dropDownBoxnum);
	}
}

function search() //返回根据查询条件筛选出来的数据
{
	document.getElementById("promptMessage").innerText="";
	saveDatas.splice(0, saveDatas.length); //每次查询都移除上次在saveDatas中的数据
	var name = document.getElementById("inputName").value;
	var ageStart = document.getElementById("inputAgeStart").value;
	var ageEnd = document.getElementById("inputAgeEnd").value;
	var sex = document.getElementById("inputSex").value;
	var nationality = document.getElementById("inputNationality").value;
	var team = document.getElementById("inputTeam").value;
	var datas = ajaxRequest();
	clearAllchild();
	//所有筛选的顺序是姓名--》年龄--》性别--》国籍--》队伍名称
	var saveName = new Array(); //储存筛选名字后的数据
	var saveAge = new Array(); //储存筛选名字在筛选年龄之后的数据
	var saveSex = new Array(); //储存筛选名字在筛选年龄筛选性别之后的数据
	var saveNationality = new Array(); //筛选名字在筛选年龄筛选性别筛选国籍之后的数据
	var saveTeam = new Array(); //筛选名字在筛选年龄筛选性别筛选国籍筛选队伍之后的数据
	//得到筛选名字后的数组saveName
	if(name == "") {
		for(var i=0;i<datas.length;i++)
		{
			saveName[saveName.length]=datas[i];
		}
	} else {
		for(var i = 0; i < datas.length; i++) //从原数据中筛选出符合队伍名称的数据
		{
			//console.log(datas[i].team);
			console.log(datas[i].name);
			if(datas[i].name.indexOf(name)>=0) 
			{
				saveName[saveName.length] = datas[i];
			}
			/*if(datas[i].name==name)
			{
				saveName[saveName.length] = datas[i];
			}*/
			
		}
	}
	//得到筛选了名字和年龄后的数组saveAge
	if(ageEnd==""&&ageStart=="")
	{
		for(var i=0;i<saveName.length;i++)
		{
			saveAge[saveAge.length]=saveName[i];
		}
	}
	else if(ageEnd==""){
		for(var i=0;i<saveName.length;i++)
		{
			if(saveName[i].age==ageStart)
			{
				saveAge[saveAge.length]=saveName[i];
			}
		}
	}
	else if(ageStart=="")
	{
		for(var i=0;i<saveName.length;i++)
		{
			if(saveName[i].age==ageEnd)
			{
				saveAge[saveAge.length]=saveName[i];
			}
		}
	}
	else
	{
		for(var i=0;i<saveName.length;i++)
		{
			if(saveName[i].age>=ageStart&&saveName[i].age<=ageEnd)
			{
				saveAge[saveAge.length]=saveName[i];
			}
		}
	}
	
	
	
	//得到筛选了名字 ，年龄,性别后的数组saveSex
	if(sex=="")
	{
		for(var i=0;i<saveAge.length;i++ )
		{
			saveSex[saveSex.length]=saveAge[i];
		}
	}
	else
	{
		for(var i=0;i<saveAge.length;i++ )
		{
			if(saveAge[i].sex==sex)
			{
				saveSex[saveSex.length]=saveAge[i];
			}
		}
	}
	//得到筛选了名字 ，年龄,性别，国籍之后的数组
	if(nationality=="")
	{
		for(var i=0;i<saveSex.length;i++)
		{
			saveNationality[saveNationality.length]=saveSex[i];
		}
	}
	else{
		for(var i=0;i<saveSex.length;i++)
		{
			if(saveSex[i].nationality==nationality)
			{
				saveNationality[saveNationality.length]=saveSex[i];
			}
		}
	}
	//得到筛选了名字 ，年龄,性别，国籍，队伍之后的数组
	if(team=="")
	{
		for(var i=0;i<saveNationality.length;i++)
		{
			saveDatas[saveDatas.length]=saveNationality[i];
		}
	}
	else{
		for(var i=0;i<saveNationality.length;i++)
		{
			if(saveNationality[i].team==team)
			{
				saveDatas[saveDatas.length]=saveNationality[i];
			}
		}
	}
	resultPageNum=1;
	if(saveDatas.length<=0)
	{
		document.getElementById("promptMessage").innerText="未找到对应信息的人物";
	}
	return saveDatas;
	}
function displaySearchDatas()
{
	saveDatas= search();
	var trs = document.getElementsByTagName("tr");
		for(var i = 0; i < 5; i++) {
		
			trs[i+1].children[0].innerHTML = saveDatas[i].picture;
			trs[i+1].children[1].innerText = saveDatas[i].name;
			trs[i+1].children[2].innerText = saveDatas[i].sex;
			trs[i+1].children[3].innerText = saveDatas[i].age;
			trs[i+1].children[4].innerText = saveDatas[i].team;
			trs[i+1].children[5].innerText = saveDatas[i].nationality;
		}
		//resultPageNum++;
	
}
function resulltNextPage()
{
		var needpage=Math.ceil(saveDatas.length/5);//计算出需要的用来存储的页数
		if(resultPageNum==needpage)
		{
			return ;
		}
		else
		{
			var trs = document.getElementsByTagName("tr");
			resultPageNum++;
			console.log(resultPageNum);
			clearAllchild();//移除这一页中的数据
			for(var i = 0; i < 5; i++) {
		
			trs[i+1].children[0].innerHTML = saveDatas[i+5*(resultPageNum-1)].picture;
			trs[i+1].children[1].innerText = saveDatas[i+5*(resultPageNum-1)].name;
			trs[i+1].children[2].innerText = saveDatas[i+5*(resultPageNum-1)].sex;
			trs[i+1].children[3].innerText = saveDatas[i+5*(resultPageNum-1)].age;
			trs[i+1].children[4].innerText = saveDatas[i+5*(resultPageNum-1)].team;
			trs[i+1].children[5].innerText = saveDatas[i+5*(resultPageNum-1)].nationality;
			if(i+5*(resultPageNum-1)+1>=saveDatas.length)
				{
					return;
				}
			}
			
		}
}
function resultPreviousPage()
{
	var needpage=Math.ceil(saveDatas.length/5);//计算出需要的用来存储的页数
	var n=saveDatas.length%5;
	if(resultPageNum==1)
	{
		return;
	}
	else if(resultPageNum==needpage)
	{
		clearAllchild();//移除这一页中的数据
		//var n=saveDatas.length%5;
		var trs = document.getElementsByTagName("tr");
		for(var i = 0; i < 5; i++) {
		
			trs[i+1].children[0].innerHTML = saveDatas[saveDatas.length-n-5+i].picture;
			trs[i+1].children[1].innerText = saveDatas[saveDatas.length-n-5+i].name;
			trs[i+1].children[2].innerText = saveDatas[saveDatas.length-n-5+i].sex;
			trs[i+1].children[3].innerText = saveDatas[saveDatas.length-n-5+i].age;
			trs[i+1].children[4].innerText = saveDatas[saveDatas.length-n-5+i].team;
			trs[i+1].children[5].innerText = saveDatas[saveDatas.length-n-5+i].nationality;
		}
		resultPageNum--;
		console.log(resultPageNum);
	}
	else{
		clearAllchild();//移除这一页中的数据
		var trs = document.getElementsByTagName("tr");
		for(var i = 0; i < 5; i++) {
			trs[i+1].children[0].innerHTML = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].picture;
			trs[i+1].children[1].innerText = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].name;
			trs[i+1].children[2].innerText = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].sex;
			trs[i+1].children[3].innerText = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].age;
			trs[i+1].children[4].innerText = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].team;
			trs[i+1].children[5].innerText = saveDatas[saveDatas.length-n-5*(needpage-resultPageNum+1)+i].nationality;
		}
		resultPageNum--;
		console.log(resultPageNum);
	}
}
