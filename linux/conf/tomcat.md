 ## Tomcat中“Offending class: javax/servlet/Servlet.class”错误：重复的servlet包

 这个问题的原因是是webapp中WEB-INFO/lib下，有重复的servlet包。将servlet包从webapp的部署文件中删除以后。再启动，错误信息就消失了。
 