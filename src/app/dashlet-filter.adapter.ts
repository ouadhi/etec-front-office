
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { isNumber } from 'util';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class DashletFilterAdapter {
    constructor(private datePipe: DatePipe, public translate: TranslateService) {
    }
    adapt(item: any) {
        const query = Object.assign({}, {
            language: this.translate.currentLang,
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
