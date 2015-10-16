// JavaScript Document
;(function(){
	window.dScroll=function(target){
		var x=0;//初始x
		var y=0;//初始y
		var oldX=0;//点击时x
		var oldY=0;//点击时y
		var offsetX=0;//偏移值
		var offsetY=0;//偏移值
		var lock=false;
		function move(){
			$(target).attr("style","transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, "+offsetY+"px) translateZ(0px);")
			}
		function topEnd(){
			lock=true;
			console.log("topEnd");
			$(target).attr("style","transition-timing-function: cubic-bezier(0, 0, 0.58, 1.0); transition-duration: 200ms; transform: translate(0px, 40px) translateZ(0px);")
			var topDelayOne=setTimeout(function(){
				$(target).attr("style","transition-timing-function: cubic-bezier(0, 0, 0.58, 1.0); transition-duration: 200ms; transform: translate(0px, 0px) translateZ(0px);")
				var topDelayTwo=setTimeout(function(){
					lock=false;
					},200)
				},200);
			}
		function downEnd(){
			lock=true;
			console.log("downEnd");
			$(target).attr("style","transition-timing-function: cubic-bezier(0, 0, 0.58, 1.0); transition-duration: 200ms; transform: translate(0px, "+(($(target).height()<=$(target).parent().height())?(-40):($(target).parent().height()-$(target).height()-40))+"px) translateZ(0px);")
			var topDelayOne=setTimeout(function(){
				$(target).attr("style","transition-timing-function: cubic-bezier(0, 0, 0.58, 1.0); transition-duration: 200ms; transform: translate(0px, "+(($(target).height()<=$(target).parent().height())?(0):($(target).parent().height()-$(target).height()))+"px) translateZ(0px);")
				var topDelayTwo=setTimeout(function(){
					lock=false;
					},200)
				},200);
			}	
		$(target).on("touchstart",function(e){
			oldX=e.originalEvent.touches[0].clientX;
			oldY=e.originalEvent.touches[0].clientY;
			});
		$(target).on("touchmove",function(e){
			if(!lock){
				offsetX=x+(e.originalEvent.touches[0].clientX-oldX);
			offsetY=y+(e.originalEvent.touches[0].clientY-oldY);
			console.log(offsetY)
			if(offsetY>0){
				topEnd();
				}else if(((offsetY-$(target).parent().height())<=(-$(target).height()))||($(target).height()<=$(target).parent().height())){
					downEnd();
					}else{
						move();
						}
				}
			});
		$(target).on("touchend",function(e){
			if(!lock){
				x+=offsetX;
			y+=offsetY;
				}
			});
		};
	})();