import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { CaseActivityAdapter } from './case-activity.adapter';

import { environment } from 'src/environments/environment';

/**
 * Case Activities Integration
 */
@Injectable({
    providedIn: 'root'
})
export class CaseActivityService {

    constructor(private http: HttpClient, private activityInstanceAdapter: CaseActivityAdapter) {

    }
    getCaseHistoryActivities(queryParams = {}) {
        const endpoint = `${environment.gateway}${environment.endpoints.caseActivity}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map((data: any[]) => (
                data.map(item => this.activityInstanceAdapter.adapt(item))
            )
            ));
    }
    getCaseHistoryActivitiesDetails(queryParams = {}) {
        const endpoint = `${environment.gateway}${environment.endpoints.caseActivityDetails}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map((data: any[]) => (
                data.map(item => this.activityInstanceAdapter.adapt(item))
            )
            ));
    }
    getRequestTasks(queryParams = {}) {
        const endpoint = `${environment.gateway}${environment.endpoints.tasks}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map(data => (data)
            ));
    }
    getRequestTask(taskId, queryParams = {}) {
        const endpoint = `${environment.gateway}${environment.endpoints.camundaTask}/${taskId}`;
        return this.http.get<any>(endpoint, { params: queryParams }).pipe(
            map(data => (data)
            ));
    }

}
