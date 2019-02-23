import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }
  

  getMyRequests(userId:string):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/collections/get/temp_myrequests');
  }
}
