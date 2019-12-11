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

  getCMSheaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + environment.cms.portalUserToken);
    return headers;
  }
  
  contactCandidates(candidatesAppliedId,message): Observable<any> {
    console.log('caling send mail service', candidatesAppliedId,message);
  
    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/save/opportunitySubmit/`,{
        data:{
          "_id": candidatesAppliedId,
          "isContacted":1
        }
      }, {
      headers: this.getCMSheaders()
    });


  }
}
