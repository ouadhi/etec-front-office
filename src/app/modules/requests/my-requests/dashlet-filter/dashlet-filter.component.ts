import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FilterService } from '../../filter.service';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
    selector: 'app-dashlet-filter',
    templateUrl: './dashlet-filter.component.html',
    styleUrls: ['./dashlet-filter.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({ 'max-height': '350px', opacity: 1, display: 'block' })),
            state('out', style({ 'max-height': '0px', opacity: 0, display: 'none' })),
            transition('*=>in', animate('300ms')),
            transition('*=>out', animate('200ms'))
        ])]
})
export class DashletFilterComponent extends BaseComponent implements OnInit {
    // public requestNames = [];
    // public departments = [];
    // public statuses = [];


    public servicesFilterData = [];
    public statusFilterData;

    /**
     * Filter Object
     */
    filterData = {
        services: [],
        statuses: [],
        activeTask: null,
        requestDateAfter: '',
        requestDateBefore: ''

    };
    @Input() show = false;
    @Output() filter: EventEmitter<any> = new EventEmitter();

    constructor(public injector: Injector,
        private filterService: FilterService) { super(injector); }

    applyFilter() {
        this.filter.next(this.filterData);
    }
    reset() {
        this.filterData = {
            services: [],
            statuses: [],
            activeTask: null,
            requestDateAfter: '',
            requestDateBefore: ''
        };
        this.filter.next({});
    }

    handleStatus(selection) {
        this.filterData.statuses = [];
        this.statusFilterData = [];
        this.sub = this.filterService.getStatuses(selection.id).subscribe((data => {
            this.statusFilterData = Object.keys(data).map(item => ({ id: item, name: data[item] }));
        }));
    }
    ngOnInit() {

        this.sub = this.filterService.getServices().subscribe(data => this.servicesFilterData = data);
        this.sub = this.route.params.subscribe(params => {
            this.loggerService.log(params);
            if (params.u === '1') {
                this.filterData.activeTask = true;
                this.applyFilter();
            }
        });
    }
}
