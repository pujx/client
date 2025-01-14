var Bottom002887={
    main:function(){
        $(function ($) {
          $(window).on("resize", function (e) {
               Bottom002887.aw(".Bottom002887 .b_nav nav",".item"); //绛夐棿璺�
          }).trigger("resize");
      });
      //绉诲姩绔彍鍗�
        if($(window).width()<=640){
            Bottom002887.wap();
        }
    },
    aw:function(v,a){
      var sumWidth =0;
      var _this=$(v)
        var navW=_this.width()
      _this.find(a).each(function(){
           sumWidth += $(this).width()
      });
        _this.find(a).removeAttr("style");
        if($(window).width()>1024){
            var n=_this.find(a).length
            var mr=(navW-sumWidth)/n
           _this.find(a).css("margin-right",mr);
        }
        else{
            var n=_this.find(a).length-1
            var mr=(navW-sumWidth)/n
            _this.find(a).not(":last-child").css("margin-right",mr);
        }
      },
    wap:function(){
        $(".Bottom002887 .b_nav nav .item").each(function(){
            var n=$(this).find("dl").find("dd").length
            if(n>=1){
                $(this).find(".tit").append("<i></i>");
                var op=$(this).find(".tit").find("i")
                var item=$(this).find("dl")
                op.click(function(){
                    $(this).toggleClass("on");
                    item.slideToggle();
                })
            }
        })
    }
}