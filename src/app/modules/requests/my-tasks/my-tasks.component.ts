import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-my-tasks',
	templateUrl: './my-tasks.component.html',
	// styleUrls: ['./my-tasks.component.scss']
	encapsulation: ViewEncapsulation.None,
})
export class MyTasksComponent extends BaseComponent {
	constructor(public injector: Injector, private requestsService: RequestsService) {
		super(injector);
	}

	data = {
		totalCount: null,
		items: {},
	};

	dashletCols = {
		number: { name: 'Id', sortable: true, width: '15%' },
		requestName: { name: 'Request Name', sortable: false, width: '30%' },
		requestDate: { name: 'Request Date', sortable: true, formatDate: true, width: '25%' },
		status: { name: 'Status', translationSource: 'STATUSES', sortable: true, width: '10%' },
		data: {
			name: 'Details',
			sortable: false,
			display: 'detailsButton',
			param1: 'id',
			width: '20%',
			condition: {
				filed: 'status',
				value: 'draft',
				name: 'Complete',
				link: '/requests/request',
				param1: 'id',
			},
		},
	};

	dashletService = (params) => {
		params.sort = params.sortBy + ',' + params.sortDirection;

		// DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
		if (params.requestDateAfter) {
			params.requestDateAfter =
				this.datePipe.transform(params.requestDateAfter, 'yyyy-MM-ddTHH:mm:ss') + 'z';
		} else {
			params.requestDateAfter = '';
		}

		// DUE TO Server do not accepet a format, only like this 1997-07-16T19:20:30.45+01:00
		if (params.requestDateBefore) {
			params.requestDateBefore =
				this.datePipe.transform(params.requestDateBefore, 'yyyy-MM-ddT') + '23:59:59z';
		} else {
			params.requestDateBefore = '';
		}

		this.replaceUrl(this.toQueryString(params));
		return this.requestsService.getRequests(params);
	};
}
