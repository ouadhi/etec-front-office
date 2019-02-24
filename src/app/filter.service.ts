import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private departments = this.http.get<any>('http://34.207.137.198:8120/departments').pipe(
    publishReplay(1),
    refCount()
  );
  private requestNames = this.http.get<any>('http://34.207.137.198:8120/caseNames').pipe(
    publishReplay(1),
    refCount()
  );
  private statuses = this.http.get<any>('http://34.207.137.198:8120/departments').pipe(
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
