import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor(private http: HttpClient,
    private translateService: TranslateService) { }

  private services = this.http.get<any>(`${environment.gateway}${environment.endpoints.servicesNew}`, {
    params: {
      language: this.translateService.currentLang
    }
  }).pipe(
    publishReplay(1),
    refCount()
  );


  getServices() {
    return this.services;
  }

  getPublishedServices() {
    return this.http.get<any>(`${environment.gateway}${environment.endpoints.servicesNew}`, {
      params: {
        language: this.translateService.currentLang,
        status: 'PUBLISHED'
      }
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }
  getStatuses(id) {
    return this.http.get<any>(`${environment.gateway}${environment.endpoints.statuses}/${id}/statuses`);
  }


}
