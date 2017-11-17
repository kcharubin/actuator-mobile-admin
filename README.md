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
## Screenshots
[Health](/screenshots/actuator-health.png)
## Licence

MIT License

Copyright (c) 2017 Kamil Charubin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.