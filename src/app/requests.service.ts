import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient, private datePipe:DatePipe) { }

  getRequests(queryParams = {}): Observable<HttpResponse<object>> {

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if(queryParams.requestDateAfter){
      queryParams.requestDateAfter = this.datePipe.transform(queryParams.requestDateAfter, 'yyyy-MM-ddTHH:mm:ss')+'z';
    }else{
      queryParams.requestDateAfter = ''
    }

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if(queryParams.requestDateBefore){
      queryParams.requestDateBefore = this.datePipe.transform(queryParams.requestDateBefore, 'yyyy-MM-ddT')+'23:59:59z';
    }else{
      queryParams.requestDateBefore = ''
    }

    return this.http.get<HttpResponse<object>>(
      `${environment.requestApi.api}${environment.requestApi.rest.myRequests}?`, 
        { observe: 'response',
         params: {
          'requestDate.greaterOrEqualThan': queryParams.requestDateAfter,
          'requestDate.lessOrEqualThan': queryParams.requestDateBefore,
          'status.in': queryParams.statuses ,
          'serviceId.in': queryParams.services
        }
       }).pipe(
        tap(resp => resp)
      );
  }
}