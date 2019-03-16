import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { RequestsService} from './../requests.service'
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent {

  constructor(
    private http: HttpClient,
    private requestsService:RequestsService    
    ) { }


  data = {
    totalCount:null,
    items:{}
  };

  dashletCols = {
    id: { name: 'id', sortable: true },
    serviceId: { name: 'service Id', sortable: true, display: 'chip', color: 'tertiary', icon: 'cube' },
    requestName: { name: 'request Name', sortable: true, display: 'badge', color: 'primary' },
    requestDate: { name: 'request Date', sortable: true },
    status: { name: 'status', sortable: true },
    data: { name: 'Details', sortable: true, display:'detailsButton',param1:'link',param2:'data' }
    
  };

  dashletService = () => {
    this.requestsService.getRequests().subscribe((response:HttpResponse<Object>)=>{
      console.log('fn call',response)
      this.data.totalCount = response.headers.get('X-Total-Count');
      this.data.items = response.body;
    })
    
    // pass params to service function and return observable
    const delayedObservable = of(this.data).pipe(
      delay(1000)
    );
    return delayedObservable;
    
    
  }


  
  

}
