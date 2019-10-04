import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import {ServicesService} from '../../services.service'

import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-all-opportunities',
  templateUrl: './all-opportunities.component.html',
  styleUrls: ['./all-opportunities.component.css']
})
export class AllOpportunitiesComponent {

  constructor(
    private http: HttpClient,
    private servicesService: ServicesService
  ) { }


  data = {
    totalCount: null,
    items: {}
  };

  dashletCols = {
    employer: { name: 'OPPORTUNITY.EMPLOYER', sortable: true}, 
    name: { name: 'OPPORTUNITY.NAME', sortable: true },
    number: { name: 'OPPORTUNITY.NUMBER', sortable: false },
    city: { name: 'OPPORTUNITY.CITY', sortable: true },
    vacancies: { name: 'OPPORTUNITY.VACANCIES', sortable: true },
    data: { name: 'Details', sortable: false, display: 'detailsButton_oneParam', param1: '_id'}

  };

  dashletService = (params) => {
    this.servicesService.getAllOpportunitiesAvailForToday().subscribe((response: HttpResponse<object>) => {
      this.data.totalCount = response['total'];
      this.data.items = response['entries'];
    });

    // pass params to service function and return observable
    const delayedObservable = of(this.data).pipe(
      delay(1000)
    );
    return delayedObservable;

  }

}
