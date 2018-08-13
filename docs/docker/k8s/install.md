## 安装
文章http://dockone.io/article/2501 
```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add
echo deb http://mirrors.ustc.edu.cn/kubernetes/apt/ kubernetes-xenial main >> /etc/apt/sources.list.d/kubernetes.list
apt-get update
```

```
apt-get install -y kubelet kubeadm kubectl kubernetes-cni
```


## dashboard
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
```

## centos
```bash
 yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo


 cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

```
若遇到`repomd.xml.asc  not found`，修改kubernetes.repo
```
repo_gpgcheck=1  ## =0
```