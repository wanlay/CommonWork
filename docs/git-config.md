## 将git的git下载方式改为https
```bash
git config --global url."https://".insteadOf git://
```

## git下载所有分支
```
git branch -a | grep origin | grep -v HEAD | while read rb;do lb=$(echo ${rb} | cut -d/ -f 3-);git checkout -b $lb $rb;done
```
```
for branch in `git branch -a | sed -n '\=/HEAD$=d; \=/master$=d;s= remotes/==p'`; do 
git branch --track ${branch##*/} $branch 
done
```