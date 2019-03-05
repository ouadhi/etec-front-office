// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:9080/auth',
  realm: 'rms',
  clientId: 'Angular'
};

export const environment = {
  production: false,

  cms:{
    api: {
      master:'http://localhost:8080',
      assets:'http://localhost:8080'
    }
  },

  keycloak: keycloakConfig,
  
  requestApi: '',

  formio:{
    api: {
      master:'https://api.form.io', //formioApiUrl
      requestForm:'https://rllslkfteqdgmpv.form.io' //formioAppUrl
    }
  },

  filter:{
    api: 'http://34.207.137.198:8120',
    rest: {
      deparments: '/departments',
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
