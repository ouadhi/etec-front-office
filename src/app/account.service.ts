import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {



  constructor(private http: HttpClient) { }

  getAccount(queryParams = {}): Observable<any> {
    const endpoint = `${environment.profile.account}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
      catchError(this.handleError('getAccount', []))
    );
  }

  getBranchId(userid): Observable<any> {
    const endpoint = `${environment.wso2.base}${environment.wso2.api.erp}employee/${encodeURIComponent(userid)}`;
    return this.http.get<any>(endpoint)
  }

  getBranchIfForbeneficiary(): Observable<any> {
    const endpoint = `${environment.beneficiaryApi.api}`;
    return this.http.get<any>(endpoint)
  }

  private handleError<T>(operation = 'operation', result?) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      result.status = error.status;
      if (error.error.hasOwnProperty('message')) {
        result.message = error.error.message;
        result.type = error.error.type;

      }

      return of(result as T);
    };
  }
}
