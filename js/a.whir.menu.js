(function ($, plugin) {
	var data = {}, id = 1, etid = plugin + 'ETID';
	$.fn[plugin] = function (speed, group) {
		id ++;	
		group = group || this.data(etid) || id;
		speed = speed || 200;
		if (group === id) this.data(etid, group);
		this._hover = this.hover;
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
	$.fn[plugin + 'Pause'] = function () {
		clearTimeout(this.data(etid));
		return this;
	};
	$[plugin] = {
		get: function () {
			return id ++;
		},
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
	//$(".header-menu li").each(function(index) {
//     	$(this).attr("id", "m" + index);
//	});
    $("#m"+m).addClass("aon");
	open_menu()
});

function open_menu() {
	$("#open_menu").click(function(e) {
		if ($(this).hasClass("open_menu_on")) {
			$(this).removeClass("open_menu_on")
			$("#header-menu").removeClass("header-menu-show");
		} else {
			$(this).addClass("open_menu_on")
			$("#header-menu").addClass("header-menu-show");
		}
	});
	}
function menu() {
	var window_width = $(window).width();
	var a = $(".header-menu")
	var b = a.find("ul")
	var c = b.find("li")
	var m_total_width = b.width();
	var m_num = c.length
	var m_li_width = m_total_width / m_num
	c.width(100 / m_num + "%");
	$(".header-menu li").each(function(index) {
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

			var x = $(this)
			var y = x.find(".sub")
			var z = y.find(".sub-menu")
			var r = z.find("dl")

			if (a.hasClass("no-fullbground")) {
				x.addClass("relative");
				$("body").css("overflow-x", "hidden"); 
				y.width(window_width);
			}
			if (a.hasClass("sub-horizontal")) {
				var r_width = r.width() 
				var r_height = r.height() 
				rigth_side = window_width - x.position().left - ((window_width - $(".header").width()) / 2)
				left_side = x.position().left - ((window_width - $(".header").width()) / 2) + x.width()
				//alert(rigth_side)

				if (m_num - x.index() <= 3) {
					if (r_width > rigth_side) { 
						y.addClass("sub-right");
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
			if (a.hasClass("fullbground")) {
				y.show().width($(".header").width());
				var halfw=(window_width - $(".header").outerWidth()) / 2 
			    leftw = r.width() / 2 - (x.outerWidth() / 2)
				left_side = x.position().left - halfw
				rigth_side = window_width - x.position().left - halfw - x.outerWidth()
				aa=window_width-$(".header-menu").position().left-$(".header-menu").width()
			    bb=window_width-x.position().left-halfw-x.outerWidth()
				
				cc=x.position().left
				dd=cc-halfw
						if (leftw > left_side) {
							y.css({"left": -left_side});
							} else {
							y.css({"left": -leftw});
						}
				if(aa==halfw){
					
					if(leftw> rigth_side) {
						y.css({"left": "auto","right":-bb});
					}else{
						if (leftw > left_side) {
							y.css({"left": -left_side});
							} else {
							y.css({"left": -leftw});
						}
						}
					
					}else{
						
					/**/				
					if (m_num - x.index() <= 3) {
					if (leftw > rigth_side) {
						if (bb==0) { 
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

               // alert(r.width())
				y.width(r.width()+1);
				//
				x.addClass("relative");
				x.hover(function() {
					var e=$(this).index()
					//$(".sub-menu-layer"+e).height(y.outerHeight());
					$(".sub-menu-layer"+e).stop(true,true).slideDown(300);                   
                },function(){
					var e=$(this).index()
					$(".sub-menu-layer"+e).stop(true,true).slideUp(300);
					});
			}
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

	$(".header-menu .has-sub").each(function() {

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

		$(this).find(".sub").find(".sub-menu").find("dl").find("dt").each(function() {
			var n = $(this).find("dl").find("dt").length
			if (n >= 1) {
				$(this).find("i").remove();
				$(this).addClass("sub-has-sub").append("<i></i>");
			}
		});

	});
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