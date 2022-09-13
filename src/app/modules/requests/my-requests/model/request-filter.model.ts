export interface RequestFilterModel {
	services: string[];
	statuses: string[];
	activeTask: boolean | null;
	requestDateAfter: string | Date;
	requestDateBefore: string | Date;
}
