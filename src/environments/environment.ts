// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  // url: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:9080/auth',
  url: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:9080/auth',
  realm: 'jhipster',
  clientId: 'web_app'
  // url: 'http://localhost:9080/auth',
  // realm: 'rms',
  // clientId: 'Angular'
};

export const environment = {
  production: false,

  cms: {
    api: {
      master: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8089',
      assets: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8089/storage/uploads'
      // master: 'http://localhost:8080',
      // assets: 'http://localhost:8080/storage/uploads'
    }
  },

  keycloak: keycloakConfig,

  requestApi: {
    // api: 'http://localhost:8082'
    // api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8082',
    api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8082',
    rest: {
      myRequests: '/api/portal/requests',
      myBeneficiarySegments: '/api/portal/beneficiary-segments-cms',
      caseActivity: '/rest/history/case-activity-instance'
    }
  },
  beneficiaryApi: {
    api: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:8084/api/portal/beneficiaries',
  },

  formio: {
    api: {
      master: 'https://api.form.io/', // formioApiUrl
      project: 'https://pgmlavdtvhqeqmb.form.io/' // formioAppUrl
    }
  },

  filter: {
    // api: 'http://34.207.137.198:8120',
    // api: 'http://localhost:8083',
    api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8083',
    rest: {
      deparments: '/api/portal/departments',
      services: '/api/request/eservices',
      statuses: '/departments',
      request: '/caseNames'
    },
    data: {
      status: [{ key: 'NEW', val: 'NEW' }, { key: 'In_PROGRESS', val: 'In_PROGRESS' }, { key: 'COMPLETED', val: 'COMPLETED' }]
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
