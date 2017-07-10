## sonarqube 的安装

docker-compose.yml
```yaml
version: "2"

services:
  sonarqube:
    image: sonarqube
    restart: on-failure:10
    ports:
      - "9000:9000"
    networks:
      - sonarnet
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://pg-sonarqube:5432/sonar
    volumes:
      - sonarqube_volume:/opt/sonarqube
  pg-sonarqube:
    image: postgres
    restart: on-failure:10
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
    volumes:
      - pg_sonarqube_volume:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  sonarqube_volume:
  pg_sonarqube_volume:
```

## 配置LADP
sonarqube 界面上安装LDAP插件 ，或者把插件拷贝到{sonarqube_volume}/extensions/plugins

添加以下字段到{sonarqube_volume}/conf/sonar.properties
```conf
# LDAP configuration
# General Configuration
sonar.security.realm=LDAP
ldap.url=ldap://10.190.23.240
ldap.bindDn=cn=cbbadmin,ou=accounts,dc=fiberhome,dc=com
ldap.bindPassword=cbb2017
 
# User Configuration
ldap.user.baseDn=ou=accounts,dc=fiberhome,dc=com
ldap.user.request=(&(objectClass=inetOrgPerson)(uid={login}))
ldap.user.realNameAttribute=cn
ldap.user.emailAttribute=mail
 
# Group Configuration
ldap.group.baseDn=ou=groups,dc=fiberhome,dc=com
ldap.group.request=(&(objectClass=posixGroup)(memberUid={uid}))
```
