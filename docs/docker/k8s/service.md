# service
## nexus
### deployment
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nexus
  namespace: default

spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nexus
    spec:
      containers:
        - name: nexus
          image: sonatype/nexus3:3.3.1
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8081
            - containerPort: 5000
          volumeMounts:
            - name: nexus-data
              mountPath: /nexus-data
          resources:
            requests:
              cpu: 440m
              memory: 3.3Gi
            limits:
              cpu: 440m
              memory: 3.3Gi
      volumes:
        - name: nexus-data
#          azureFile:
#            secretName: azure-file-storage-secret
#            shareName: nexus-data

#      readinessProbe:
#        httpGet:
#          path: /service/siesta/rest/v1/script
#          port: 8081
#          httpHeaders:
#            - name: Authorization
#              # The authorization token is simply the base64 encoding of the `healthprobe` user's credentials:
#              # $ echo -n user:password | base64
#              value: Basic dXNlcjpwYXNzd29yZA==
#        initialDelaySeconds: 900
#        timeoutSeconds: 60
#      livenessProbe:
#        httpGet:
#          path: /service/siesta/rest/v1/script
#          port: 8081
#          httpHeaders:
#            - name: Authorization
#              value: Basic dXNlcjpwYXNzd29yZA==
#        initialDelaySeconds: 900
#        timeoutSeconds: 60
```
### ingress
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nexus
  namespace: default
  annotations:
    kubernetes.io/ingress.class: "nginx"
    kubernetes.io/tls-acme: "true"

spec:
  tls:
    - hosts:
      - nexus.example.com
      secretName: nexus-tls
  rules:
    - host: nexus.example.com
      http:
        paths:
        - path: /
          backend:
            serviceName: internal-proxy
            servicePort: 80
```
### service
```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nexus
  name: nexus
  namespace: default
  selfLink: /api/v1/namespaces/default/services/nexus

spec:
  ports:
  - name: http
    port: 80
    targetPort: 8081
  - name: docker
    port: 5000
    targetPort: 5000
  selector:
    app: nexus
  type: ClusterIP
```
## nginx
### configmap
```yaml
apiVersion: v1
data:
  nginx.conf: |
    worker_processes auto;

    events {
        worker_connections 1024;
    }

    http {
        error_log /var/log/nginx/error.log warn;
        access_log  /dev/null;
        proxy_intercept_errors off;
        proxy_send_timeout 120;
        proxy_read_timeout 300;

        upstream nexus {
            server nexus:80;
        }

        upstream registry {
            server nexus:5000;
        }

        server {
            listen 80;
            server_name nexus.example.com;

            keepalive_timeout  5 5;
            proxy_buffering    off;

            # allow large uploads
            client_max_body_size 1G;

            location / {
            # redirect to docker registry
            if ($http_user_agent ~ docker ) {
                proxy_pass http://registry;
            }
            proxy_pass http://nexus;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto "https";
            }
        }
    }
kind: ConfigMap
metadata:
  creationTimestamp: null
  name: internal-proxy-conf
  namespace: default
  selfLink: /api/v1/namespaces/default/configmaps/internal-proxy-conf
```
### deployment
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: internal-proxy
  namespace: default

spec:
  replicas: 1
  template:
    metadata:
      labels:
        proxy: internal
    spec:
      containers:
        - name: nginx
          image: nginx:1.11-alpine
          imagePullPolicy: IfNotPresent
          lifecycle:
            preStop:
              exec:
                command: ["/usr/sbin/nginx","-s","quit"]
          volumeMounts:
            - name: internal-proxy-conf
              mountPath: /etc/nginx/
          env:
            # This is a workaround to easily force a restart by incrementing the value (numbers must be quoted)
            # NGINX needs to be restarted for configuration changes, especially DNS changes, to be detected
            - name: RESTART_
              value: "0"
      volumes:
        - name: internal-proxy-conf
          configMap:
            name: internal-proxy-conf
            items:
              - key: nginx.conf
                path: nginx.conf
```
### service
```yaml
kind: Service
apiVersion: v1
metadata:
  name: internal-proxy
  namespace: default

spec:
  selector:
    proxy: internal
  ports:
    - name: http
      port: 80
      targetPort: 80
    - name: https
      port: 443
      targetPort: 443
  type: ClusterIP
```
## ssr
### deployment
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    io.kompose.service: ssr
    app: ssr
  name: ssr
spec:
  replicas: 1
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        io.kompose.service: ssr
    spec:
      containers:
      - env:
        - name: METHOD
          value: aes-256-cfb
        - name: OBFS
          value: tls1.2_ticket_auth
        - name: PASSWORD
          value: gcssr123./
        - name: PROTOCOL
          value: auth_sha1_v4
        - name: SERVER_ADDR
          value: 0.0.0.0
        - name: SERVER_PORT
          value: "8388"
        - name: DNS_ADDR
          value: 10.190.49.51
        - name: DNS_ADDR_2 
          value: 
        image: breakwa11/shadowsocksr
        name: ssr
        ports:
        - containerPort: 8388
        resources: {}
      restartPolicy: Always
status: {}
```
### service
```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: ssr
    io.kompose.service: ssr
  name: ssr
  namespace: default
spec:
  externalTrafficPolicy: Cluster
  ports:
  - port: 8388
    protocol: TCP
    targetPort: 8388
    nodePort: 32388
  selector:
    io.kompose.service: ssr
  type: LoadBalancer
status:
  loadBalancer: {}
```