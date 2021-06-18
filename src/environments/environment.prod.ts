

export const environment = {
  production: true,
  cms: 'http://54.158.193.221:8083',
  appConfig: {
    endpoint: '/api/collections/get/appConfig/',
    id: '6069bbe7666434004e00012d'
  },
  keycloak: {
    url: 'http://ec2-54-167-210-145.compute-1.amazonaws.com:9080/auth/',
    realm: 'etec',
    secret: 'etec@2030-orchestra',
    secret_client: 'request-service',
    anonymous_user: '13780',
    anonymous_password: 'p@ss123',
    clientId: 'fo-web'
  },
  formio: {
    apiUrl: 'http://api.ec2-54-158-193-221.compute-1.amazonaws.com:8082/',
    appUrl: 'http://ec2-54-158-193-221.compute-1.amazonaws.com:8082/ksekuzmfmkerfvg/'
  },
  gateway: 'http://ec2-54-90-214-64.compute-1.amazonaws.com:80',
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
  filter: {
    status: [
      {
        key: 'NEW',
        val: 'NEW'
      },
      {
        key: 'In_PROGRESS',
        val: 'In_PROGRESS'
      },
      {
        key: 'COMPLETED',
        val: 'COMPLETED'
      }
    ]
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
