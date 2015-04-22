function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iCur=0;
		
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(iCur==iTarget)
		{
			clearInterval(obj.timer);
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}, 30)
}
HTMLImageElement.prototype.Show = function(){
	var _this = this;
	var i = 0;
	var c = setInterval(function(){
		_this.style.opacity = (parseFloat(_this.style.opacity) + 0.01) + "";
		if(i == 99){
			clearInterval(c);
			return;
		}
		i++;
	},20)
	var cc = setTimeout(function(){
		_this.style.opacity = "1";
		clearTimeout(cc);
	},1050)
}
HTMLImageElement.prototype.Hidden = function(){
	var _this = this;
	var i = 0;
	var c = setInterval(function(){
		_this.style.opacity = (parseFloat(_this.style.opacity) - 0.01) + "";
		if(i == 99){
			clearInterval(c);
			return;
		}
		i ++;
	},20)
	var cc = setTimeout(function(){
		_this.style.opacity = "0";
		clearTimeout(cc)
	},1050)
}
HTMLDivElement.prototype.lunbotuAnimate =function(interval,num){
	var i = 0;
	var imgs = this.getElementsByTagName("img");
	var _this = this ;
	setInterval(function(){
		startMove(imgs[i%num],"opacity",0)
		startMove(imgs[(i+1)%num],"opacity",100)
		i++;
	},interval);
}
HTMLDivElement.prototype.lunbotuCenter= function(){
	var sw = document.body.clientWidth || document.documentElement.clientWidth;
	this.style.width=sw + "px";
	var width = parseInt(this.getElementsByTagName("img")[0].style.width)
	this.getElementsByTagName("div")[0].style.left =0; //(-(width-sw))/8+"px";
}
HTMLDivElement.prototype.lunbotu = function(maxwidth ,height ,num ,interval){
	var childDiv = document.createElement("div");
	var style = document.createElement("style");
	var sw = document.body.clientWidth || document.documentElement.clientWidth;
	style.innerHTML = 
	"#lunboStage {width:"+sw+"px;height:"+height+"px;position:relative;overflow:hidden;}"+
	"#lunboStage div{height:100%;position:absolute;}"+
	"#lunboStage img{position:absolute;top:0px;}"
	for(var i = 0 ; i<num ; i++){
		var tp = document.createElement("img");
		tp.setAttribute("src" ,"imgs/pic"+(i+1)+".jpg");
		tp.setAttribute("style","width:"+maxwidth+"px;")
		childDiv.appendChild(tp);
		if(i!=0){
			tp.style.opacity = "0"
		}else{
			tp.style.opacity = "1"
		}
		console.dir(tp)
	}
	this.appendChild(childDiv);
	this.appendChild(style);
	this.lunbotuAnimate.call(this,3000,3);
	this.lunbotuCenter.call(this);
	var _this = this ;
	window.addEventListener("resize",function(){
		_this.lunbotuCenter.call(_this)
	});

}