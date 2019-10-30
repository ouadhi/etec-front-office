import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { RequestsService } from './../requests.service';
import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent {

  constructor(
    private http: HttpClient,
    private requestsService: RequestsService,
    public datePipe: DatePipe
  ) { }


  data = {
    totalCount: null,
    items: {}
  };

  dashletCols = {
    id: { name: 'Id', sortable: true },
    requestName: { name: 'Request Name', sortable: false },
    requestDate: { name: 'Request Date', sortable: true, formatDate: true },
    status: { name: 'Status', sortable: true },
    data: {
      name: 'Details', sortable: false, display: 'detailsButton',
      param1: 'link', param2: 'data', param3: 'cmmnId', param4: 'caseId', param5: 'id'
    }

  };

  dashletService = (params) => {
    params.sort = params.sortBy + ',' + params.sortDirection;

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if (params.requestDateAfter) {
      params.requestDateAfter = this.datePipe.transform(params.requestDateAfter, 'yyyy-MM-ddTHH:mm:ss') + 'z';
    } else {
      params.requestDateAfter = '';
    }

    // DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
    if (params.requestDateBefore) {
      params.requestDateBefore = this.datePipe.transform(params.requestDateBefore, 'yyyy-MM-ddT') + '23:59:59z';
    } else {
      params.requestDateBefore = '';
    }
    return this.requestsService.getRequests(params);
  }

}
