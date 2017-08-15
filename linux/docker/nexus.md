## nexus3搭建docker私服
```yaml
version: '2'
networks:
  neuxs-network:
services:
  nexus3:
    image: sonatype/nexus3:latest
    restart: unless-stopped
    logging:
      driver: "journald"
    networks:
     - neuxs-network
    ports:
     - "8088:8088"
     - "8081:8081"
     - "5000:5000"
    volumes:
      - "nexus-data:/nexus-data"
  
volumes:
  nexus-data: {}
```