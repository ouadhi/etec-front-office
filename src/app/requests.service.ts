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

  getRequests():Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(
      `${environment.requestApi.api}${environment.requestApi.rest.myRequests}`,{ observe: 'response' }).pipe(
        tap(resp => {return resp})
      );
    }
}
