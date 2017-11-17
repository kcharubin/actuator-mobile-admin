# actuator-mobile-admin
React Native mobile client for Spring Boot Actuator.
This application provides simple GUI for Actuator endpoints.
You can add mulitple server instances and each of them can have multiple endpoints configured.
By default three endpoints are added to each server: 
- **Health (/health)**
- **Metrics (/metrics)**
- **Trace (/trace)**

Because endpoint configuration can be customized mobile aplication only provides nice looking tree wrapper around JSON responses.
At the moment only GET method is supported, but we strongly not recomment to configure any endpoints thats return high amount of binary data (i.e. /dump ).

At the moment application supports only basic authentication, so you should configure your Spring Boot server accordingly.

## Getting Started
### Perequisities
1. Running Spring Boot Applications with valid https certificate.
2. Installed Actuator. For detailed instructions please refer to this [terrific article](http://www.baeldung.com/spring-boot-actuators)
3. Configured basic authentication for Actuator endpoints
4. User account with [**ACTUATOR**](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-security-actuator) role
## Actuator documentation
For Acutator endpoints description please refer to [this documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html)
## Licence
MIT License
Copyright (c) 2017 Kamil Charubin
## Screenshots
<p align="center" width="100%">
<img align="left" src="/screenshots/actuator-serverlist.png?raw=true" width="250" height="445"/> 
<img align="left" src="/screenshots/actuator-endpointlist.png?raw=true" width="250" height="445"/>
<img align="left" src="/screenshots/actuator-addserver.png?raw=true" width="250" height="445"/> 
<img align="left" src="/screenshots/actuator-health.png?raw=true" width="250" height="445"/> 
<img align="left" src="/screenshots/actuator-metrics.png?raw=true" width="250" height="445"/> 
<img align="left" src="/screenshots/actuator-addendpoint.png?raw=true" width="250" height="445"/>  
</p>

 


