
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { isNumber } from 'util';


@Injectable({
    providedIn: 'root'
})
export class DashletFilterAdapter {
    constructor(private datePipe: DatePipe) {
    }
    adapt(item: any) {
        const query = Object.assign({}, {
            'requestDate.greaterOrEqualThan': item.requestDateAfter,
            'requestDate.lessOrEqualThan': item.requestDateBefore,
            'cmmnStatus.in': item.statuses,
            'serviceId.in': item.services,
            sort: item.sort,
            page: item.page,
            size: item.size
        });
        Object.keys(query).forEach((key) => (query[key] == null || !query[key].length && !isNumber(query[key])) && delete query[key]);

        return (query);
    }
}
