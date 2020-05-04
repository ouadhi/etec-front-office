import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { FilterService } from '../filter.service';
import { environment } from '../../environments/environment'

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
        requestDateAfter: '',
        requestDateBefore: ''

    };
    @Input() show = false;
    @Output() filter: EventEmitter<any> = new EventEmitter();
    constructor(private filterService: FilterService) { }

    applyFilter() {
        this.filter.next(this.filterData);
    }
    reset() {
        this.filterData = {
            services: [],
            statuses: [],
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
    }
}
