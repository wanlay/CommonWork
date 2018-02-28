## chrome设置手机模式
>添加Options配置，设置成手机模式访问

```python
# coding:utf-8
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

url = "https://login.m.taobao.com/msg_login.htm?spm=0.0.0.0"

mobile_emulation = {"deviceName":"iPhone 6"}
options = Options()
options.add_experimental_option("mobileEmulation", mobile_emulation)
driver = webdriver.Chrome(chrome_options=options)

driver.get(url)
```
>示例

```python
# coding:utf-8
from selenium import webdriver
from selenium.webdriver.common.touch_actions import TouchActions
from selenium.webdriver.chrome.options import Options

url = "https://login.m.taobao.com/msg_login.htm?spm=0.0.0.0"

# 设置成手机模式
mobile_emulation = {"deviceName":"iPhone 6"}
options = Options()
options.add_experimental_option("mobileEmulation", mobile_emulation)
driver = webdriver.Chrome(chrome_options=options)

driver.get(url)

driver.find_element_by_id("username").send_keys("yoyoketang")

# 触摸事件
el = driver.find_element_by_id('getCheckcode')
TouchActions(driver).tap(el).perform()
```