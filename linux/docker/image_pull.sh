#!/bin/bash
set -x
images=`cat ./images`
repo="10.190.16.53"
for i in ${images[@]}
do
#   if [[ $i == *$repo* ]]
#   then
#     docker pull $i
#   else
#     docker pull $repo/$i
#     docker tag $repo/$i $i
#     docker rmi $repo/$i
#   fi

# 判断镜像是否存在
    flag=`docker images $i -q`
    if [[ $flag == '' ]]
    then 
      docker pull $i
      docker tag $i $repo/$i
      docker push $repo/$i
      docker rmi $repo/$i
    fi
done