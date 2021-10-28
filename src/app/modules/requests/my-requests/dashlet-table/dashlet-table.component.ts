import {NotificationsService} from 'src/app/modules/notifications/notifications.service';
import {
    AfterViewInit,
    Component,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, Observable, of, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DashletFilterComponent} from '../dashlet-filter/dashlet-filter.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {BaseComponent} from 'src/app/shared/components/base.component';
import {FormioLoader} from 'src/formio/src/public_api';


/**
 * Permission Table
 */
@Component({
    selector: 'app-dashlet-table',
    templateUrl: './dashlet-table.component.html',
    // styleUrls: ['./dashlet-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FormioLoader],
})
export class DashletTableComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatTable, {static: true}) table: MatTable<any>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(DashletFilterComponent, {static: true}) casesFilter: DashletFilterComponent;
    @Input() title: any = '';
    @Input() columns;
    @Input() detailsRouterForEachItem?;
    @Input() service: (param) => Observable<any>;
    data = [];
    pageSize = 10;
    showFilter = false;
    isLoadingResults = false;
    isRateLimitReached = false;
    displayedColumns: string[] = [];
    expandableColumns: string[] = [];
    expandedElement;
    resultsLength = 0;
    subscription: Subscription;
    currentLanguage: any;

    constructor(public injector: Injector,
                private notificationService: NotificationsService) {
        super(injector);
    }

    toggleFilter() {
        this.showFilter = !this.showFilter;
    }

    onFilter(filterData) {
        this.loggerService.log('filterData');
        this.loggerService.log(filterData);
        // this.toggleFilter();
    }

    ngOnInit() {
        const data = this.fromQueryString() || {};
        if (data.page) {
            this.paginator.pageIndex = +data.page;
        }
        if (data.size) {
            this.paginator.pageSize = +data.size;
        }
        if (data.sort) {
            const segments = decodeURIComponent(data.sort).split(',');
            this.sort.sort({id: segments[0], start: segments[1]} as MatSortable);
        } else
            this.sort.sort({id: 'requestDate', start: 'desc'} as MatSortable);

        this.displayedColumns = Object.keys(this.columns);
        this.expandableColumns = this.displayedColumns.filter((item) => {
            return this.columns[item].expandable === true;
        });
        this.expandableColumns.forEach((item) => {
            this.displayedColumns.splice(this.displayedColumns.indexOf(item), 1);
        });

        this.sub = this.notificationService.listenerObserver.subscribe(data => {
            this.getData();
        });
        this.translateService.onLangChange.subscribe((chn) => {
            this.currentLanguage = chn.lang;
        });

    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sub = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getData();
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    private getData() {
        if (this.subscription) this.subscription.unsubscribe();

        this.subscription = merge(this.sort.sortChange, this.paginator.page, this.casesFilter.filter, this.translateService.onLangChange)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.formioLoader.loading = true;
                    const data = this.fromQueryString();
                    return this.service({
                        ...this.casesFilter.filterData,
                        sortBy: this.sort.active,
                        sortDirection: this.sort.direction,
                        page: this.paginator.pageIndex,
                        size: this.paginator.pageSize
                    });
                }),
                map((data) => {
                    // Flip flag to show that loading has finished.
                    this.formioLoader.loading = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.totalCount;

                    return data;
                }),
                catchError(() => {
                    // Catch if the API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                    return of({});
                })
            ).subscribe(data => {
                this.data = data.items;
                // this.changeRef.detectChanges();
            });
    }
}
