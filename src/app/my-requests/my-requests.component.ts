import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { RequestsService } from './../requests.service';
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
    private requestsService: RequestsService
  ) { }


  data = {
    totalCount: null,
    items: {}
  };

  dashletCols = {
    id: { name: 'Id', sortable: true },
    requestName: { name: 'Request Name', sortable: true },
    requestDate: { name: 'Request Date', sortable: true, formatDate: true },
    status: { name: 'Status', sortable: true },
    data: { name: 'Details', sortable: false, display: 'detailsButton', param1: 'link', param2: 'data', param3: 'cmmnId' }

  };

  dashletService = (params) => {
    this.requestsService.getRequests(params).subscribe((response: HttpResponse<object>) => {
      this.data.totalCount = response.headers.get('X-Total-Count');
      this.data.items = response.body;
    });

    // pass params to service function and return observable
    const delayedObservable = of(this.data).pipe(
      delay(1000)
    );
    return delayedObservable;

  }

}
