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

At the moment i supports only basic authentication, so you should configure your Spring Boot server accrodingly.

## Getting Started
## Actuator documentation
For Acutator endpoints description please refer to [this documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html)
## Screens
