// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gateway: 'http://ec2-52-206-161-8.compute-1.amazonaws.com:8080',
  cms: 'http://100.24.85.92:8089',
  appConfig: {
    endpoint: '/api/collections/get/AppConfig1/',
    id: '6069bbe7666434004e00012d',
    customStyle: '/api/collections/get/customStyleFiles/',
    customStyleId: '60e5af36666434039800013d',
  },
  keycloak: {
    url: 'http://ec2-52-206-161-8.compute-1.amazonaws.com:9080/auth/',
    realm: 'ekhaa',
    clientId: 'fo-web'
  },
  formio: {
    apiUrl: "https://api.form.io/",
    appUrl: 'http://ec2-34-234-234-87.compute-1.amazonaws.com:8083/rwzodfyrlzgyaai/'
  },
  endpoints: {
    tasks: '/requestmanagement/rest/task',
    myRequests: '/requestmanagement/api/portal/requests',
    myBeneficiarySegments: '/requestmanagement/api/portal/beneficiary-segments-cms',
    caseActivity: '/requestmanagement/rest/history/case-activity-instance',
    count: '/requestmanagement/api/requests/count',
    statuses: '/requestmanagement/api/portal/eservices',
    beneficiaryApi: '/dataservice/api/portal/beneficiaries',
    deparments: '/referencedata/api/portal/departments',
    services: '/referencedata/api/request/eservices',
    servicesNew: '/requestmanagement/api/portal/eservices',
    filterStatuses: '/referencedata/departments',
    request: '/referencedata/caseNames',
    account: '/api/account',
    humanTask: '/dataservice/api/',
    notifications: '/notification/api/',
    socket: '/notification/websocket/orchestra'
  },
  roles: {
    beneficiary: 'ROLE_USER',
    branch_specialist: 'ROLE_SERVICE_SPECIALIST_BRANCH',
    department_specialist: 'ROLE_DEPARTMENT_ENABLEMENT_SPECIALIST'
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
