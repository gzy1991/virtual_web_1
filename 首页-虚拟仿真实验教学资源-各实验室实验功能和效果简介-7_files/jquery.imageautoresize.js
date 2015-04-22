/*
* jquery.valign.js 0.1
* Copyright (c) 2011 shareyue  http://www.shareyue.com/
* Date: 2011-04-01
* 实现div布局当中的垂直居中，以简化html代码
*/
(function($) {
    $.fn.imageautoresize = function(options) {
        var defaults = {
            //type: "center"
            type: "full"// "full" 完整显示, "filled" 填满，"fixed"和框一样大小 
        };
        var options = $.extend(defaults, options);
        var operate = {};
        operate["full"] = function(parent, width, height) {
            var newWidth = width;
            var newHeight = height;
            if (width / height > parent.width() / parent.height()) {
                if (parent.width() < width) {
                    newWidth = parent.width();
                    newHeight = newWidth * height / width;
                }
            } else {
                if (parent.height() < height) {
                    newHeight = parent.height();
                    newWidth = newHeight * width / height;
                }
            }
            return { width: newWidth, height: newHeight };
        };
        operate["filled"] = function(parent, width, height) {
            var newWidth = width;
            var newHeight = height;
            var result = {};
            var pw = parent.width();
            var ph = parent.height();
            if (width > pw || height > ph) {
                newWidth = pw;
                newHeight = newWidth * height / width;
                if (newHeight < ph) {
                    newHeight = ph;
                    newWidth = newHeight * width / height;
                    result["margin-left"] = (pw - newWidth) / 2;
                } else if (ph < newHeight) {
                    result["margin-top"] = (ph - newHeight) / 2;
                }
            }
            result["width"] = newWidth;
            result["height"] = newHeight;
            return result;
        };
        operate["fixed"] = function(parent, width, height) {
            return { width: parent.width(), height: parent.height() };
        };

        this.each(function() {
            //获取文件名从_
            var src = $(this).attr("src");
            var startIndex = src.lastIndexOf('_') + 1;
            var endIndex = src.lastIndexOf('.');
            var size = src.substring(startIndex, endIndex);
            var width = parseFloat(size.substring(0, size.indexOf("x")));
            var height = parseFloat(size.substring(size.indexOf("x") + 1));
            if (isNaN(width) || isNaN(height))
                return;
            var parent = $(this).parent();
            var tagName = parent.attr("tagName");
            var display = parent.css("display");
            while (display != "list-item" && display.indexOf("block") < 0) {
                if ($.browser.msie && $.browser.version == "6.0") {
                    if (tagName == "DIV" || tagName == "LI")
                        break;
                }
                parent = parent.parent();
                var tagName = parent.attr("tagName");
                var display = parent.css("display");
            }
            $(this).css(operate[options.type](parent, width, height));
        });
    };
})(jQuery);
$(function() {
$(".imageautoresize").imageautoresize(); //填满
    $(".imageautoresizefull").imageautoresize({ type: "full" }); //完整显示
    $(".imageautoresizefilled").imageautoresize({ type: "filled" }); //填满
    $(".imageautoresizefixed").imageautoresize({ type: "fixed" }); //和框一样大小 
});