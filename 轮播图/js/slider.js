
window.onload=function(){
	//ID函数
	function $(id){return document.getElementById(id);}
	//获取元素
	var js_slider	=	$("slider");	//最大的盒子
	var slider_main	=	js_slider.children[0].children[0];//图片的父亲
	var slider_main_img		=	slider_main.children;//所有图片
	var slider_ctrl	=	js_slider.children[1];//控制器
	//操作元素
	for (var i = 0; i < slider_main_img.length; i++) {
		//创建span标签
		var span	=	document.createElement('span');
		//class
		span.className	=	"slider-ctrl-con";
		//索引号
		span.innerHTML	=	slider_main_img.length-i;
		//插入span
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
	}
	//获取所有的点击方块
	var slider_ctrl_spans	=	slider_ctrl.children;
	//给第一个方块加current
	slider_ctrl_spans[1].setAttribute("class","slider-ctrl-con current");
	//得到大盒子的宽度也就是动画走的距离	
	var sliderWidth	=	js_slider.clientWidth;
	//第一张图片留在舞台，剩余的留在舞台右侧
	for ( var i = 1; i <slider_main_img.length; i++ ) {
		slider_main_img[i].style.left		=	sliderWidth + 'px';	
	}
	//key控制图片张数
	var iNow	=	0;
	//开始遍历点击按钮slider_ctrl_spans = 8 (k是索引);
	for( var k in slider_ctrl_spans ) {
		slider_ctrl_spans[k].onclick=function(){
			//判断点击
			//左侧按钮
			if (this.className=="slider-ctrl-prev") {//原理：当前的这张先走到右边 上一张快速到左边 在走到舞台
					//当前的图片走到右边
					animate(slider_main_img[iNow],{left:sliderWidth});
					//图片张数先加加在判断图片
					--iNow < 0 ?	iNow = slider_main_img.length - 1 : iNow;
					//下一张图片迅速到左边	
					slider_main_img[iNow].style.left	=	-sliderWidth + "px";
					//下一张图片走到中间
					animate(slider_main_img[iNow],{left:0});
					//样式函数
					setSquare();

			}
			//右侧按钮
			else if (this.className=="slider-ctrl-next") {	//原理：当前的这张先走到左边 下一张快速到右边 在走到舞台 
					//当前的图片走到左边
					animate(slider_main_img[iNow],{left:-sliderWidth});
					//图片张数先加加在判断图片
					++iNow > slider_main_img.length - 1	?	iNow = 0 : iNow;
					//下一张图片迅速到右边
					slider_main_img[iNow].style.left	=	sliderWidth + "px";
					//下一张图片走到中间
					animate(slider_main_img[iNow],{left:0});
					//样式函数
					setSquare();
			}
			//下面按钮
			else{	
					//索引号
					var that	=	this.innerHTML - 1;
					//点击的右侧
					if( that > iNow ) {
						animate(slider_main_img[iNow],{left:-sliderWidth});
						slider_main_img[that].style.left	=	sliderWidth + "px";
					}
					//点击的左侧
					else if( that < iNow ) {
						animate(slider_main_img[iNow],{left:sliderWidth});
						slider_main_img[that].style.left	=	-sliderWidth + "px";
					}
					//动画
					iNow	=	that;
					animate(slider_main_img[iNow],{left:0});
					//样式函数
					setSquare();
			}
		}
	}
	//可以控制样式的函数
	function setSquare(){
		//遍历
		for (var i = 1; i < slider_ctrl_spans.length - 1; i++) {
			slider_ctrl_spans[i].className	= "slider-ctrl-con";
			slider_ctrl_spans[iNow+1].className = "slider-ctrl-con current";
		}
	}
	//自动播放想当于右侧按钮点击
	var timer	=	null;
	timer	=	setInterval(autoplay,2000);
	function autoplay () {
			//当前的图片走到左边
			animate(slider_main_img[iNow],{left:-sliderWidth});
			//图片张数先加加在判断图片
			++iNow > slider_main_img.length - 1	?	iNow = 0 : iNow;
			//下一张图片迅速到右边
			slider_main_img[iNow].style.left	=	sliderWidth + "px";
			//下一张图片走到中间
			animate(slider_main_img[iNow],{left:0});
			//样式函数
			setSquare();
	}
	//清除定时器
	js_slider.onmouseover=function(){
		clearInterval(timer);
	}
	//开启定时器
	js_slider.onmouseout=function(){
		clearInterval(timer);
		timer	=	setInterval(autoplay,2000);
	}
}