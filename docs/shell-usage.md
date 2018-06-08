## shell中的各种括号
if循环
```bash
if(($tmp < 2));then
# 等价于
if [ $temp -lt 2 ] ;then
```
## awk
!> NR,表示awk开始执行程序后所读取的数据行数  
   FNR,与NR功用类似,不同的是awk每打开一个新文件,FNR便从0重新累计

输出`netstat -n`结果的第2 、6、1列
```bash
netstat -n | awk '{print $2,$6,$1}'
# 把第2、3列的合输出在最后列
netstat -n | awk '{print $0,$2+$3}'
```
输出`netstat -n`结果中，筛选出第二列等于2的
```bash
netstat -n | awk '$2 == 2'
ps -ef | awk '$1 == "ubuntu"'
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
输出`ps`结果的除第一行的所有行
```bash
ps | awk 'NR>1'
# 输出20-80行
netstat -n | awk 'NR>=20&&NR<=80'
```



## sed
[sed](http://www.grymoire.com/Unix/Sed.html)
将`ps`的输出结果中`CMD`全部替换为`TMD`
```bash
ps | sed 's/CMD/TMD/g'
# 替换第二个匹配项
ps | sed 's/CMD/TMD/2'
# 替换前三个匹配项
ps | sed 's/CMD/TMD/3g'
# 打印匹配项
ps | sed 's/CMD/TMD/p'
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
输出
```bash
# 第二行
sed '2p' myfile.txt
# 除了第二行
sed '2!p' myfile.txt
# 第2-4行
sed '2,4p' myfile.txt
# 第四行
sed -n 4p myfile.txt
```

> `   #   #  ##include server8101.conf;`  
去除`#`号及其后include前的所有内容  
`sed -i "s/#.*\(include server8101\)/\1/"`

>在匹配到server8101的行前加`#`号  
`sed -i "/server8101/s/.*/#&/"`


## find
```bash
#一个文件5556字节
find /root -size -5557c -size +5555c -exec ls -ld {} \;
#查找大于5555字节小于5557字节的文件，以上查找的是/root 目录
#查找 小于500K，大于50K的文件
find /root -size -500K -size +50K -exec ls -ld {} \;
```
```bash
find /email/v2_bak -mtime +92 -type f -name *.mail[12] -exec rm -rf {} \;

# /email/v1_bak --设置查找的目录；
# -mtime +92 --设置时间为91天前；
# -type f --设置查找的类型为文件；
# -name *.mail[12] --设置文件名称中包含mail1或者mail2；
# -exec rm -f --查找完毕后执行删除操作；
```
把当前目录中所有的.txt重命名为.bak文件
```bash
find . -name "*.txt" | sed "s/\.txt$//" | xargs -i echo mv {}.txt {}.bak | sh
```
## others

打印三者的所有组合
```bash
echo {A,C,T,G}{A,C,T,G}{A,C,T,G}
```
打乱输出`file.txt`的前10行
```bash
shuf file.txt | head -n 10
```
统计`file.txt`中出现次数最多的10行
```bash
cut -f2 file.txt | sort | uniq -c | sort -k1nr | head
# head 前10
```
格式化输出PATH
```bash
echo $PATH | tr ":" "\n" | nl
# tr 将 ":" 替换为 "\n"
# 小写转大写 | tr [:lower:] [:upper:] 
# nl 输出行号
```
## functions
解压函数
```bash
extract () {
   if [ -f $1 ] ; then
       case $1 in
        *.tar.bz2)      tar xvjf $1 ;;
        *.tar.gz)       tar xvzf $1 ;;
        *.tar.xz)       tar Jxvf $1 ;;
        *.bz2)          bunzip2 $1 ;;
        *.rar)          unrar x $1 ;;
        *.gz)           gunzip $1 ;;
        *.tar)          tar xvf $1 ;;
        *.tbz2)         tar xvjf $1 ;;
        *.tgz)          tar xvzf $1 ;;
        *.zip)          unzip $1 ;;
        *.Z)            uncompress $1 ;;
        *.7z)           7z x $1 ;;
        *)              echo "don't know how to extract '$1'..." ;;
       esac
   else
       echo "'$1' is not a valid file!"
   fi
}
```
