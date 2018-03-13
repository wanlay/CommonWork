## shell中的各种括号
if循环
```bash
if(($tmp < 2));then
# 等价于
if [ $temp -lt 2 ] ;then
```
## awk
输出`netstat -n`结果的第2 、6、1列
```bash
netstat -n | awk '{print $2,$6,$1}'
```
输出`netstat -n`结果中，筛选出第二列等于2的
```bash
netstat -n | awk '$2 == 2'
#不等于
# netstat -n | awk '$2 != "2"'
```
输出`netstat -n`结果中的第一列是否满足正则表达式，0不满足，1满足
```bash
netstat -n | awk '{ print $1 ~ /^[a-p]/}'
# awk '$7  ~ /^[a-f]/' file.txt
# 不匹配
# netstat -n | awk '{ print $1 ！~ /^[a-p]/}'
```
统计｀netstat -n｀的第二列中各结果的出现次数
```bash
netstat -n | awk '{arr[$2]++} END {for(i in arr)print i, arr[i]}'
```
在`netstat -n`的结果中，筛选出第一次出现第二列值的结果
```bash
netstat -n | awk '!arr[$2]++'
```
筛选出`file.txt`中，第3项大于第5项的结果
```bash
awk '$3>$5' file.txt
```
累加`ps`结果的第一项
```bash
ps | awk '{sum+=$1} END {print sum}'
```
计算`netstat -n`第二列结果的平均值
```bash
netstat -n | awk '{x+=$2}END{print x/NR}'
```

## sed
将`ps`的输出结果中`CMD`全部替换为`TMD`
```bash
ps | sed 's/CMD/TMD/g'
```
去除`ps`结果中的空格和`\t`
```bash
# 去除开头的
ps | sed 's/^[ \t]*//'
# 去除结尾的
ps | sed 's/[ \t]*$//'
# 开头和结尾
ps | sed 's/^[ \t]*//;s/[ \t]*$//'
```
删除`file.txt`中的空白行
```bash
sed '/^$/d' file.txt
``
删除`file.txt`中包含`EndOfUsefulData`的行
```bash
sed -n '/EndOfUsefulData/,$!p' file.txt
```

https://github.com/stephenturner/oneliners#contents