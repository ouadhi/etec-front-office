
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


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
          'status.in': item.statuses,
          'serviceId.in': item.services
        });
        Object.keys(query).forEach((key) => (query[key] == null || !query[key].length) && delete query[key]);
        return (query);
    }
}
