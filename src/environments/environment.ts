// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wso2: {
    base: 'http://100.25.39.251:8280/',
    token: 'a9ff3dbd-50fa-3275-b7a4-80f81efc5e65',
    api: {
      erp: 'erp/1.0.0/'
    }
  },
  cms: {
    api: {
      master: 'http://localhost:8080',
      assets: 'http://localhost:8080/storage/uploads',

    },
    appConfig: {
      endpoint: '',
      id: ''
    },
    portalUserToken: 'account-14ce9c9a25353166aee307ef60c25c'
  },
  keycloak: {
    url: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:9080/auth',
    realm: 'jhipster',
    secret: '',
    secret_client: '',
    anonymous_user: '',
    anonymous_password: '',
    clientId: 'web_app'
  },
  requestApi: {
    api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8082',
    rest: {
      tasks: '/rest/task',
      myRequests: '/api/portal/requests',
      myBeneficiarySegments: '/api/portal/beneficiary-segments-cms',
      caseActivity: '/rest/history/case-activity-instance',
      count: '',
      statuses: ''
    }
  },
  beneficiaryApi: {
    api: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:8084/api/portal/beneficiaries',
  },
  formio: {
    apiUrl: 'https://api.form.io/', // formioApiUrl
    appUrl: 'https://aqnkygpwykfzugd.form.io/' // formioAppUrl
  },
  filter: {
    api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8083',
    rest: {
      deparments: '/api/portal/departments',
      services: '/api/request/eservices',
      servicesNew: '/api/request/eservices',
      statuses: '/departments',
      request: '/caseNames'
    },
    data: {
      status: [{ key: 'NEW', val: 'NEW' }, { key: 'In_PROGRESS', val: 'In_PROGRESS' }, { key: 'COMPLETED', val: 'COMPLETED' }]
    }
  },
  statisticsApi: {
    api: 'http://ec2-100-24-44-125.compute-1.amazonaws.com:8089/api/collections/get/segment/'
  },
  profile: {
    api: 'http://3.87.111.211:8120/Ekhaa/beneficiaries',
    account: 'http://ec2-34-226-249-174.compute-1.amazonaws.com:8080/api/account'
  },
  task: {
    api: 'http://ec2-100-27-19-2.compute-1.amazonaws.com:8084/api/portal/'
  },
  notifications: {
    api: 'http://ec2-34-226-249-174.compute-1.amazonaws.com:8082/notifications/api/',
    socket: 'http://ec2-34-226-249-174.compute-1.amazonaws.com:8082/websocket/ekhaa'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
