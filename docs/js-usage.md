#关于js的一些用法

## eclpise中js的格式
[文件](javascript_format.xml)

## 一个js中引用另一个js
```javascript
document.write("<script language='javascript' src='one.js'></script>");
```
## 点击空白,清空弹框
```javascript
$(document).click(
    function (event) {
        var _con = $("#vlanInput");
        if (!_con.is(event.target) &&
            (_con.has(event.target).length === 0)) {
            $('#vlanInput').popover('hide');
        }
    });
```
## 公司网络认证算法
[文件](auth.js)

## 测试websocket
[文件](testWebsocket.html)