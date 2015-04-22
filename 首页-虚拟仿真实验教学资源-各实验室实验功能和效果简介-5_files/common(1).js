function toInt(str) {
    if (isNaN(str))
        return 0;
    else
        return parseInt(str);
}
var offset = 0;
if ($.browser.msie && $.browser.version == "6.0") {
    offset = 0;
}


//设置列表中文本宽度，以使用省略号
$(".font").width(function(index, value) {
    var $this = $(this);
    var result = $this.parent().width();
    result -= toInt($this.css('margin-left').replace('px', ''));
    result -= toInt($this.css('margin-right').replace('px', ''));
    result -= toInt($this.css('padding-left').replace('px', ''));
    result -= toInt($this.css('padding-right').replace('px', ''));
    result += offset;
    if ($this.width() < result)
        return $this.width();
    return result;
});

$("#news .content .font").width(function(index, value) {
    var $this = $(this);
    var result = $this.parent().width()
    result -= toInt($this.css('margin-left').replace('px', ''));
    result -= toInt($this.css('padding-left').replace('px', ''));
    result -= 70;
	result += offset;
    if ($this.width() < result)
        return $this.width();
    return result;
});

$("#news2 .content .font").width(function(index, value) {
    var $this = $(this);
    var result = $this.parent().width()
    result -= toInt($this.css('margin-left').replace('px', ''));
    result -= toInt($this.css('padding-left').replace('px', ''));
    result -= 70;
	result += offset;
    if ($this.width() < result)
        return $this.width();
    return result;
});

$("#job .content .font").width(function(index, value) {
    var $this = $(this);
    var result = $this.parent().width();
    result -= toInt($this.css('margin-left').replace('px', ''));
    result -= toInt($this.css('padding-left').replace('px', ''));
	result += offset;
    if ($this.width() < result)
        return $this.width();
    return result;
});

$("#group").width(function() {
    var width = $("#content_content").width();
	var $this = $(this);
    width -= toInt($("#content_content").css('padding-left').replace('px', ''));
    width -= toInt($("#content_content").css('padding-right').replace('px', ''));
    width -= toInt($("#content_content").css('border-right-width').replace('px', ''));
    width -= toInt($("#content_content").css('border-left-width').replace('px', ''));

    width -= toInt($("#list").width());
    width -= toInt($("#list").css('margin-left').replace('px', ''));
    width -= toInt($("#list").css('margin-right').replace('px', ''));
    width -= toInt($("#list").css('padding-left').replace('px', ''));
    width -= toInt($("#list").css('padding-right').replace('px', ''));
    width -= toInt($("#list").css('border-right-width').replace('px', ''));
    width -= toInt($("#list").css('border-left-width').replace('px', ''));

    width -= toInt($("#group").css('margin-left').replace('px', ''));
    width -= toInt($("#group").css('margin-right').replace('px', ''));
    width -= toInt($("#group").css('padding-left').replace('px', ''));
    width -= toInt($("#group").css('padding-right').replace('px', ''));
    width -= toInt($("#group").css('border-right-width').replace('px', ''));
    width -= toInt($("#group").css('border-left-width').replace('px', ''));
    if ($this.width() < width)
        return $this.width();
    return width;
});


$(".img_content").width($(this).parent().parent().width() - 5);

$('<div id="list_split"></div>').prependTo("#list");
$("#list_split").css({ "margin-left": $("#list").width() });

if (window.PIE) {
    $('').each(function() {
        PIE.attach(this);
    });
}