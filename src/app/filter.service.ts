import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private services = this.http.get<any>(`${environment.filter.api}${environment.filter.rest.services}`, {
    params: {
      language: 'ar'
    }
  }).pipe(
    publishReplay(1),
    refCount()
  );

  constructor(private http: HttpClient) { }


  getServices() {
    return this.services;
  }
  getStatuses(id) {
    return this.http.get<any>(`${environment.requestApi.api}${environment.requestApi.rest.statuses}/${id}/statuses`);
  }


}
