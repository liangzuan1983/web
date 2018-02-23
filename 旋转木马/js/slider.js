window.onload = function() {
	//获取元素
	var wrap = document.getElementById('wrap');
	var arrow = document.getElementById('arrow');
	var slider = document.getElementById('slide');
	var lis = slider.getElementsByTagName('li');
	//鼠标移入
	wrap.onmouseover = function() {
		animate(arrow, {
			'opacity': 100
		});
	};
	//鼠标移出
	wrap.onmouseout = function() {
		animate(arrow, {
			'opacity': 0
		});
	};
	//存储了每个图片的信息
	var json = [
    { //  1
			width: 200,
			top: 0,
			left: 10,
			opacity: 100,
			z: 2
		},
		{ // 2
			width: 200,
			top: 0,
			left: 200,
			opacity: 100,
			z: 3
		},
		{ // 3
			width: 200,
			top: 0,
			left: 390,
			opacity: 100,
			z: 4
		},
		{ // 4
			width: 200,
			top: 0,
			left: 580,
			opacity: 100,
			z: 3
		},
		{ //5
			width: 200,
			top: 0,
			left: 770,
			opacity: 100,
			z: 2
		}
	];
	//先调用方法
	change();
  //函数节流
  var jieliu  = true;
	//点击按钮
	var as = arrow.children;
	for(var k in as) {
		as[k].onclick = function() {
			if(this.className == "prev") {
        if ( jieliu==true ) {
            change(true);
            jieliu=false;
        }
			} else {
				  if ( jieliu==true ) {
            change(false);
            jieliu=false;
        }
			}
		}
	}
	//方法
	function change(falg) {
    //判断左还是右
    if (falg) {
      json.unshift(json.pop())
    }else{
       json.push(json.shift())
    }
		for(var i = 0; i < json.length; i++) {
			animate(lis[i], {
				width: json[i].width,
				top: json[i].top,
				left: json[i].left,
				opacity: json[i].opacity,
				zIndex: json[i].z
			},function () {
           jieliu=true;
     })
		}
	}
}