;(function($){
    $.fn.jqSearch = function (options) {	
        var defaults = {
            TxtVal: "11111",
            KeyTxt1: "2222",
            KeyTxt2: "3333",
            KeyTxt3: "4444",
            KeyId: "topkey",
            KeyUrl: "#",
            OtherUrl: "",
            OtherParams: "",
            OtherTxtVal: "55555",
            KeyHref: "key",
            Static: false
        };
        var opts = $.extend(defaults, options);
    
        return this.each(function () {
            _this = $(this);
            if ($("#" + opts.KeyId).val() == "") {
                $("#" + opts.KeyId).val(opts.TxtVal);
            }
            $("#" + opts.KeyId).focus(function () {
                _this.addClass("focus");
                $(this).addClass("focus");
                if ($(this).val() == opts.TxtVal) {
                    $(this).val("");
                }
            });
            $("#" + opts.KeyId).blur(function () {
                _this.removeClass("focus");
                $(this).removeClass("focus");
                if ($(this).val() == "") {
                    $(this).val(opts.TxtVal);
                }
            });
            function GoSearchUrl() {
                var searchinput = document.getElementById(opts.KeyId);
                var isNull = true;
                var Staticlinks = opts.KeyUrl;
                if (typeof (opts.OtherParams) == "function") {
                    var params = opts.OtherParams();
                    for (var property in params) {
                        isNull = false;
                        if (opts.Static) {
                            Staticurl += "_" + property + "_" + params[property];
                        } else {
                            if (opts.OtherUrl != "") {
                                opts.OtherUrl = appendUrlParmFun(opts.OtherUrl, property, params[property]);
                            } else {
                                opts.KeyUrl = appendUrlParmFun(opts.KeyUrl, property, params[property]);
                            }
                        }
                    }
                }
                if (typeof (opts.OtherParams) == "function" && isNull && (searchinput.value == "" || searchinput.value == opts.TxtVal)) {
                    alert(opts.OtherTxtVal);
                    return false;
                }
                if (!isNull && opts.OtherUrl != "") {
                    window.location = opts.OtherUrl;
                    return false;
                }
                if (isNull && (searchinput.value == "" || searchinput.value == opts.TxtVal)) {
                    alert(opts.KeyTxt1);
                    searchinput.focus();
                    return false;
                }
                if (isNull && (searchinput.value == "" || searchinput.value == opts.TxtVal)) {
                    alert(opts.KeyTxt1);
                    searchinput.focus();
                    return false;
                }
                if (searchinput.value.length > 50) {
                    alert(opts.KeyTxt2);
                    searchinput.focus();
                    return false;
                }
                //var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~锛丂#锟モ€︹€�&*锛堬級鈥攟{}銆愩€戔€橈紱锛氣€濃€�'銆傦紝銆侊紵]");
                //if (pattern.test(searchinput.value)) {
                //    alert(opts.KeyTxt3);
                //    searchinput.focus();
                //    return false;
                //}
                if (!(searchinput.value == "" || searchinput.value == opts.TxtVal)) {
                    if (opts.Static) {
                        Staticlinks = opts.KeyUrl;
                        Staticurl = "_" + opts.KeyHref + "_" + searchinput.value + ".html"
                        Staticlinks = Staticlinks.replace(".html", Staticurl);
                        window.location = Staticlinks;
                    } else {
                        if (opts.KeyUrl.indexOf("?") == -1) {
                            window.location = opts.KeyUrl + "?" + opts.KeyHref + "=" + escape(searchinput.value);
    
                        } else {
                            window.location = opts.KeyUrl + "&" + opts.KeyHref + "=" + escape(searchinput.value);
                        }
                    }
                } else {
                    if (opts.Static) {
                        window.location = Staticlinks;
                    }
                    else {
                        window.location = opts.KeyUrl;
                    }
                }
    
                return true;
            }
    
            function entersearch() {
                var event = window.event || arguments.callee.caller.arguments[0];
                if (event.keyCode == 13) {
                    GoSearchUrl();
                }
            }
    
            function checkComments() {
                var event = window.event || arguments.callee.caller.arguments[0];
                if ((event.keyCode > 32 && event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97)) {
                    event.returnValue = false;
                }
            }
    
            function stripscript(s) {
                var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~]");
                var rs = "";
                for (var i = 0; i < s.length; i++) {
                    rs = rs + s.substr(i, 1).replace(pattern, '');
                }
                return rs;
            }
    
            function appendUrlParmFun(url, key, value) {
                var arrayParams = url.split("?");
                var result = arrayParams[0] + "?";
                if (url.indexOf("?") > 0) {
                    var parms = arrayParams[1].split("&");
                    var exsit = false;
                    for (var i = 0; i < parms.length; i++) {
                        var param = parms[i].split("=");
                        if (param[0] == key) {
                            exsit = true;
                            result += param[0] + "=" + value + "&";
                            result += param[0] + "=" + param[1] + "&"; 
                        }
                    }
                    if (exsit == false) {
                        result += key + "=" + value + "&"; 
                    }
    
                } else {
                    result += key + "=" + value;
                }
                result = result.substring(result.length - 1, result.length) == "&" ? result.substring(0, result.length - 1) : result;
                return result;
            }
    
            _this.click(function () {
                GoSearchUrl()
            });
    
            $("#" + opts.KeyId).keydown(function () {
                entersearch()
            });
        })
    }
    })(jQuery);