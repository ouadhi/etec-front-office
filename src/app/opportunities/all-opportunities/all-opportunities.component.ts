import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ServicesService } from '../../services.service'

import { from, of, iif } from 'rxjs';
import { delay, switchMap, map } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';
import { AccountService } from 'src/app/account.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-all-opportunities',
  templateUrl: './all-opportunities.component.html',
  styleUrls: ['./all-opportunities.component.css']
})
export class AllOpportunitiesComponent {

  constructor(
    private http: HttpClient,
    private servicesService: ServicesService,
    private accountService: AccountService
  ) { }

  branchId;

  data = {
    totalCount: null,
    items: {}
  };

  dashletCols = {
    name: { name: 'OPPORTUNITY.NAME', sortable: true },
    number: { name: 'OPPORTUNITY.NUMBER', sortable: true },
    employer: { name: 'OPPORTUNITY.EMPLOYER', sortable: true },
    from: { name: 'OPPORTUNITY.FROM', sortable: true, formatDate: true },
    to: { name: 'OPPORTUNITY.TO', sortable: true, formatDate: true },
    vacancies: { name: 'OPPORTUNITY.VACANCIES', sortable: true },
    data: { name: 'Details', sortable: false, display: 'detailsButton_oneParam', param1: '_id' }

  };

  dashletService = (params) => {
    return this.accountService.getAccount().pipe(
      switchMap(account => {
        return iif(
          () => account.authorities.indexOf('ROLE_USER') >= 0,
          this.accountService.getBranchIfForbeneficiary().pipe(
            switchMap((res) => {
              const branchId = res.branchId;
              return iif(
                () => branchId,
                this.servicesService.getAllOpportunitiesAvailForToday(branchId, params)
                  .pipe(
                    map(opps => ({
                      totalCount: opps.total,
                      items: opps.entries
                    })))
              );
            })
          ),
          this.accountService.getBranchId(account.login).pipe(
            switchMap((res) => {
              const branchId = res.branchId;
              return iif(
                () => branchId,
                this.servicesService.getAllOpportunitiesAvailForToday(branchId, params).pipe(
                  map(opps => ({
                    totalCount: opps.total,
                    items: opps.entries
                  })))
              );
            })
          )
        );
      }));
    /*
  this.accountService.getAccount().subscribe(account => {
    if (account.authorities.indexOf('ROLE_USER') >= 0) {

      this.accountService.getBranchIfForbeneficiary().subscribe(res => {
        this.branchId = res.branchId;

        this.servicesService.getAllOpportunitiesAvailForToday(this.branchId, params).subscribe((response: HttpResponse<object>) => {
          this.data.totalCount = response['total'];
          this.data.items = response['entries'];
        });

      })


    } else {

      this.accountService.getBranchId(account.login).subscribe(res => {
        this.branchId = res.branchId;

        this.servicesService.getAllOpportunitiesAvailForToday(this.branchId, params).subscribe((response: HttpResponse<object>) => {
          this.data.totalCount = response['total'];
          this.data.items = response['entries'];
        });

      })

    }
  }
  )


  // pass params to service function and return observable
  const delayedObservable = of(this.data).pipe(
    delay(3000)
  );
  return delayedObservable;

  //return this.requestsService.getRequests(params); */


  }

}
