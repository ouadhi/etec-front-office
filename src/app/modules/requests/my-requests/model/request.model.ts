import { TaskModel } from './task.model';

export interface RequestModel {
	id?: number;
	serviceId?: string;
	requestName: string;
	requestDate: string;
	department: string;
	category: string;
	status: string;
	link: string;
	cmmnId: string;
	caseId: string;
	requesterId: string;
	beneficiaryId?: string;
	data: string;
	activeTask: boolean;
	number: string;
	procInstID: string;
	locked?: boolean;
	lockId?: any;
	tasks: TaskModel[];
	requestLocksDTO?: { [k: string]: any } | any;
	[k: string]: any;
}
