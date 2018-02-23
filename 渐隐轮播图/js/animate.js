/*
 * 运动框架封装
 * 		杨永琪
 * 			 animate(obj,{属性:终点},回调function(){})
 * 
 * 
 */	
function animate(obj, json, fn) { 
		//关闭定时器
    	clearInterval(obj.timer);
    	//开启定时器
    	obj.timer = setInterval(function() {
    		//定时器开关
    		var flag = true; 
    		//遍历attr属性json[attr]值
    		for(var attr in json) { 
    			//当前
    			var current = 0;
    			//判断opacity转换
    			if(attr == "opacity") {
    				current = parseInt(getStyle(obj, attr) * 100) || 0;
    			} else {
    				current = parseInt(getStyle(obj, attr)); 
    			}
    			// 	步长  =  用目标位置  - 现在的位置 / 10;
    			var step = (json[attr] - current) / 10; 
    			step = step > 0 ? Math.ceil(step) : Math.floor(step);
    			//判断用户有没有输入 opacity
    			if(attr == "opacity")  
    			{	// 判断 我们浏览器是否支持opacity
    				if("opacity" in obj.style) 
    				{
    					// obj.style.opacity
    					obj.style.opacity = (current + step) / 100;
    				} else {
    					//obj.style.filter = alpha(opacity = 30)
    					obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";
    				}
    			} else if(attr == "zIndex") {
    				obj.style.zIndex = json[attr];
    			} else {
    				obj.style[attr] = current + step + "px";
    			}
				//只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
    			if(current != json[attr])
    			{	
    				flag = false;
    			}
    		}
    		//用于判断定时器的条件
    		if(flag) 
    		{
    			clearInterval(obj.timer);
    			//当定时器停止 动画就结束了执行回调
    			if(fn) 
    			{
    				fn();
    			}
    		}
    	}, 30)
    }




/*
 * 获取当前样式
 */
    function getStyle(obj, attr) { 
    	if(obj.currentStyle) 
    	{
    		return obj.currentStyle[attr]; 
    	} else {
    		return window.getComputedStyle(obj, null)[attr]; 
    	}
    }