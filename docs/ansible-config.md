## Host Key Checking
known_hosts的问题
```
# /etc/ansible/ansible.cfg 或者 ~/.ansible.cfg
[defaults]
host_key_checking = False
```
或者
```
export ANSIBLE_HOST_KEY_CHECKING=False
```