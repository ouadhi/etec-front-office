import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashletFilterAdapter } from './dashlet-filter.adapter';

interface filterData {

  services: string[];
  statuses: string[];
  requestDateAfter: string;
  requestDateBefore: string;
  sortBy: string;
  sortDirection: string;
  sort: string
}


@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  constructor(private http: HttpClient, private datePipe: DatePipe, private dashletFilterAdapter: DashletFilterAdapter) { }

  getRequests(queryParams: filterData): Observable<HttpResponse<object>> {


    queryParams.sort = queryParams.sortBy + ',' + queryParams.sortDirection;

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if (queryParams.requestDateAfter) {
      queryParams.requestDateAfter = this.datePipe.transform(queryParams.requestDateAfter, 'yyyy-MM-ddTHH:mm:ss') + 'z';
    } else {
      queryParams.requestDateAfter = '';
    }

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if (queryParams.requestDateBefore) {
      queryParams.requestDateBefore = this.datePipe.transform(queryParams.requestDateBefore, 'yyyy-MM-ddT') + '23:59:59z';
    } else {
      queryParams.requestDateBefore = '';
    }

    return this.http.get<HttpResponse<object>>(
      `${environment.requestApi.api}${environment.requestApi.rest.myRequests}`,
      {
        observe: 'response',
        params: this.dashletFilterAdapter.adapt(queryParams)
      }).pipe(
        tap(resp => resp)
      );
  }


  getListOfUserSegments(): Observable<any> {
    return this.http.get<any[]>(
      `${environment.requestApi.api}${environment.requestApi.rest.myBeneficiarySegments}`);
  }

}
