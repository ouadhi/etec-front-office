import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { IImage } from 'ng-simple-slideshow';
import { combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/formio/src/public_api';
import { BaseComponent } from '../../../shared/components/base.component';
import { RequestsService } from '../../requests/requests.service';

@Component({
	selector: 'app-service-catalog',
	templateUrl: './service-catalog.component.html',
	// styleUrls: ['./service-catalog.component.scss']
	encapsulation: ViewEncapsulation.None,
})
export class ServiceCatalogComponent extends BaseComponent implements OnInit {
	dataMostUsed: any;
	data: any[];
	totalResult: number;
	departments: object;
	categories: object;
	isList: boolean;
	segments: any[];
	segmentType;
	segmentInput: object;
	disabled = [];
	tags: any[];
	tagsInput: object;
	hasTask = false;
	requestsTotalCount: string;
	env = environment;
	public keyword = '';
	loading = true;
	dataFilters: any = {
		category: { _id: null, department: { _id: null } },
		segmentsGroup_inline: [],
		tags_inline: {},
	};
	filtered = [];
	public imagesSlider: IImage[];

	userSegments: string[] = [];
	isLoggedIn = false;
	showDashboardCounters = environment.showDashboardCounters;

	constructor(
		public injector: Injector,
		private requestsService: RequestsService,
		private userService: UserService,
		private keycloak: KeycloakService
	) {
		super(injector);
	}

	trackByFn(index, item) {
		return item._id;
	}

	ngOnInit() {
		this.isList = false;
		this.sub = this.keycloakService.keycloakEvents$.subscribe(async () => {
			this.zone.run(() => {
				this.ngOnInit();
			});
		});
		this.getUserRequests();

		/**
		 * It is not part of the template

	  	his.loadBanners(); // not used in template
		  this.mostUsed();
		 */

		this.search();
		this.prepareFiltersFetch(); // this.prepareFilters(this.userSegments);
		this.keycloakService.isLoggedIn().then((loggedIn) => {
			if (loggedIn) {
				this.isLoggedIn = true;
				this.sub = this.requestsService.getRequests({ activeTask: true }).subscribe((data) => {
					if (data.items.length) {
						this.hasTask = true;
					}
				});
			}
		});
	}

	getUserRequests() {
		const params = {
			page: 0,
			size: 10,
			sort: 'requestDate,desc',
			sortBy: 'requestDate',
			sortDirection: 'desc',
		};

		return this.requestsService.getRequests(params).subscribe((res: any) => {
			if (res) {
				this.requestsTotalCount = res.totalCount;
			}
		});
	}

	isDisabled(a, b) {
		const bool =
			this.disabled.includes(a._id) ||
			(!this.segmentInput[a._id][b._id] &&
				this.dataFilters.segmentsGroup_inline[0] &&
				this.dataFilters.segmentsGroup_inline[0][a._id] &&
				Object.keys(this.segmentInput[a._id]).length - 1 ===
					Object.keys(this.dataFilters.segmentsGroup_inline[0][a._id]).length);
		return bool;
	}

	doFilter = (item, index, array) => {
		let category = true;
		let department = true;
		let segment = false;
		let tags = true;
		let keyword = false;

		if (!category) {
			return false;
		}

		if (!department) {
			return false;
		}

		if (this.dataFilters.category._id) {
			category = this.dataFilters.category._id === item.category._id;
		}

		if (this.dataFilters.category.department._id) {
			department =
				item.category.department &&
				this.dataFilters.category.department._id === item.category.department._id;
		}

		if (this.dataFilters.$or && this.dataFilters.$or.length) {
			this.dataFilters.$or.forEach((element) => {
				const key = Object.keys(element)[0];
				if (!element[key] || item[key]?.includes(element[key])) {
					keyword = true;
					return false;
				}
			});
		} else {
			keyword = true;
		}
		if (!keyword) {
			return false;
		}

		if (this.dataFilters.tags_inline && Object.keys(this.dataFilters.tags_inline).length) {
			tags = false;
			Object.keys(this.dataFilters.tags_inline).forEach((key) => {
				if (item.tags_inline[key]) {
					tags = true;
					return false;
				} else {
				}
			});
		}
		if (!tags) {
			return false;
		}
		if (this.dataFilters.segmentsGroup_inline.length) {
			const set = this.dataFilters.segmentsGroup_inline[0];
			if (item.segmentsGroup_inline)
				item.segmentsGroup_inline.forEach((itemSet) => {
					const allBools = [];
					Object.keys(set).forEach((key, index) => {
						allBools[index] = false;
						const bool = Object.keys(set[key]).some((v) => Object.keys(itemSet).includes(v));
						if (bool) {
							allBools[index] = bool;
							return false;
						}
					});
					if (!allBools.includes(false)) {
						segment = true;
						return false;
					}
				});
		} else {
			segment = true;
		}
		if (!segment) {
			return false;
		}

		return department && category && segment && keyword && tags;
	};

	// not used yet
	loadBanners() {
		this.sub = this.servicesService.getBanners().subscribe((data) => {
			this.imagesSlider = [];
			data.entries.forEach((element) => {
				const item = {
					url: `${environment.cms}/storage/uploads/${element.url.path}`,
					href: element.href,
				};

				this.imagesSlider.push(item);
			});
		});
	}
	// not used yet
	mostUsed() {
		this.dataMostUsed = [];
		this.sub = this.servicesService.getServices().subscribe((data) => {
			this.dataMostUsed = data.entries;
		});
	}

	// prepare filter to be displayed

	prepareFilters(userSegments) {
		this.sub = combineLatest([
			this.servicesService.getSegmentType(),
			this.servicesService.getSegments(),
		]).subscribe((results) => {
			this.segmentType = results[0].entries;

			this.segments = results[1].entries;
			this.loggerService.log(userSegments);
			this.disabled = [];
			this.segmentType.forEach((type, j) => {
				const newObj = {};
				const innerObj = (newObj[type._id] = {});
				this.segments.forEach((element, i) => {
					if (element.activation && type._id === element.segmentType._id) {
						if (userSegments.includes(element._id) || userSegments.includes(element.key)) {
							this.disabled.push(type._id);
							this.loggerService.log('ok?');
							innerObj[element._id] = true;
						} else {
							innerObj[element._id] = false;
						}
					}
				});
				this.segmentInput = { ...this.segmentInput, ...newObj };
				// this.segments.forEach(element => element.isDisabled = this.isDisabled(type, element));
			});

			this.filterSegment();
		});

		this.sub = combineLatest([
			this.servicesService.getDepartments(),
			this.servicesService.getTags(),
			this.servicesService.getCategories(),
		]).subscribe(([departments, tags, categories]) => {
			this.departments = departments.entries;
			this.categories = categories.entries;
			this.tags = tags.entries;
			if (tags) {
				this.tags.forEach((element, i) => {
					const newObj = {};
					newObj[element._id] = false;
					this.tagsInput = { ...this.tagsInput, ...newObj };
				});
			}
		});
		return true;
	}

	// get search from server-side Plus transform result object
	// and add two new keys : 1st (segments_inline -> for beneficiaries), 2nd (tags_inline -> for tags)
	search() {
		this.sub = this.servicesService.getServices().subscribe((data) => {
			this.loading = false;
			this.filtered = this.data = data?.entries;
			this.totalResult = data?.entries?.length;
			// transform data structure
			this.data.forEach((element, i) => {
				// change segment object to object of arrays with new key
				this.data[i].segmentsGroup_inline = this._prepareSegmentsObject(element);

				// change tag object to array with new key
				this.data[i].tags_inline = this._prepareTagsObject(element);
			});
		});
	}

	// action filter for department
	changeTap(event, data) {
		const _id = +event >= 0 ? data[event]._id : null;
		this.filterDepartment(_id);
	}
	filterDepartment(_id = null) {
		this.dataFilters.category.department._id = _id;
		this.filterCategory();
	}

	// action filter for category
	filterCategory(_id = null) {
		this.dataFilters.category._id = _id;
		this.filtered = this.filterPipe.transform(this.data, this.doFilter);
	}

	// action filter for segment(beneficiaries)
	filterSegment() {
		// clear array
		this.dataFilters.segmentsGroup_inline = [];
		const set = {};

		// convert to array
		for (const key in this.segmentInput) {
			if (this.segmentInput.hasOwnProperty(key)) {
				for (const key1 in this.segmentInput[key]) {
					if (this.segmentInput[key].hasOwnProperty(key1)) {
						// only if checked
						if (this.segmentInput[key][key1] === true) {
							if (!set[key]) {
								set[key] = {};
							}
							set[key][key1] = true;
						}
					}
				}
			}
		}
		this.dataFilters.segmentsGroup_inline.push(set);
		this.filtered = this.filterPipe.transform(this.data, this.doFilter);
	}

	// action filter for tags
	filterTag() {
		// clear array content
		this.dataFilters.tags_inline = {};

		// convert to array
		for (const key in this.tagsInput) {
			if (this.tagsInput.hasOwnProperty(key)) {
				// only if checked
				if (this.tagsInput[key] === true) {
					this.dataFilters.tags_inline[key] = true;
				}
			}
		}
		this.filtered = this.filterPipe.transform(this.data, this.doFilter);
	}

	changeTagStatus(id) {
		this.tagsInput[id] = !this.tagsInput[id];
		this.filterTag();
	}

	// action filter for keyword
	filterKeyword() {
		this.dataFilters.$or = [
			{ _id: this.keyword },
			{ serviceName_ar: this.keyword },
			{ serviceName_en: this.keyword },
			{ description_ar: this.keyword },
			{ description_en: this.keyword },
			{ primaryService_ar: this.keyword },
			{ primaryService_en: this.keyword },
			{ conditionsAndRequirements_ar: this.keyword },
			{ conditionsAndRequirements_en: this.keyword },
			{ requiredDocs_ar: this.keyword },
			{ requiredDocs_en: this.keyword },
		];
		this.filtered = this.filterPipe.transform(this.data, this.doFilter);
	}

	// reset filters
	resetFilters() {
		this.keyword = '';
		this.filterKeyword();
		(this.dataFilters.segmentsGroup_inline = []), (this.dataFilters.tags_inline = {});

		this.tagsInput = [];
		this.segmentInput = [];
		this.segmentType.forEach((type, j) => {
			const newObj = {};
			const innerObj = (newObj[type._id] = {});
			this.segments.forEach((element, i) => {
				if (element.activation && type._id === element.segmentType._id) {
					if (this.userSegments.includes(element._id)) {
						this.loggerService.log('ok?');
						innerObj[element._id] = true;
					} else {
						innerObj[element._id] = false;
					}
				}
			});
			this.segmentInput = { ...this.segmentInput, ...newObj };
		});

		this.filterSegment();
	}

	// apply filter for loggedIn user
	async prepareFiltersFetch() {
		if (await this.keycloakService.isLoggedIn()) {
			this.sub = this.requestsService.getListOfUserSegments().subscribe(
				(data) => {
					this.userSegments = data;
					this.prepareFilters(this.userSegments);
				},
				async (err) => {
					const data = await this.userService.getTokenData(
						this.isLoggedIn ? await this.keycloak.getToken() : null
					);
					this.prepareFilters(data.roles || this.userSegments);
				}
			);
		} else {
			this.prepareFilters(this.userSegments);
		}
	}

	private _prepareTagsObject(element: any) {
		const tags_inline = {};
		if (element.tag && element.tag.length > 0) {
			element.tag.forEach((element2) => {
				tags_inline[element2._id] = true;
			});
		}
		return tags_inline;
	}

	private _prepareSegmentsObject(element: any) {
		let segmentsGroup_inline = [];
		if (element.beneficiaries.length > 0) {
			element.beneficiaries.forEach((element2) => {
				segmentsGroup_inline.push(element2.segments);
			});

			const segments = segmentsGroup_inline;
			segmentsGroup_inline = [];
			segments.forEach((segmentSet) => {
				const set = {};
				segmentSet.forEach((segment) => {
					set[segment._id] = true;
				});
				segmentsGroup_inline.push(set);
			});
		}
		return segmentsGroup_inline;
	}
}
