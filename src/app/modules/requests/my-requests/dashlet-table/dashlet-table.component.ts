import {
	AfterViewInit,
	Component,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/modules/notifications/notifications.service';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { FormioLoader } from 'src/formio/src/public_api';
import { RequestFilterModel } from '../model';

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
export class DashletTableComponent
	extends BaseComponent
	implements OnInit, AfterViewInit, OnDestroy
{
	@Input() title: any = '';
	@Input() columns;
	@Input() detailsRouterForEachItem?;
	@Input() service: (param) => Observable<any>;

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatTable, { static: true }) table: MatTable<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	data = [];
	pageSize = 10;
	showFilter = false;
	isLoadingResults = false;
	isRateLimitReached = false;
	displayedColumns: string[] = [];
	expandableColumns: string[] = [];
	resultsLength = 0;
	subscription: Subscription;
	currentLanguage$: Observable<string>;

	filterSub = new BehaviorSubject<RequestFilterModel>(null);
	constructor(public injector: Injector, private notificationService: NotificationsService) {
		super(injector);
	}

	toggleFilter() {
		this.showFilter = !this.showFilter;
	}

	onFilter(filterData) {
		this.loggerService.log(filterData);
		this.filterSub.next(filterData);
	}

	ngOnInit() {
		this.currentLanguage$ = this.translateService.onLangChange.pipe(switchMap((chn) => chn?.lang));
		this._prepareTableMetaData();
		this._prepareTableColumns();

		this.sub = this.notificationService.listenerObserver.subscribe((data) => {
			this.getData();
		});
	}

	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sub = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.getData();
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}

	private getData() {
		if (this.subscription) this.subscription.unsubscribe();

		this.subscription = merge(
			this.sort.sortChange,
			this.paginator.page,
			this.filterSub,
			this.translateService.onLangChange
		)
			.pipe(
				startWith({}),
				tap(() => {
					this.formioLoader.loading = true;
				}),
				switchMap(() =>
					this.service({
						...this.filterSub.value,
						sortBy: this.sort.active,
						sortDirection: this.sort.direction,
						page: this.paginator.pageIndex,
						size: this.paginator.pageSize,
					})
				),
				tap((data) => {
					// Flip flag to show that loading has finished.
					this.formioLoader.loading = false;
					this.isRateLimitReached = false;
					this.resultsLength = data.totalCount;
				}),
				catchError(() => {
					// Catch if the API has reached its rate limit. Return empty data.
					this.isRateLimitReached = true;
					return of({});
				})
			)
			.subscribe((data) => {
				this.data = data.items;
			});
	}

	private _prepareTableMetaData(): void {
		const data = this.fromQueryString() || {};
		if (data?.page) {
			this.paginator.pageIndex = +data.page;
		}
		if (data?.size) {
			this.paginator.pageSize = +data.size;
		}
		if (data.sort) {
			const segments = decodeURIComponent(data.sort).split(',');
			this.sort.sort({ id: segments[0], start: segments[1] } as MatSortable);
		} else {
			this.sort.sort({ id: 'requestDate', start: 'desc' } as MatSortable);
		}
	}

	private _prepareTableColumns(): void {
		this.displayedColumns = Object.keys(this.columns);
		this.expandableColumns = this.displayedColumns.filter((item) => {
			return this.columns[item].expandable === true;
		});
		this.expandableColumns.forEach((item) => {
			this.displayedColumns.splice(this.displayedColumns.indexOf(item), 1);
		});
	}
}
