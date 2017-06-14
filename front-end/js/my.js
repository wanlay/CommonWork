//一个js中引用另一个js
document.write("<script language='javascript' src='one.js'></script>");

//点击空白 清空弹框
$(document).click(
    function (event) {
        var _con = $("#vlanInput");
        if (!_con.is(event.target) &&
            (_con.has(event.target).length === 0)) {
            $('#vlanInput').popover('hide');
        }
    });