sudo iptables -t nat -L -n

## portal 
8989
## policy
8443 
## vid
8080
## vnc
5900
## sdc be&fe

10.43.158.208 portal.api.simpledemo.openecomp.org
10.43.55.220 sdc.api.simpledemo.openecomp.org
10.43.185.183 sdc.api.be.simpledemo.openecomp.org
10.43.26.161 policy.api.simpledemo.openecomp.org
10.43.108.89 vid.api.simpledemo.openecomp.org
found: aai.api.simpledemo.openecomp.org

## user&pwd
"users" included in the based ONAP environment by default:
cs0008: the "Designer" role, responsible for the design and configuration of the service
jm0007: the "Tester" role, responsible for testing a proposed distribution and approving or rejecting it
gv0001: the "Governor" role, responsible for approve the actual distribution of a virtual service
op0001: the "Ops" role, responsible for performing the actual distribution of an approve virtual service
All of these user IDs share the same password, demo123456!
For the first steps, we will log into the ONAP Portal as our Designer, cs0008. The home screen will be similar to what we saw in the previous tutorial. All the next steps will be under the designer until mentioned otherwise. Click on the SDC icon.


* 
