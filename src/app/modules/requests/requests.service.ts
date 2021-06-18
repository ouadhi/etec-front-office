import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashletFilterAdapter } from './dashlet-filter.adapter';

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


@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private dashletFilterAdapter: DashletFilterAdapter,
    private translate: TranslateService) { }

  verifyToken(token) {
    return this.http.get<any>(
      `${environment.formio.appUrl}/recaptcha?recaptchaToken=${token}`);
  }
  getRequests(queryParams): Observable<any> {
    return this.http.get<any>(
      `${environment.gateway}${environment.endpoints.myRequests}`,
      {
        observe: 'response',
        params: this.dashletFilterAdapter.adapt(queryParams)
      }).pipe(
        tap(resp => resp),
        map(resp => {
          return { items: resp.body, totalCount: resp.headers.get('X-Total-Count') };
        })
      );
  }
  queryRequests(queryParams): Observable<any> {
    return this.http.get<any>(
      `${environment.gateway}${environment.endpoints.myRequests}`,
      {
        params: {
          ...queryParams,
          language: this.translate.currentLang
        }
      }).pipe(
        tap(resp => resp),
        map(resp => resp)
      );
  }
  queryAnonymousRequests(id): Observable<any> {
    return this.http.get<any>(
      `${environment.gateway}${environment.endpoints.myRequests}/anonymous/${id}`,
      {
        params: {
          language: this.translate.currentLang
        }
      }).pipe(
        tap(resp => resp),
        map(resp => resp)
      );
  }

  getGeneric(url, queryParams = {}): Observable<any> {
    const endpoint = `${url}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
      catchError((e) => {
        throw e;
      })
    );
  }
  getRequest(id, queryParams = {}): Observable<any> {
    return this.http.get<any>(
      `${environment.gateway}${environment.endpoints.myRequests}/${id}`,
      {
        params: this.dashletFilterAdapter.adapt(queryParams)
      }).pipe(
        tap(resp => resp),
        map(resp => (resp))
      );
  }
  getRequestsCount(serviceId) {
    const d = new Date(new Date().getFullYear(), 0, 1);
    return this.http.get<any>(
      `${environment.gateway}${environment.endpoints.count}`,
      {
        params: {
          'requestDate.greaterOrEqualThan': this.datePipe.transform(d, 'yyyy-MM-ddTHH:mm:ss') + 'z',
          'serviceId.equals': serviceId
        }
      }
    ).pipe(
      tap(resp => resp),
      map(resp => resp)
    );

  }


  getListOfUserSegments(): Observable<any> {
    return this.http.get<any[]>(
      `${environment.gateway}${environment.endpoints.myBeneficiarySegments}`);
  }

}
