import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CaseActivityAdapter {
    constructor() { }

    adapt(item: any) {
        return ({
            id: item.id,
            parentCaseActivityInstanceId: item.parentCaseActivityInstanceId,
            caseActivityId: item.caseActivityId,
            caseActivityName: item.caseActivityName,
            caseActivityType: item.caseActivityType,
            caseDefinitionId: item.caseDefinitionId,
            caseInstanceId: item.caseInstanceId,
            caseExecutionId: item.caseExecutionId,
            taskId: item.taskId,
            calledProcessInstanceId: item.calledProcessInstanceId,
            calledCaseInstanceId: item.calledCaseInstanceId,
            tenantId: item.tenantId,
            createTime: item.createTime,
            time: item.time,
            durationInMillis: item.durationInMillis,
            required: item.required,
            available: item.available,
            enabled: item.enabled,
            disabled: item.disabled,
            active: item.active,
            completed: item.completed,
            terminated: item.terminated,
            revision: item.revision,
            variableName: item.variableName,
        });
    }
}
