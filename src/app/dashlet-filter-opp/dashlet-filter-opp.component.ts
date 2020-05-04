import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { FilterService } from '../filter.service';
import { environment } from '../../environments/environment'

@Component({
    selector: 'app-dashlet-filter-opp',
    templateUrl: './dashlet-filter-opp.component.html',
    styleUrls: ['./dashlet-filter-opp.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({ 'max-height': '350px', opacity: 1, display: 'block' })),
            state('out', style({ 'max-height': '0px', opacity: 0, display: 'none' })),
            transition('*=>in', animate('300ms')),
            transition('*=>out', animate('200ms'))
        ])]
})
export class DashletFilterOppComponent implements OnInit {
    
    public servicesFilterData = [];
    public statusFilterData = environment.filter.data.status;

    /**
     * Filter Object
     */
    filterData = {
        name: '',
        number: '',
        city: [],
        employer: ''
    };
    cityFilterData= [
        {key:"الرياض",val:"0"},
        {key:"جدة",val:"1"},
        {key:"مكة",val:"2"},
        {key:"الدمام",val:"3"}
    ]
    @Input() show = false;
    @Output() filter: EventEmitter<any> = new EventEmitter();
    constructor(private filterService: FilterService) { }

    applyFilter() {
        this.filter.next(this.filterData);
    }
    reset() {
        this.filterData = {
            name: '',
            number: '',
            city: [],
            employer: ''
        };
        this.filter.next({});
    }


    ngOnInit() {
        //this.filterService.getServices().subscribe(data => this.servicesFilterData = data);
        
    }
}
