# debug
使用vscode调试
## python
>Windows

文件 > 首选项 > 设置 > 工作区设置  
示例配置
```json
{
    "python.venvPath": "C:/Users/wanlay/.virtualenvs",
    "python.pythonPath": "C:/Users/wanlay/.virtualenvs/flaskVue-zFTujpNl/Scripts/python.exe",
}
```
::: tip
其中`python.venvPath`是虚拟环境所在的目录  
可通过`pipenv  --venv`查询
:::

`ctrl + shift + p`弹出命令面板，选择解析器`select interpreter`

配置launch.json
## flask
>launch.json

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python",
            "type": "python",
            "request": "launch",
            "stopOnEntry": false,
            "pythonPath": "${config:python.pythonPath}",
            "program": "${workspaceRoot}/run.py",
            "debugOptions": [
                "WaitOnAbnormalExit",
                "WaitOnNormalExit",
                "RedirectOutput"
            ]
        }
    ]
}
```
> run.py

```python
#!flask/bin/python
from app import app

#If debug with vscode,do not add debug=True
#app.run(debug=True)


app.run()
```

