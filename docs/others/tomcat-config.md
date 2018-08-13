 ## 问题
 ```bash
 # 问题
 Tomcat中“Offending class: javax/servlet/Servlet.class”错误：重复的servlet包

 # 解决
 这个问题的原因是是webapp中WEB-INFO/lib下，有重复的servlet包。将servlet包从webapp的部署文件中删除以后。再启动，错误信息就消失了。
 ```
 ## tomcat配置Manager App帐号密码

 >conf/tomcat-users.xml中添加
 
 ```xml
 <role rolename="admin-gui"/>  
<role rolename="admin-script"/>  
<role rolename="manager-gui"/>  
<role rolename="manager-script"/>  
<role rolename="manager-jmx"/>  
<role rolename="manager-status"/>  
<user username="tomcat" password="tomcat" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-script,admin-gui"/>  
 ```
帐号为tomcat
密码为tomcat
