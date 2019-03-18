import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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
        const endpoint = `${environment.requestApi}${environment.requestApi.rest.caseActivity}`;
        return this.http.get<any[]>(endpoint, { params: queryParams }).pipe(
            map(data => (data.map(item => this.activityInstanceAdapter.adapt(item)))
            ));
    }
}
