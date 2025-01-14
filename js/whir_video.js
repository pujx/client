// JavaScript Document
var video={
	//slick
	//鍏堝垽鏂瘡涓槸鍚﹀瓨鍦ㄨ棰�
	hasvideo:function(v){
		$(v).find("li").each(function(){
			var e=$(this).find("video").length
			if(e>=1){
				$(this).addClass("has-video");
			}
		});
    },
	//娣诲姞slick鎻掍欢鍒囨崲
	slick_js:function(a){
		a.slick({speed: 1000,autoplaySpeed: 4000,arrows:false,dots:true,autoplay: true,fade: true});
	},
	//绉诲姩绔笉甯﹁棰�
	//a锛氫富浣�    b锛�0涓虹Щ鍔ㄧ鍒犻櫎瑙嗛锛屽～鍐�0浠ュ鏁板瓧 鏆傛椂琛ㄧず绉诲姩绔笉鍒犻櫎瑙嗛
	slick_one:function(a,b){
		video.hasvideo(a);
		if(b==0){
		//鍒锋柊绉诲姩绔幓鎺夎棰�
		 if($(window).width()<1024){
			$(a).find(".has-video video").remove()
		  }
			}
		//娣诲姞slick鎻掍欢鍒囨崲
		var main=$(a).find(".slider")
		video.slick_js(main);
		//鍒濆(瑙ｅ喅濡傛灉绗竴浣嶄负瑙嗛涓嶈兘鎾斁瀹屾墠鍒囨崲)
		if($(a).find(".slider").find("li").eq(0).hasClass("has-video")){
				   var id=$(a).find(".slider").find("li").eq(0).find("video").attr("id")
			       var fvideo=document.getElementById(id)
				   fvideo.play();
				  main.slick("slickPause");
				   fvideo.addEventListener("ended",function(){
					 main.slick("slickNext");
				   });
		}
		//鍒囨崲杩囩▼
		main.on('afterChange', function(event, slick, currentSlide, nextSlide){
		if($(window).width()>1025){
			var vm=$(a).find("li.slick-slide")
            if(vm.find("video").length>=1){
                vm.find("video")[0].pause()
			    main.slick("slickPlay");
            }
               if(vm.eq(currentSlide).hasClass("has-video")){
				   var numID=vm.eq(currentSlide).find("video").attr("id")
				   console.log(numID)
				   var myvideo=document.getElementById(numID)
				   myvideo.play();
				  main.slick("slickPause");
				   myvideo.addEventListener("ended",function(){
					 main.slick("slickNext");
				   });
			   }
			   }
       });
		//end
	},
	//绉诲姩绔甫涓婅棰� 闇€鐐瑰嚮鎾斁 涓嶈嚜鍔ㄦ挱鏀�
	slick_two:function(a){
		//鍏堟墽琛岀涓€鏂规硶
		video.slick_one(a);
		//鍒嗗埆鍑篜C绔窡绉诲姩绔� video 鏍囩
		$(function ($) {
			$(window).on("resize", function (e) {

				   var main=$(a).find(".slider")
					main.find("li.has-video").each(function(){
						var files=$(this).find("video").attr("src")
						var vid=$(this).find("video").attr("id")
						var pc="<video src="+files+" muted autoplay  id="+vid+">"
						var wap="<video id="+vid+" src="+files+"   preload='auto' controls='' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' webkit-playsinline='true' playsinline='true'></video><a class='open-video'></a>"
					   if($(window).width()<=1024){
							main.slick("slickPlay");//pc鍝嶅簲鍒扮Щ鍔ㄧ 闇€寮€濮嬫挱鏀� 鍥犱负PC瑙嗛姝ｅ湪鎾斁灏卞凡缁忓惂鍒囨崲鏆傚仠浜�
							$(".open-video").remove();
						   $(this).append(wap);
							$(this).find("video").eq(0).remove();
						   //鐢熸垚瑙嗛璺熸寜閽箣鍚�
						   //鐐瑰嚮鎾斁
						   $(".open-video").click(function(){
							   $(this).parent("li").addClass("video-show");
							   var video=$(this).parent().find("video")[0]
							    video.play();
				                main.slick("slickPause");
						       video.addEventListener("ended",function(){
								    main.slick("slickNext");
							      $(this).parent("li").removeClass("video-show");
							   });
							   //鍒ゆ柇鐒︾偣鎸夐挳鍒囨崲 鏆傚仠瑙嗛 (姝ゅ垽鏂彲鑳戒笉闇€瑕� 鍥犱负鍦ㄥ井淇℃墦寮€椤甸潰 瑙嗛閮藉叏灞忔樉绀烘挱鏀� 瑕佸叧闂墠鑳藉幓鐒︾偣鍙婃寜閽垏鎹�)
							   main.on('afterChange', function(event, slick, currentSlide, nextSlide){
								    main.find("li").eq(currentSlide-1).removeClass("video-show");
								    video.pause();
							          main.slick("slickNext");
							   });
						   });
						   //鐐瑰嚮鎾斁 END
						   
						}else{
							$(".open-video").remove();
						   $(this).append(pc);
							$(this).find("video").eq(0).remove();
						}				
					});

			}).trigger("resize");
		});
		//end
	},
	//瑙嗛鐩存帴寰幆鎾斁  绉诲姩绔繚鐣欑偣鍑诲啀鎾斁
	slick_three:function(a,b){
		video.hasvideo(a);
		if(b==0){
		//鍒锋柊绉诲姩绔幓鎺夎棰�
		 if($(window).width()<1024){
			$(a).find(".has-video").remove()
		  }
			}
		video.slick_js($(a).find(".slider"));
		//绉诲姩绔棰戜笉寰幆 闇€鐐瑰嚮鎾斁 鎾斁鏃朵笉鍋滄鍒囨崲
		$(function ($) {
			$(window).on("resize", function (e) {
				   var main=$(a).find(".slider")
					main.find("li.has-video").each(function(){
						var files=$(this).find("video").attr("src")
						var vid=$(this).find("video").attr("id")
						var pc="<video src="+files+" muted autoplay loop  id="+vid+">"
						var wap="<video id="+vid+" src="+files+"   preload='auto' controls='' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' webkit-playsinline='true' playsinline='true'></video><a class='open-video'></a>"
				   if($(window).width()<=1024){
							$(".open-video").remove();
						   $(this).append(wap);
							$(this).find("video").eq(0).remove();
						   //鐐瑰嚮鎾斁
						   $(".open-video").click(function(){
							   $(this).parent("li").addClass("video-show");
							   var video=$(this).parent().find("video")[0]
							    video.play();
						       video.addEventListener("ended",function(){
							      $(this).parent("li").removeClass("video-show");
							   });
						 }); 
						   //鐐瑰嚮鎾斁 END
				   }else{
							$(".open-video").remove();
						   $(this).append(pc);
							$(this).find("video").eq(0).remove();
						}	
			   });
			}).trigger("resize");
		});		 
		//end
	},
	//涓嶈嚜鍔ㄦ挱鏀� 鐐瑰嚮鎾斁 鏈夊０闊�  鏆傚仠鍒囨崲 鎾斁瀹岀户缁垏鎹�
	slick_four:function(a){
		video.hasvideo(a);
		var main=$(a).find(".slider")
		main.find("li").each(function(){
		if($(this).hasClass("has-video")){
			$(this).append("<a class='open-video'></a>")
	   //鐐瑰嚮鎾斁
	   	$(this).find(".open-video").click(function(){
		   $(this).parent("li").addClass("video-show");
		   var video=$(this).parent().find("video")[0]
			video.play();
			main.slick("slickPause");
		   video.addEventListener("ended",function(){
			   main.slick("slickNext");
			  $(this).parent("li").removeClass("video-show");
		   });
	   });
	   //鐐瑰嚮鎾斁 END
		}			
		});
		video.slick_js(main);
		   //鍒ゆ柇鐒︾偣鎸夐挳鍒囨崲 鏆傚仠瑙嗛 
		   main.on('afterChange', function(event, slick, currentSlide, nextSlide){
				main.find("li").removeClass("video-show");
				main.find("li").find("video")[0].pause();
				 main.slick("slickPlay");
		   });
	},
	//鐐瑰嚮寮圭獥鎾斁瑙嗛
	slick_five:function(a,b){
		var main=$(a).find(".slider")
		main.find("li").each(function(){
			var files=$(this).attr("data-video")
			//console.log(b)
			if(files!=''&&files!=b){
				$(this).append("<a class='open-video'></a>");
				//鐐瑰嚮鎾斁
				  $(".open-video").click(function(){
					  var video=$(this).parent().attr("data-video");
					  $("body").append("<div class='video-openbox'><a class='close'></a><div class='ytable'><div class='ytable-cell'><video controls autoplay width='100%' src='"+video+"'></video></div></div></div>");
					  $(".video-openbox .close").click(function(){
						  $(".video-openbox").remove();
					  });
				  });
				//鐐瑰嚮鎾斁 end
			}
		});
		video.slick_js(main);
	}
}