
var iWid=document.body.scrollWidth;

var oCss=document.getElementById("css");
var num=20;
var rate=1.0/num;

//轮播图父容器
var oPic=document.getElementsByClassName("pic")[0];
//轮播图分块div集合
var oPicList=oPic.getElementsByTagName("div");

/* 轮播图图片自适应屏幕宽度 */
function changeWidth(){
	//获取屏幕当前的width
	var iWid=document.body.scrollWidth;
	/*//设置轮播图的页面大小
	var sCss='.banner .pic div{width:'+Math.floor(iWid/num)+'px;background-size:'+iWid+'px 520px;}'
			+'.banner .piclist .pic{background-size:'+iWid+'px 520px;}';
	for(var j=0;j<num;j++)
	{
		sCss+='.banner .pic div:nth-child('+(j+1)+'){background-position:'+(-j*rate*iWid)+'px center;}';
	}
	//给style添加样式
	oCss.innerHTML=sCss;*/
	oPic.style.backgroundSize=iWid+"px 520px";
	var iDivWid=Math.floor(iWid/num);
	for(var j=0;j<num;j++)
	{
		oPicList[j].style.width=iDivWid+'px';
		oPicList[j].style.backgroundSize=iWid+'px 520px';
		oPicList[j].style.backgroundPosition=(-j*iDivWid)+'px center';
	}
	//console.log(oPicList[num-1].style.backgroundUrl);
	oPicList[num-1].style.width=(iDivWid+(iWid-iDivWid*(num))-2)+'px';
	//oPicList[num-1].style.background="red";
}

/* 给公司介绍按钮添加监听 */
var oConPreBtn=document.getElementsByClassName("l_btn")[0];
var oConNextBtn=document.getElementsByClassName("l_btn")[1];
var oConBtnList=document.getElementById("ab_con_btn").getElementsByTagName("button");
var oTitle=document.getElementById("ab_con_tit");
var oConLeft=document.getElementById("ab_con").getElementsByClassName("ab_con_l")[0];
var oConRight=document.getElementById("ab_con").getElementsByClassName("ab_con_r")[0];
var iNowCon=0;
var sConTitle=["公司简介","经营理念","企业文化"];
var sConLeft=[{img:"../images/kmcy1.jpg",text:"用心服务 塑造品质"},
{img:"../images/kmcy2.jpg",text:"客户至上 妥善无忧"},
{img:"../images/kmcy3.jpg",text:"始终如一 以诚为本"}];
var sConRight=[{title:"昆明创意 —— 简介",content:"昆明创意于2008年成立至今，主要致力于互联网应用技术服务!业务涵盖-网站建设、网站制作、400电话、主机域名等；我们能根据客户的需求，提供全面、有效的解决方案... "},
{title:"昆明创意 —— 理念",content:"昆明创意以良好的商业信誉，完善的服务及深厚的技术力量，以客户服务为中心，专业为客户量身打造客户喜欢的网站平台。客户满意度是我们永恒的追求。我们通过敏锐... "},
{title:"昆明创意 —— 文化",content:"我们主要致力于企业网站建设、品牌形象设计、交互设计、视觉设计于一体的专业用户体验的互联网服务。互联网是当今不可或缺的沟通方式，越来越多的人通过网络搜寻... "}]
//
oConPreBtn.addEventListener("click",function(){
	iNowCon--;
	if(iNowCon<0)
		iNowCon=2;
	conSwitch();

})
//
oConNextBtn.addEventListener("click",function(){
	iNowCon++;
	if(iNowCon>2)
		iNowCon=0;
	conSwitch();

})
//切换动画效果
function conSwitch(){
	oTitle.style.top="-20px";
	oTitle.style.opacity="0";
	oConLeft.style.left="-100px";
	oConLeft.style.opacity="0";
	oConLeft.style.left="-100px";
	oConLeft.style.opacity="0";
	oConRight.style.right="-100px";
	oConRight.style.opacity="0";
	for(oConBtn of oConBtnList){
		console.log(oConBtn);
		oConBtn.className="";
	}
	oConBtnList[iNowCon].className="active";
	setTimeout(function(){
		oTitle.getElementsByTagName("span")[0].innerHTML=sConTitle[iNowCon];
		oConLeft.innerHTML='<a>'+
							 '<img src="'+sConLeft[iNowCon].img+'"/>'+
							 '<p>'+sConLeft[iNowCon].text+'</p>'+
						   '</a>';
		oConRight.innerHTML='<h4>'+sConRight[iNowCon].title+'</h4>'+
				 			'<p>'+sConRight[iNowCon].content+'</p>';
		oTitle.style.top="0";
		oTitle.style.opacity="1";
		oConLeft.style.left="0";
		oConLeft.style.opacity="1";
		oConLeft.style.left="0";
		oConLeft.style.opacity="1";
		oConRight.style.right="0";
		oConRight.style.opacity="1";
	},300);
}

/* 给新闻按钮添加监听 */
var oNewsPreBtn=document.getElementsByClassName("r_btn")[0];
var oNewsNextBtn=document.getElementsByClassName("r_btn")[1];
//获取列表对象
var oNewsCon=document.getElementsByClassName("ab_news_list")[0];
//列表中li对象的集合
var oNewsList=oNewsCon.getElementsByTagName("li");
//列表中li的长度
var lNews=oNewsList.length;
 //当前新闻列表ul的left的值
var iLeft=oNewsCon.style.left;
// 左边按钮
oNewsPreBtn.addEventListener("click",function(){

	if(iLeft < 0)
	{
		iLeft+=717;
		oNewsCon.style.left=iLeft+"px";
	}
});
//向右点击按钮
oNewsNextBtn.addEventListener("click",function(){
	if(iLeft > (-717 * (lNews-1)))
	{
		iLeft-=717;
		oNewsCon.style.left=iLeft+"px";
	}
});

var oRocket=document.getElementById("rocket");
//给火箭添加点击事件监听
oRocket.addEventListener("click",function(){
	//设置火箭起飞标志为true
	launch = true;
	//页面回到顶部 火箭改变图片样子
	oRocket.className="active";
	//滚动条平缓上移
	var intervalId=setInterval(function(){
		if(document.body.scrollTop > 30)
			document.body.scrollTop-=30;
		else
		{
			document.body.scrollTop=0;
			clearInterval(intervalId);
		}	
	},10);
	//火箭从底部飞到顶部  消失不见
	setTimeout(function(){
		oRocket.className="";
		oRocket.style.display="none";
		//起飞动画结束  起飞标志设为false
		launch=false;
	},1000)
})

//获取caselist的父容器
var oCaseContainer=document.getElementsByClassName("case_list")[0];
//获取caselist的4个li
var oCaseList = oCaseContainer.getElementsByTagName("li");
//出现动画
function caseAnimation(){
	console.log(oCaseList);
	for(i in oCaseList)
		oCaseList[i].className="case";
}

//页面加载完成
window.onload =function(){
	/* 动态添加轮播图分块div */
	var string="";
	for(var j=0;j<num;j++)
	{
		string+="<div></div>";
	}
	oPic.innerHTML=string;case1
	changeWidth();
	/* 图片切换 */
	var carousel1=carousel(document.getElementById("car1"));
	carousel1.start();

	caseAnimation();
}

//页面窗口改变
window.onresize = function(){
	var iWid=document.body.scrollWidth;
	changeWidth();
}

/* 点击火箭  回到页面顶部的效果 */ 
//获取火箭对象
var oRocket=document.getElementById("rocket");
//是否正在进行火箭飞起的动画
var launch=false;
window.onscroll=function(){
	//获取页面滚动了多少
	var scrollTop=document.body.scrollTop;
	//如果在顶部  火箭不可见 直接退出函数
	if( scrollTop == 0 && !launch)
	{
		oRocket.style.display="none";
	}
	//如果页面滚动 火箭可见
	else
	{
		oRocket.style.display="block";
	}

	//检测横向滚动条
	var scrollLeft=document.body.scrollLeft;
	//获取头部对象
	var oHeader=document.getElementById("header");
	//头部导航栏的left随滚动而改变
	oHeader.style.left = (-scrollLeft)+"px";
}