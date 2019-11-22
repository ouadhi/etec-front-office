import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactCandidatesService {

  constructor(
    private http: HttpClient) { }

  contactCandidates(candidates,oppId,message): Observable<any> {
    console.log('caling send mail service', candidates,oppId,message);
    return this.http.post<any[]>(
      `${environment.cms.api.master}/XXX_CONTACT_CANDIDATES_YYY`, { "candidates": candidates, "oppId":oppId,"message":message }, {
    });
  }
}
