import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';

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
export class DashletFilterComponent implements OnInit {
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
    constructor(private filterService: FilterService, public route: ActivatedRoute) { }

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
        if (selection.length === 1) {
            this.filterData.statuses = [];
            this.filterService.getStatuses(selection[0].id).subscribe((data => {
                this.statusFilterData = Object.keys(data).map(item => ({ id: item, name: data[item] }));
            }));
        } else {
            this.filterData.statuses = [];
            this.statusFilterData = [];
        }

    }
    ngOnInit() {

        this.filterService.getServices().subscribe(data => this.servicesFilterData = data);
        this.route.params.subscribe(params => {
            console.log(params);
            if (params.u === '1') {
                this.filterData.activeTask = true;
                this.applyFilter();
            }
        });
    }
}
