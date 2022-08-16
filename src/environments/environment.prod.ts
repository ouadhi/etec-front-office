export const environment = {
	production: true,
	gateway: 'http://etec-bo.comptechco.com:80',
	cms: 'http://etec-fo.comptechco.com:8089',
	appConfig: {
		endpoint: '/api/collections/get/AppConfig1/',
		id: '6069bbe7666434004e00012d',
		frontOfficeSettings: 'api/singletons/get/frontOfficeSettings',
		formioEndpoint: '/api/collections/get/formioConfig/',
		formioId: '612bc06a5d4cda7713720b52',
		formioSettings: 'api/singletons/get/formioSettings',
	},
	keycloak: {
		url: 'http://etec-bo.comptechco.com:9080/auth/',
		realm: 'etec',
		clientId: 'fo-web',
	},
	formio: {
		apiUrl: 'https://api.form.io/',
		appUrl: 'http://etec-fo.comptechco.com:8084/ksuqnygnhgztelf/',
	},
	endpoints: {
		tasks: '/requestmanagement/api/portal/tasks',
		anonymousTasks: '/requestmanagement/api/portal/tasks/anonymous',
		camundaTask: '/requestmanagement/rest/task',
		myRequests: '/requestmanagement/api/portal/requests',
		myBeneficiarySegments: '/requestmanagement/api/portal/beneficiary-segments-cms',
		caseActivity: '/requestmanagement/rest/history/case-activity-instance',
		caseActivityDetails: '/requestmanagement/rest/history/detail',
		count: '/requestmanagement/api/requests/count',
		statuses: '/requestmanagement/api/portal/eservices',
		beneficiaryApi: '/dataservice/api/portal/beneficiaries',
		deparments: '/referencedata/api/portal/departments',
		services: '/referencedata/api/request/eservices',
		servicesNew: '/requestmanagement/api/portal/eservices',
		filterStatuses: '/referencedata/departments',
		request: '/referencedata/caseNames',
		account: '/api/account',
		humanTask: '/dataservice/api/tasks/case/',
		notifications: '/notification/api/',
		socket: '/notification/websocket/orchestra',
		dataservice: '/dataservice/api/',
		eligibilityVerificationReportApi: '/reportingservice/api/requirements',
		requestFeedback: '/feedbackservice/api/v2/feedbacks/service',
	},
	roles: {
		beneficiary: 'ROLE_BENEFICIARY',
		branch_specialist: 'ROLE_SERVICE_SPECIALIST_BRANCH',
		department_specialist: 'ROLE_DEPARTMENT_ENABLEMENT_SPECIALIST',
		admin: 'ROLE_ADMIN',
	},
	serviceCatalogControl: {
		showCarousel: false,
		showHasTask: true,
		showMostUsedService: true,
		showCatalog: false,
	},
	pdftronLicenceKey: '',
	showFeedbackButton: true,
	showDashboardCounters: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
