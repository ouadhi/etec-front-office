import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private departments = this.http.get<any>(`${environment.filter.api}${environment.filter.rest.deparments}`).pipe(
    publishReplay(1),
    refCount()
  );
  private requestNames = this.http.get<any>(`${environment.filter.api}${environment.filter.rest.request}`).pipe(
    publishReplay(1),
    refCount()
  );
  private statuses = this.http.get<any>(`${environment.filter.api}${environment.filter.rest.statuses}`).pipe(
    publishReplay(1),
    refCount()
  );
  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.departments;
  }
  getRequestNames() {
    return this.requestNames;
  }


}
