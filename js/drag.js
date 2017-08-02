	(function(){
		function Drag(options){
			this.oDiv=document.getElementById(options.id);
			this.iLeft=0;
			this.iTop=0;
			this.settings={
				iMinL:0,
				iMaxL:document.documentElement.clientWidth,
				iMinT:0,
				iMaxT:document.documentElement.clientHeight
			}
			
			
			//合并参数
			for(var attr in  this.settings)
				this.settings[attr] = options[attr] || this.settings[attr];
		
		}
		
		Drag.prototype.init=function(){
			var self=this;
			//记录鼠标刚点击时的位置
			self.oDiv.onmousedown = function(ev){
				self.fnDown(ev);
				//触发自定义事件
				fireEvent(this,'toDown');
				return false;
			}
		}
		
		//鼠标按下时   会有默认行为   所以必须加上return false;
		Drag.prototype.fnDown=function(ev){
			var self = this;
			ev = ev || window.event;
			//随着物体移动，offsetLeft的值也在变化，所以必须在一开始就确定offset的值
			//初始值  = pageX - left（物体的相对父元素的位置）  =  物体父元素的位置  +  鼠标初始相对物体的位置
			//left（物体相对于父元素的值） = pageX - (物体父元素的位置   +  鼠标初始相对物体的位置) = pageX - 初始值
			self.iLeft = ev.clientX - self.oDiv.offsetLeft;
			self.iTop = ev.clientY - self.oDiv.offsetTop; 	
			
			//兼容非标准IE   IE下通过这个使文字选中后的拖拽事件不发生
			if(self.oDiv.setCapture)
			{
				self.oDiv.setCapture();
			}
			//鼠标安下时  对物体添加鼠标移动事件   鼠标拖动太快，可能脱离物体，所以用document更好
			document.onmousemove  = function(ev){
				self.fnMove(ev);
				fireEvent(self.oDiv,'toMove');
			}
			
			//当鼠标放开，取消鼠标移动事件监听   document避免遇到层级高的元素
			document.onmouseup = function(){
				self.fnUp();
				fireEvent(self.oDiv,'toUp');
			}
			
		}
		
		//当鼠标移动，不断改变物体的坐标
		Drag.prototype.fnMove=function(ev){
			var self = this;
			ev = ev || window.event;
			
			var settings = self.settings;
			
			var iMinL = settings.iMinL;
			var iMinT = settings.iMinT;
			var iMaxL = settings.iMaxL;
			var iMaxT = settings.iMaxT;
			/*this.oDiv.style.left =  ev.clientX - this.iLeft  +"px";
			this.oDiv.style.top =  ev.clientY - this.iTop +"px";*/
			var L =  ev.clientX - self.iLeft ;
			var T=  ev.clientY - self.iTop ;
			
			if( L < iMinL )
				L = iMinL;
			else if(L > iMaxL - self.oDiv.offsetWidth  ){
				L = iMaxL - self.oDiv.offsetWidth;
			}
			if( T < iMinT )
				T=iMinT;
			else if(T > iMaxT - self.oDiv.offsetHeight  ){
				T = iMaxT - self.oDiv.offsetHeight;
			}
			this.oDiv.style.left =  L + "px";
			this.oDiv.style.top =   T + "px";
		}
		
		Drag.prototype.fnUp=function(){
			document.onmousemove = null;
			document.onmouseup = null;
			if(this.oDiv.releaseCapture)
			{
				this.oDiv.releaseCapture();
			}
		}
		
		
		window.Drag = Drag;
	})();
	//相当于jqury的on函数
	function bindEvent(obj,event,fn){
		obj.events = obj.events || {};
		obj.events[event] = obj.events[event] || [];
		
		obj.events[event].push(fn);
		
		if(obj.nodeType){
			if(obj.addEventListener)
			{
				obj.addEventListener(event,fn);
			}
			else
			{
				obj.attachEvent("on"+event,fn);
			}
		}
	}
	//相当于jquery的trigger函数
	function fireEvent(obj,event){
		if(obj.events && obj.events[event] ){
			var fn = obj.events[event];
			for(var i in  fn)
				if(typeof fn[i] == "function")
					fn[i]();
		}
	}