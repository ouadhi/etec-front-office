import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { RequestsService } from '../../requests/requests.service';
import { LifeCycleService } from '../life-cycle-service.config';

@Component({
	selector: 'app-service-details',
	templateUrl: './service-details.component.html',
	// styleUrls: ['./service-details.component.css']
	encapsulation: ViewEncapsulation.None,
})
export class ServiceDetailsComponent extends BaseComponent implements OnInit {
	constructor(public injector: Injector, private requestsService: RequestsService) {
		super(injector);
	}

	id: string;
	data: any;
	comments: any;
	segments: any;
	stats = 0;
	isLoggedIn = false;
	active = false;
	loading = true;
	department = {
		departmentName_ar: '',
		departmentName_en: '',
	};
	assets_url: string = environment.cms;
	env = environment;
	isApply = false;

	ngOnInit() {
		this.keycloakService.isLoggedIn().then((data) => {
			this.isLoggedIn = data;
		});
		this.isApply = this.route.snapshot.url.some(q => q.path == 'apply');
		this.sub = this.route.params.subscribe((params) => {
			this.id = params.id;
			this.loadData(this.id);
		});
	}

	loadData(id) {
		this.sub = this.servicesService
			.getService(id)
			.pipe(
				map((data) => data?.entries[0]),
				switchMap((res) =>
					combineLatest([
						of(res),
						this.requestsService.getRequestsCount(res?.key),
						this.servicesService.getComments(id),
						this.servicesService.getCollectionEntryById(
							'department',
							'_id',
							res?.category?.department?._id
						),
						this._getSegmentsByIds(res.beneficiaries),
					])
				)
			)
			.subscribe(([data, requestsCount, comments, collection, segments]) => {
				this.loading = false;
				this.data = data;
				this.stats = requestsCount;
				this.comments = comments.entries;
				this.segments = segments.entries;
				if (environment.skipServiceDetailsPage || this.isApply) {
					if ((this.isLoggedIn && this.data?.canAnonymousApply) || !this.data?.canAnonymousApply) {
						this.router.navigate(
							['/requests/request', this.data?.link,
								{
									serviceId: data?.key,
									serviceName_ar: data?.serviceName_ar,
									serviceName_en: data?.serviceName_en,
									_id: data?._id
								}
							]
							, { skipLocationChange: true }
						)
					} else if (!this.isLoggedIn && this.data?.canAnonymousApply) {
						this.router.navigate(
							['/requests/arequest', this.data?.link,
								{
									serviceId: data?.key,
									serviceName_ar: data?.serviceName_ar,
									serviceName_en: data?.serviceName_en,
									_id: data?._id
								}
							]
							, { skipLocationChange: true }
						)
					}
				}
				const { 0: department } = collection?.entries;
				this.department = {
					departmentName_ar: department?.departmentName_ar,
					departmentName_en: department?.departmentName_en,
				};
				if (this.data.lifeCycle == LifeCycleService.PUBLISHED) {
					this.active = true;
				}
			});
	}

	private _getSegmentsByIds(beneficiaries): Observable<string[]> {
		const ids = beneficiaries.reduce(
			(ids, element) => ids.concat(element?.segments?.map((seg) => seg._id)),
			[]
		);
		return this.servicesService.getSegmentsByIds(ids);
	}
}
