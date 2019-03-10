// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:9080/auth',
  realm: 'jhipster',
  clientId: 'web_app'
};

export const environment = {
  production: false,

  cms:{
    api: {
      master:'http://localhost:8080',
      assets:'http://localhost:8080/storage/uploads'
    }
  },

  keycloak: keycloakConfig,
  
  requestApi:{
    // api: 'http://localhost:8082'
    api: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:8082',
    rest: {
      "myRequests":"/api/portal/requests"
    }
  },

  formio:{
    api: {
      master:'https://api.form.io', //formioApiUrl
      requestForm:'https://rllslkfteqdgmpv.form.io' //formioAppUrl
    }
  },

  filter:{
    // api: 'http://34.207.137.198:8120',
    // api: 'http://localhost:8083',
    api: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:8083',
    rest: {
      deparments: '/api/portal/departments',
      statuses:'/departments',
      request:'/caseNames'
    } 
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
