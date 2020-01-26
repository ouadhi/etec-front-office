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
        const endpoint = `${environment.requestApi.api}${environment.requestApi.rest.caseActivity}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map(data => (
                data.map(item => this.activityInstanceAdapter.adapt(item))
            )
            ));
    }
    getRequestTasks(queryParams = {}) {
        const endpoint = `${environment.requestApi.api}${environment.requestApi.rest.tasks}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map(data => (data)
            ));
    }

}
