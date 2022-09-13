export interface TaskModel {
	id?: string;
	name?: string;
	assignee: string;
	created: string;
	due?: any;
	followUp?: any;
	delegationState?: any;
	description?: any;
	executionId: string;
	owner?: any;
	parentTaskId?: any;
	priority: number;
	processDefinitionId: string;
	processInstanceId: string;
	taskDefinitionKey: string;
	caseExecutionId?: any;
	caseInstanceId?: any;
	caseDefinitionId?: any;
	suspended: boolean;
	formKey: string;
	tenantId?: any;
	dataObjectInfo?: any;
	completed: boolean;
	actions: any[];
	[k: string]: any;
}
