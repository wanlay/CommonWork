## 查看系统pod
```
kubectl -n kube-system get po
```

## 查看系统pod的状态
```
kubectl -n kube-system describe po
```
## ipdtables
```
sudo iptables -t nat -L -n
```