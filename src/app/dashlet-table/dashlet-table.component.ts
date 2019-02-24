import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { merge, of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormioLoader } from '../form/components/loader/formio.loader';
import { DashletFilterComponent } from '../dashlet-filter/dashlet-filter.component';

/**
 * Permission Table
 */
@Component({
  selector: 'app-dashlet-table',
  templateUrl: './dashlet-table.component.html',
  styleUrls: ['./dashlet-table.component.scss'],
  providers: [FormioLoader]
})
export class DashletTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(DashletFilterComponent) casesFilter: DashletFilterComponent;
  @Input() title: any = '';
  @Input() columns;
  @Input() service: (param) => Observable<any>;
  data = [];
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
    console.log(filterData);
    // this.toggleFilter();
  }

  ngOnInit() {
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
            startResult: this.paginator.pageIndex * this.paginator.pageSize,
            totalResults: this.paginator.pageSize
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
      ).subscribe(data => this.data = data.items);
  }
}
