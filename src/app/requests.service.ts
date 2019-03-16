import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  getRequests(queryParams = {}): Observable<HttpResponse<object>> {
    return this.http.get<HttpResponse<object>>(
      `${environment.requestApi.api}${environment.requestApi.rest.myRequests}`, 
        { observe: 'response',
         params: {
          'requestDate.greaterOrEqualThan': queryParams.requestDateAfter ,
          'requestDate.lessOrEqualThan': queryParams.requestDateBefore ,
          'status.in': queryParams.statuses ,
          'serviceId.in': queryParams.services
        }
       }).pipe(
        tap(resp => resp)
      );
  }
}
