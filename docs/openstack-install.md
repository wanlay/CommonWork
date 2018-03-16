# 与openstack有关的一些问题
## 问题

```bash
#问题
avoid ENOSPC:
#解决
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sysctl --system
```
## devtsack
local.conf
```bash
[[local|localrc]]
# Define images to be automatically downloaded during the DevStack built process.
DOWNLOAD_DEFAULT_IMAGES=False
IMAGE_URLS="http://images.trystack.cn/cirros/cirros-0.3.4-x86_64-disk.img"

# use TryStack git mirror
GIT_BASE=http://git.trystack.cn
NOVNC_REPO=http://git.trystack.cn/kanaka/noVNC.git
SPICE_REPO=http://git.trystack.cn/git/spice/spice-html5.git

USE_SYSTEMD=True
HOST_IP=10.190.16.197

ADMIN_PASSWORD=admin
DATABASE_PASSWORD=admin
RABBIT_PASSWORD=admin
SERVICE_PASSWORD=$ADMIN_PASSWORD

HORIZON_BRANCH=stable/ocata
KEYSTONE_BRANCH=stable/ocata
NOVA_BRANCH=stable/ocata
NEUTRON_BRANCH=stable/ocata
GLANCE_BRANCH=stable/ocata
CINDER_BRANCH=stable/ocata

#keystone
KEYSTONE_TOKEN_FORMAT=UUID

##Heat
HEAT_BRANCH=stable/ocata
enable_service h-eng h-api h-api-cfn h-api-cw


## Swift
SWIFT_BRANCH=stable/ocata
ENABLED_SERVICES+=,s-proxy,s-object,s-container,s-account


# Enabling Neutron (network) Service
disable_service n-net
enable_service q-svc
enable_service q-agt
enable_service q-dhcp
enable_service q-l3
enable_service q-meta
enable_service q-metering
enable_service neutron

disable_service cinder
enable_service gnocchi-grafana


##启用tacker，tacker依赖于heat
enable_plugin heat http://git.trystack.cn/openstack/heat stable/ocata
enable_plugin tacker http://git.trystack.cn/openstack/tacker stable/ocata
##Telemetry的四个组件
enable_plugin aodh http://git.trystack.cn/openstack/tacker stable/ocata
enable_plugin panko http://git.trystack.cn/openstack/tacker stable/ocata
enable_plugin ceilometer http://git.openstack.org/openstack/ceilometer
enable_plugin gnocchi http://git.trystack.cn/openstack/tacker stable/ocata
CEILOMETER_BACKEND=mongodb


disable_service tacker-horizon

# Work offline
OFFLINE=True
# Reclone each time
RECLONE=no

```