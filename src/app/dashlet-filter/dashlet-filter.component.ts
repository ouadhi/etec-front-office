import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { FilterService } from '../filter.service';

@Component({
    selector: 'app-dashlet-filter',
    templateUrl: './dashlet-filter.component.html',
    styleUrls: ['./dashlet-filter.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({ 'max-height': '300px', opacity: 1, display: 'block' })),
            state('out', style({ 'max-height': '0px', opacity: 0, display: 'none' })),
            transition('*=>in', animate('300ms')),
            transition('*=>out', animate('200ms'))
        ])]
})
export class DashletFilterComponent implements OnInit {
    public requestNames = [];
    public departments = [];
    public statuses = [];

    /**
     * Filter Object
     */
    filterData = {
        requestNames: [],
        caseTypes: [],
        statuses: [],
        requestDateAfter: null,
        requestDateBefore: null

    };
    @Input() show = false;
    @Output() filter: EventEmitter<any> = new EventEmitter();
    constructor(private filterService: FilterService) { }

    applyFilter() {
        this.filter.next(this.filterData);
    }
    reset() {
        this.filterData = {
            requestNames: [],
            caseTypes: [],
            statuses: [],
            requestDateAfter: null,
            requestDateBefore: null
        };
        this.filter.next({});
    }


    ngOnInit() {
        this.filterService.getDepartments().subscribe(data => this.departments = data);
        this.filterService.getRequestNames().subscribe(data => this.requestNames = data);

        /*
        this.filterService.getBranches().subscribe(data => this.branches = data);
        this.filterService.getCaseTypes().subscribe(data => this.caseTypes = data);
        this.filterService.getSegmentTypes().subscribe(data => this.segmentTypes = data);
        this.filterService.getBeneficiaries().subscribe(data => this.beneficiaries = data);
        */
    }
}
