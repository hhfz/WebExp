function carousel(elem,options){
	/* 参数设置 */
	var defaults={
		iClock:30,//div的动画间隔时间   单位：ms
		iPause:3000,//图片停留时间     单位：ms
	}
	var params={}, options=options||{}
	for(var key in defaults)
	{
		params[key]= options[key] || defaults[key]
	}
	/* 轮播图代码 */
	var oDivList=elem.getElementsByClassName("pic")[0].getElementsByTagName("div");//图片组成div数组
	var oBtnList= elem.getElementsByClassName("btnlist")[0].getElementsByTagName("span") ;//按钮数组
	var oPic=elem.getElementsByClassName("pic")[0];//轮播图容器
	var lAm=["","r_l_hide","up_hide","down_hide"];//动画效果数组
	var iPic=oBtnList.length;//轮播图图片数目
	var lPicDiv=oDivList.length;//每张图片拆分成多少个div
	/* 初始化 */
	var iAm=0;//动画效果
	var iPrev=0;//前一张轮播图位置    从0开始计算
	var iNow=0;//当前轮播图位置    从0开始计算
	var animated=false;//是否正在播放动画
	//轮播图切换图片  可以顺序切换    也可以点击切换   只需要设置iNow的值
	function next(){
		if(!animated)
		{	
			animated=true;
			//选择动画效果
			iAm++;
			if(iAm==lAm.length)
				iAm=1;
			//使子元素div top值为0   且背景图片为当前父元素的背景图片
			for(var i=0;i<lPicDiv;i++)
			{
				oDivList[i].style.backgroundImage='url(../images/banner'+iPrev+'.jpg)';
				oDivList[i].className="";
			}
			//设置iPrev为最新的一张图片位置
			iPrev=iNow;
			//设置父元素的背景图片为下一张图片
			oPic.style.backgroundImage='url(../images/banner'+iNow+'.jpg)';
			//给按钮设置active效果
			for(var i in oBtnList)
			{
				oBtnList[i].className="";
			}
			oBtnList[iNow].className="active";
			//对每个子元素设置动画效果
			for(var i=0;i<lPicDiv;i++)
			{
				(function(index){
					setTimeout(function(){
						oDivList[index].className=lAm[iAm];
					},index*params.iClock);
				})(i);
			}
			//当动画结束后，设置animated=false
			setTimeout(function(){
				animated=false;
			},lPicDiv*params.iClock);
		}
	}
	//给按钮添加点击事件
	for(var i=0;i<oBtnList.length;i++)
	{
		(function(index){
			oBtnList[index].addEventListener('click',function(){
				console.log();
				if(!animated)
				{
					pjump(index);
				}
			});
		})(i);
	}
	
	//按钮的点击跳转图片
	function pjump(index)
	{
		stop();
		iNow=index;
		next();
		setTimeout(function(){
			start();
		},lPicDiv*params.iClock);
	}
	
	var intervalId=null;
	//开始轮播
	function start(){
		intervalId=setInterval(function(){
			iNow++;
			if(iNow == iPic)
				iNow = 0;
			next();
		},params.iPause);
	}
	//结束轮播
	function stop(){
		clearInterval(intervalId);
	}
	
	var exports={};
	exports.start=start;
	exports.stop=stop;
	
	return exports;
}

