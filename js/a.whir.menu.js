(function ($, plugin) {
	var data = {}, id = 1, etid = plugin + 'ETID';
	// 寤舵椂鏋勯€犲櫒
	$.fn[plugin] = function (speed, group) {
		id ++;	
		group = group || this.data(etid) || id;
		speed = speed || 200;
		
		// 缂撳瓨鍒嗙粍鍚嶇О鍒板厓绱�
		if (group === id) this.data(etid, group);
		
		// 鏆傚瓨瀹樻柟鐨刪over鏂规硶
		this._hover = this.hover;
		
		// 浼涓€涓猦over鍑芥暟锛屽苟鎴幏涓や釜鍥炶皟鍑芥暟浜ょ粰鐪熸鐨刪over鍑芥暟澶勭悊
		this.hover = function (over, out) {
			over = over || $.noop;
			out = out || $.noop;
			this._hover(function (event) {
				var elem = this;
				clearTimeout(data[group]);
				data[group] = setTimeout(function () {
					over.call(elem, event);
				}, speed);
			}, function (event) {
				var elem = this;
				clearTimeout(data[group]);
				data[group] = setTimeout(function () {
					out.call(elem, event);
				}, speed);
			});
			
			return this;
		};
		
		return this;
	};
	// 鍐荤粨閫夊畾鍏冪礌鐨勫欢鏃跺櫒
	$.fn[plugin + 'Pause'] = function () {
		clearTimeout(this.data(etid));
		return this;
	};
	// 闈欐€佹柟娉�
	$[plugin] = {
		// 鑾峰彇涓€涓敮涓€鍒嗙粍鍚嶇О
		get: function () {
			return id ++;
		},
		// 鍐荤粨鎸囧畾鍒嗙粍鐨勫欢鏃跺櫒
		pause: function (group) {
			clearTimeout(data[group]);
		}
	};
})(jQuery, 'mouseDelay');
//by 20181015
 $(function ($) {
	$(window).on("resize", function (e) {
	if ($(window).width() >= 1025) {
		$("#header-menu").remove();
			menu()
		}else{
			menuMoblie()
			}           
	}).trigger("resize");
		//閫変腑
	//$(".header-menu li").each(function(index) {
//     	$(this).attr("id", "m" + index);
//	});
    $("#m"+m).addClass("aon");
	open_menu()
});

function open_menu() {
	//绉诲姩绔墦寮€鑿滃崟瀵艰埅
	$("#open_menu").click(function(e) {
		if ($(this).hasClass("open_menu_on")) {
			$(this).removeClass("open_menu_on")
			$("#header-menu").removeClass("header-menu-show");
		} else {
			$(this).addClass("open_menu_on")
			$("#header-menu").addClass("header-menu-show");
		}
	});
	//绉诲姩绔墦寮€鑿滃崟瀵艰埅 end	
	}
function menu() {
	var window_width = $(window).width();
	var a = $(".header-menu")
	var b = a.find("ul")
	var c = b.find("li")
	//瀵艰埅鎬诲搴�	
	var m_total_width = b.width();
	//鏍忕洰鎬绘暟
	var m_num = c.length
	//鏍忕洰瀹藉害px
	var m_li_width = m_total_width / m_num
	//鏍忕洰瀹藉害%
	c.width(100 / m_num + "%");
	//鍒ゆ柇鏄惁鏈変笅鎷� 鍔犱笂鏍峰紡has-sub
	$(".header-menu li").each(function(index) {
		//榧犳爣缁忚繃涓€绾ф爮鐩晥鏋�
			$(this).bind("mouseover",function(e) {
			$(this).addClass("hover aon");
			$(this).siblings().removeClass("aon");
		});
		$(this).bind("mouseleave",function(e) {
			$(this).removeClass("hover aon");
			$("#m"+m).addClass("aon");
		});
		//
		var sub_num = $(this).find(".sub").length
		if (sub_num > 0) {
			$(this).addClass("has-sub");
			//涓嶅悓鐜鍒ゆ柇

			var x = $(this)
			var y = x.find(".sub")
			var z = y.find(".sub-menu")
			var r = z.find("dl")

			//涓嬫媺鑳屾櫙涓嶅叏
			if (a.hasClass("no-fullbground")) {
				x.addClass("relative"); //鐩稿li瀹氫綅
				$("body").css("overflow-x", "hidden"); //闃叉婊氬姩鏉″嚭鐜�
				y.width(window_width);
			}
			//妯悜
			if (a.hasClass("sub-horizontal")) {
				var r_width = r.width() //浜岀骇瀵艰埅鍚勮嚜瀹藉害
				var r_height = r.height() //浜岀骇瀵艰埅鍚勮嚜楂樺害
				rigth_side = window_width - x.position().left - ((window_width - $(".header").width()) / 2)
				left_side = x.position().left - ((window_width - $(".header").width()) / 2) + x.width()
				//alert(rigth_side)

				if (m_num - x.index() <= 3) {
					if (r_width > rigth_side) { //浜岀骇瀵艰埅鎬诲搴︽瘮瀵艰埅鍙充晶瀹藉害澶х殑鏃跺€�
						y.addClass("sub-right");
						//鍒ゆ柇鍙充晶瀹藉害澶ぇ鍔犱笂瀹藉害
					//	if (r_width > left_side) {
							r.width(left_side).height(r_height)
						//	y.addClass("sub-right-txt-r");
						//}
						//
					} else {
						y.addClass("sub-left");
					}
				} else {
					y.addClass("sub-left");
					r.width(rigth_side).height(r_height)
				}
				//
			}
			//妯悜End
			//涓嬫媺鑳屾櫙涓嶅叏END

			//涓嬫媺鍏ㄨ儗鏅�
			if (a.hasClass("fullbground")) {
				y.show().width($(".header").width());
				//alert(r.width())
				var halfw=(window_width - $(".header").outerWidth()) / 2 
			    leftw = r.width() / 2 - (x.outerWidth() / 2)
				left_side = x.position().left - halfw
				rigth_side = window_width - x.position().left - halfw - x.outerWidth()
				aa=window_width-$(".header-menu").position().left-$(".header-menu").width()//鍒ゆ柇瀵艰埅鍙宠竟璺濈鏄惁绛変簬宸﹀彸璺濈锛堢瓑浜庡彸杈规湁鏃犲叾浠栨ā鍧楁尅鐫€锛�
			    bb=window_width-x.position().left-halfw-x.outerWidth()//褰撳墠LI鍦ㄥ唴瀹�$(".header-menu")鍙宠竟璺濈
				
				cc=x.position().left//褰撳墠LI鍦ㄥ唴瀹�$(".header-menu")宸﹁竟璺濈
				dd=cc-halfw
					  //宸﹁竟
						if (leftw > left_side) {
							y.css({"left": -left_side});
							} else {
							y.css({"left": -leftw});
						}
					  //宸﹁竟 end				

				//鍙宠竟
				if(aa==halfw){
					
					if(leftw> rigth_side) {
						y.css({"left": "auto","right":-bb});
					}else{
					  //宸﹁竟
						if (leftw > left_side) {
							y.css({"left": -left_side});
							} else {
							y.css({"left": -leftw});
						}
					  //宸﹁竟 end
						}
					
					}else{
						
					/**/				
					if (m_num - x.index() <= 3) {
					if (leftw > rigth_side) {
						if (bb==0) { //瀵艰埅鑿滃崟鍙宠竟娌℃湁妯″潡
							y.css({"left": "auto","right": -(rigth_side-halfw)});
						}else{
						y.css({"left": "auto","right": -rigth_side});
							}
					} else {
						y.css({
							"left": -leftw
						});
					}
				}
				/**/
						
				}

				//鍙宠竟 end

               // alert(r.width())
				y.width(r.width()+1);
				//
				x.addClass("relative"); //鐩稿li瀹氫綅
				x.hover(function() {
					var e=$(this).index()
					//$(".sub-menu-layer"+e).height(y.outerHeight());
					$(".sub-menu-layer"+e).stop(true,true).slideDown(300);                   
                },function(){
					var e=$(this).index()
					$(".sub-menu-layer"+e).stop(true,true).slideUp(300);
					});
			}
			//涓嬫媺鍏ㄨ儗鏅疎ND

			//涓嶅悓鐜鍒ゆ柇End
		}
	});
	
	if (a.hasClass("fullbground")) {
		
		$(".sub-menu-layer").remove();
		var strs=$(".header-menu li")
		for (var i = 0; i < strs.length; i++) {
			a.append("<div class='sub-menu-layer sub-menu-layer"+[i]+"'></div>");	
            }
			
                $(".header-menu li").each(function(){
                    var e=$(this).index()
                    var yh=$(this).find(".sub").outerHeight();

                    $(".sub-menu-layer"+e).height(yh);
                });
		 
		}
	//涓嬫媺鑿滃崟鏄剧ず

	$(".header-menu .has-sub").each(function() {

		//涓嬫媺绔栧悜鍥炬枃 
		if (a.hasClass("sub-vertical")) {
            var s_halfw=(window_width - $(".header").outerWidth()) / 2
			var sub_width = $(this).find(".sub").outerWidth()
			var leftw = window_width - $(this).position().left - s_halfw
			//alert(leftw)*2
			if (sub_width > leftw) {
				$(this).find(".sub").addClass("sub-position-right");
			}
			var n = $(this).find(".sub-menu").attr("data-level");
			if (n > 0) {
				var sub_width_n = $(this).find(".sub").outerWidth() * n
				if (sub_width_n > leftw) {
					$(this).find(".sub").addClass("sub-position-right");
				}
			}

		}
		//涓嬫媺绔栧悜鍥炬枃 End	
		//澶氱骇
		$(this).find(".sub").find(".sub-menu").find("dl").find("dt").each(function() {
			var n = $(this).find("dl").find("dt").length
			if (n >= 1) {
				//$(this).find("i").remove();
				$(this).addClass("sub-has-sub") //.append("<i></i>");
			}
		});

		$(".header-menu .sub-has-sub").hover(function() {
			$(this).children("dl:first").show();
			$(this).addClass("aon");
			$(this).siblings().removeClass("aon");
		}, function() {
			$(this).children("dl:first").hide();
			$(this).removeClass("aon");
		});
		
		/////////////////涓€绾�
		//$(this).find(".sub").height("auto"); 

		var subh=$(this).find(".sub").outerHeight()
		$(this).find(".sub").css({"top":-subh});
		$(this).find(".sub").hide();
		//$(this).find(".sub").height(0);

		$(this).mouseDelay(false).hover(function(e) {
			$(this).find(".sub").css({"top":"100%"}).slideDown(300);
		},function(){
			$(this).find(".sub").css({"top":-subh}).slideUp(300);
		});
		
		//end	
	});
}

	//涓嬫媺鑿滃崟鏄剧ずEnd		

function menuMoblie() {
	var html = $(".header-menu").html()
	$("#header-menu").remove();
	$(".header-menu").before("<div id='header-menu'>" + html + "</div>");
	$("#open_menu").removeClass("open_menu_on")

	$("#header-menu li").each(function() {
		$(this).attr("style", " ").removeClass("relative");
		$(this).find(".sub").attr("style", " ");
		$(this).find(".sub dl").attr("style", " ");

		var sub_num = $(this).find(".sub-menu").find("dt").length
		if (sub_num > 0) {
			$(this).addClass("has-sub");
			$(this).find("em").append("<i class='op'></i>");
		}

		//澶氱骇
		$(this).find(".sub").find(".sub-menu").find("dl").find("dt").each(function() {
			var n = $(this).find("dl").find("dt").length
			if (n >= 1) {
				$(this).find("i").remove();
				$(this).addClass("sub-has-sub").append("<i></i>");
			}
		});

	});
	//涓€绾ц彍鍗�	
	$("#header-menu .has-sub em").bind("click", function() {
		if ($(this).parent().hasClass("clickon")) {
			$(this).parent().removeClass("clickon");
			$(this).next(".sub").stop(true, true).slideUp();
		} else {
			$(this).parent().addClass("clickon");
			$(this).next(".sub").stop(true, true).slideDown();
			$(this).parent().siblings().find(".sub").stop(true, true).slideUp();
			$(this).parent().siblings().removeClass("clickon");
		}
	});

	//澶氱骇鑿滃崟
	$("#header-menu .sub-has-sub i").bind("click", function() {
		if ($(this).parent().hasClass("clickon")) {
			$(this).parent().removeClass("clickon");
			$(this).parent().children("dl:first").stop(true, true).slideUp();
		} else {
			$(this).parent().addClass("clickon");
			$(this).parent().children("dl:first").stop(true, true).slideDown();
		}
	});

}