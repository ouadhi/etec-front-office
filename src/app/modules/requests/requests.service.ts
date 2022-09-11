import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashletFilterAdapter } from './dashlet-filter.adapter';
import { RequestModel } from './my-requests/model';

interface filterData {
	services: string[];
	statuses: string[];
	requestDateAfter: string;
	requestDateBefore: string;
	sortBy: string;
	sortDirection: string;
	sort: string;
	page: number;
	size: number;
}
type LockTypes = 'digital signature' | 'receive a task';

@Injectable({
	providedIn: 'root',
})
export class RequestsService {
	constructor(
		private http: HttpClient,
		private datePipe: DatePipe,
		private dashletFilterAdapter: DashletFilterAdapter,
		private translate: TranslateService
	) {}

	verifyToken(token) {
		return this.http.get<any>(`${environment.formio.appUrl}/recaptcha?recaptchaToken=${token}`);
	}

	unlockRequest(requestId, reason: LockTypes = 'digital signature') {
		const endpoint = `${environment.gateway}${environment.endpoints.myRequests}/${requestId}/unlock`;
		return this.http
			.post<any>(endpoint, {
				reason: reason,
			})
			.pipe(map((resp) => resp));
	}
	lockRequest(requestId, reason: LockTypes = 'digital signature') {
		const endpoint = `${environment.gateway}${environment.endpoints.myRequests}/${requestId}/lock`;
		return this.http
			.post<any>(endpoint, {
				reason: reason,
			})
			.pipe(map((resp) => resp));
	}

	getRequests(queryParams): Observable<{
		items: RequestModel[];
		totalCount: string;
	}> {
		return this.http
			.get<any>(`${environment.gateway}${environment.endpoints.myRequests}`, {
				observe: 'response',
				params: this.dashletFilterAdapter.adapt(queryParams),
			})
			.pipe(
				map((resp) => {
					return { items: resp.body, totalCount: resp.headers.get('X-Total-Count') };
				})
			);
	}
	queryRequests(queryParams): Observable<any> {
		return this.http
			.get<any>(`${environment.gateway}${environment.endpoints.myRequests}`, {
				params: {
					...queryParams,
					language: this.translate.currentLang,
				},
			})
			.pipe(map((resp) => resp));
	}
	queryAnonymousRequests(id): Observable<any> {
		return this.http
			.get<any>(`${environment.gateway}${environment.endpoints.myRequests}/anonymous/${id}`, {
				params: {
					language: this.translate.currentLang,
				},
			})
			.pipe(map((resp) => resp));
	}

	getGeneric(url, queryParams = {}): Observable<any> {
		const endpoint = `${url}`;
		return this.http.get<any>(endpoint, { params: queryParams }).pipe(
			catchError((e) => {
				throw e;
			})
		);
	}
	getTaskByProcessInstanceId(queryParams = {}, isAnonymous: boolean = false): Observable<any> {
		return this.http
			.get<any>(
				`${environment.gateway}${
					isAnonymous ? environment.endpoints.anonymousTasks : environment.endpoints.tasks
				}`,
				{
					params: {
						...queryParams,
						...this.dashletFilterAdapter.adapt(queryParams),
					},
				}
			)
			.pipe(map((resp) => resp));
	}
	getRequest(id, queryParams = {}): Observable<any> {
		return this.http
			.get<any>(`${environment.gateway}${environment.endpoints.myRequests}/${id}`, {
				params: this.dashletFilterAdapter.adapt(queryParams),
			})
			.pipe(map((resp) => resp));
	}
	getRequestsCount(serviceId) {
		const d = new Date(new Date().getFullYear(), 0, 1);
		return this.http
			.get<any>(`${environment.gateway}${environment.endpoints.count}`, {
				params: {
					'requestDate.greaterOrEqualThan': this.datePipe.transform(d, 'yyyy-MM-ddTHH:mm:ss') + 'z',
					'serviceId.equals': serviceId,
				},
			})
			.pipe(map((resp) => resp));
	}

	getListOfUserSegments(): Observable<any> {
		return this.http.get<any[]>(
			`${environment.gateway}${environment.endpoints.myBeneficiarySegments}`
		);
	}

	checkRequestFeedback(serviceKey, requestId): Observable<any> {
		const endpoint = `${environment.gateway}${environment.endpoints.requestFeedback}/${serviceKey}/request/${requestId}/available`;
		return this.http.get<any>(endpoint);
	}
}
