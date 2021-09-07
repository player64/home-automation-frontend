# Home automation - Frontend VUE.js
This project aims to develop a user-friendly web application where a user will be able
to manage its devices. By automating various tasks such as enable/disable based on the current
environment state read from the sensors, electrical appliances will help reduce the energy bill, e.g.,
the system will disable a heater if the temperature in the room reaches a certain value. This part is GUI for the project.
It utilises the backend REST API of the application available in the link.
[Home automation backend Django](https://github.com/player64/home-automation-backend). 

This project uses the following packages:

* Axios - for managing HTTP requests to the backend application.
* Vuetify - uses the ready components to build a User Interface
* Vuex - for managing the application state.
* VUE router - to enable Single App Application.

### Project setup
To install the project's dependencies use the below command.
```
yarn install --ignore-engines
```
Before start copy the [.env.example](.env.example]) and rename depend on your environment, e.g., 
```.env.production``` or ```.env.development```
Update with the following the values. 
* VUE_APP_API_URL - the URL of backend the application consumes the REST API
* VUE_APP_CAPTCHA_KEY - this is the ReCaptcha public key that can be obtained from this URL https://www.google.com/recaptcha/about/

### Compiles and hot-reloads for development
To run the development server with hot-reload use the command below.
```
yarn serve
```

### Compiles and minifies for production
To build the files for production. Use the command below.
```
yarn build
```

### Lints and fixes files
To lint and fix the source code use the command below. 
```
yarn lint
```
