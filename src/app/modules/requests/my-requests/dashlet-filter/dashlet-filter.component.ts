import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
	Component,
	EventEmitter,
	Injector,
	Input,
	OnInit,
	Output,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core';
import { FilterService } from '../../filter.service';
import { BaseComponent } from '../../../../shared/components/base.component';
import { RequestFilterModel } from '../model';
import { filter, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* const slideInOut = trigger('slideInOut', [
	state('in', style({ 'max-height': '350px', opacity: 1, display: 'block' })),
	state('out', style({ 'max-height': '0px', opacity: 0, display: 'none' })),
	transition('*=>in', animate('300ms')),
	transition('*=>out', animate('200ms')),
]); */

@Component({
	selector: 'app-dashlet-filter',
	templateUrl: './dashlet-filter.component.html',
	// styleUrls: ['./dashlet-filter.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// animations: [slideInOut],
})
export class DashletFilterComponent extends BaseComponent implements OnInit {
	@Input() show = false;
	@Output() onFilter: EventEmitter<RequestFilterModel> = new EventEmitter();
	@Input() currentLang: string;

	public servicesFilterData = [];
	public statusFilterData: any[];

	filterData: RequestFilterModel = {
		services: [],
		statuses: [],
		activeTask: null,
		requestDateAfter: '',
		requestDateBefore: '',
	};

	constructor(public injector: Injector, private filterService: FilterService) {
		super(injector);
	}

	ngOnInit() {
		this.sub = this.route.params
			.pipe(
				tap((params) => {
					this.loggerService.log(params);
				}),
				filter((params: { u: string }) => params.u === '1')
			)
			.subscribe((_) => {
				this.filterData.activeTask = true;
				this.applyFilter();
			});
		this.sub = this.filterService
			.getServices()
			.subscribe((data) => (this.servicesFilterData = data));

		this._prepareFilterData();
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['currentLang'].currentValue) {
			if (this.sub) {
				this.sub.unsubscribe();
			}
			this.filterService
				.getServices(changes['currentLang'].currentValue)
				.subscribe((dataRes) => (this.servicesFilterData = [...dataRes]));
		}
	}

	applyFilter(): void {
		this.onFilter.emit(this.filterData);
	}
	reset() {
		this.filterData = {
			services: [],
			statuses: [],
			activeTask: null,
			requestDateAfter: '',
			requestDateBefore: '',
		};
		this.onFilter.emit(null);
	}

	handleStatus(selection, clearFilterStatus = true) {
		if (clearFilterStatus) this.filterData.statuses = [];
		this.statusFilterData = [];
		this.sub = this.filterService
			.getStatuses(selection.id)
			.pipe(
				switchMap((data) =>
					of(Object.entries(data).map(([key, value]) => ({ id: key, name: value })))
				)
			)
			.subscribe((data) => {
				this.statusFilterData = data;
			});
	}

	private _prepareFilterData() {
		const data = { ...this.filterData, ...this.fromQueryString() };
		const { requestDateAfter, requestDateBefore, services } = this.filterData;

		for (let p in this.filterData) {
			if (data[p.toString()]) {
				this.filterData[p.toString()] = data[p.toString()];
			}
		}

		if (requestDateAfter) {
			this.filterData.requestDateAfter = new Date(this.filterData.requestDateAfter).toString();
		}
		if (requestDateBefore) {
			this.filterData.requestDateBefore = new Date(this.filterData.requestDateBefore).toString();
		}
		if (services) {
			this.handleStatus({ id: this.filterData.services }, false);
		}
	}
}