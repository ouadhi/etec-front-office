import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatSortable } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormioLoader } from 'dp-formio';
import { DashletFilterOppComponent } from '../dashlet-filter-opp/dashlet-filter-opp.component';

/**
 * Permission Table
 */
@Component({
  selector: 'app-dashlet-table-opp',
  templateUrl: './dashlet-table-opp.component.html',
  styleUrls: ['./dashlet-table-opp.component.scss'],
  providers: [FormioLoader]
})
export class DashletTableOppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(DashletFilterOppComponent) casesFilter: DashletFilterOppComponent;
  @Input() title: any = '';
  @Input() columns;
  @Input() detailsRouterForEachItem?;
  @Input() service: (param) => Observable<any>;
  data = [];
  pageSize = 7;
  showFilter = false;
  isLoadingResults = false;
  isRateLimitReached = false;
  displayedColumns: string[] = [];
  expandableColumns: string[] = [];
  expandedElement;
  resultsLength = 0;

  constructor(public translate: TranslateService, public loader: FormioLoader) {

  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  onFilter(filterData) {
    console.log('filterData');
    console.log(filterData);
    // this.toggleFilter();
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.sort.sort({
      id: '_created',
      start: 'desc'
    } as MatSortable);

    this.displayedColumns = Object.keys(this.columns);
    this.expandableColumns = this.displayedColumns.filter((item) => {
      return this.columns[item].expandable === true;
    });
    this.expandableColumns.forEach((item) => {
      this.displayedColumns.splice(this.displayedColumns.indexOf(item), 1);
    });
  }
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.casesFilter.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loader.loading = true;
          return this.service({
            ...this.casesFilter.filterData,
            sortBy: this.sort.active, sortDirection: this.sort.direction,
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize
          });
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.loader.loading = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data;
        }),
        catchError(() => {
          // Catch if the API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf({});
        })
      ).subscribe((data) => {this.data = data.items;this.isLoadingResults=false});
  }
}
