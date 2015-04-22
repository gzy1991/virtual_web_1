(function(lan) {
    var localization = { "zh-cn": {
        "设为首页_错误提示": "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可",
        "加入收藏_错误提示": "加入收藏失败，请使用ctrl+d进行添加"
    }
    };
    function addfavorite(url, title) {
        try {
            window.external.addfavorite(url, title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            }
            catch (e) {
                alert(localization[lan]["加入收藏_错误提示"]);
            }
        }
    }
    function sethome(vrl) {
        try {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(vrl);
        }
        catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert(localization[lan]["设为首页_错误提示"]);
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', vrl);
            }
        }
    }
    $("#header_set_sethome").click(function() {
        return sethome(location.href);
    });
    $("#header_set_addfavorite").click(function() {
        return addfavorite(location.href, $("title").text());
    });


    $(document).ready(function() {
        showErrors();
    });

    function pngs(es) {
        for (i = 0; i < es.length; i++) {
            png(es[i]);
        }
    }

    function png(bgElements) {
        if (bgElements.currentStyle.backgroundImage.lastIndexOf(".png") != -1) {     //alert(bgElements[i]);     
            var img = bgElements.currentStyle.backgroundImage.substring(5, bgElements.currentStyle.backgroundImage.length - 2);
            bgElements.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img + "', sizingMethod='crop')";
            bgElements.style.backgroundImage = "url(spacer.gif)";
        }
    }

    function correctPNG(es) {
        for (var i = 0; i < es.length; i++) {
            var img = es[i];
            var imgName = img.src.toUpperCase();

            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {

                var imgID = (img.id) ? "id='" + img.id + "' " : "";
                var imgClass = (img.className) ? "class='" + img.className + "' " : "";
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
                var imgStyle = "display:inline-block;" + img.style.cssText;
                if (img.align == "left") imgStyle = "float:left;" + imgStyle;
                if (img.align == "right") imgStyle = "float:right;" + imgStyle;
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;

                var strNewHTML = "<span " + imgID + imgClass + imgTitle + "style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src='" + img.src + "', sizingMethod='scale');\"></span>";

                img.outerHTML = strNewHTML;

                i = i - 1;
            }
        }
    };
    setTimeout(function() {
        $(".valign").not(".imageautoresizefull,.imageautoresizefilled,.imageautoresizefixed").imageautoresize();

        $(".valign").valign();
        $("#group .imageautoresizefull").each(function() {
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
            var pw = parent.width();
            var newWidth = width;
            var newHeight = height;
            if (pw < width) {
                newWidth = pw;
                newHeight = newWidth * height / width;

            } else {
                newWidth = width;
                $(this).parents("a").click(function() {
                    return false;
                });
            }
            $(this).css({ width: newWidth, height: newHeight, "margin-top": 0 });
            parent.height(newHeight);
        });

        if ($.browser.msie && $.browser.version == "6.0") {
            correctPNG(document.getElementsByTagName("img"));
            if (typeof (DD_belatedPNG) != "undefined") {
                DD_belatedPNG.fix('.content_title,.content_title span,.title,.title_inner,.title_content,.font,#logo,background,#nav_ul li,#nav,#nav_inner,#search_text .text,#search_button a,#header #header_center,#content_content,.content_more,#list ul li,#footer,.btleft,.btright,#banner_bg,#header #search #search_text,#list .danpianwenzhang_91_class .title .title_content,#index .article3 .content,#index .news .content,#banner #bannerbg');

                //解决 a:hover span不好使的问题
                $("#nav a").hover(function() {
                    var e = this;
                    setTimeout(function() {
                        DD_belatedPNG.fixPng(e);
                        try {
                            DD_belatedPNG.applyVML($(e).find("span")[0]);

                        } catch (err) {
                            DD_belatedPNG.fixPng($(e).find("span")[0]);
                        }
                    }, 1);

                }, function() {
                    var e = this;
                    setTimeout(function() {
                        try {
                            DD_belatedPNG.fixPng(e);
                            DD_belatedPNG.applyVML($(e).find("span")[0]);
                        } catch (err)
					{ }
                    }, 1);
                });
            }
            pngs($("#nav a"));

        };
    }, 0);

    /*对页面进行javascript检查*/
    function showErrors() {
        /*判断当导航宽度大幅小于页面宽度的时候，必须将导航放到head_center中*/
        /*导航是否小于标准宽度*/
        var isNavLess = $(".width").width() - $("#nav").width() > 100;
        var isNavInHead = $("#header_center #nav").length > 0;
        if (isNavLess && !isNavInHead)
            alert("短导航并未放置到head_center中，请检查布局配置文件");
    }

    /*二级导航代码*/
    $("#nav_ul > li").hover(function() {
        $(this).children(".subnav").show();
    }, function() {
        $(this).children(".subnav").hide();
    });

})(window.lan);