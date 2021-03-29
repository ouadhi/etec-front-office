import { Injector } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';
import { RequestsService } from '../../requests/requests.service';

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss']
})
export class ServiceCatalogComponent extends BaseComponent implements OnInit, OnDestroy {

  dataMostUsed: any;
  data: any[];
  totalResult: number;

  departments: object;
  categories: object;

  segments: any[];
  segmentType;
  segmentInput: object;
  disabled = [];
  tags: any[];
  tagsInput: object;
  hasTask = false;
  public keyword = '';

  dataFilters: any = {
    category: { _id: null, department: { _id: null } },
    segmentsGroup_inline: [],
    tags_inline: {}
  };
  filtered = [];
  public imagesSlider: IImage[];

  userSegments: string[] = [];

  constructor(public injector: Injector,
    private requestsService: RequestsService) { super(injector); }

  ngOnInit() {
    this.sub = this.keycloakService.keycloakEvents$.subscribe(async () => {
      this.zone.run(() => {
        this.ngOnInit();
      });
    });
    this.loadBanners();
    this.mostUsed();

    this.search();
    this.prepareFiltersFetch();  // this.prepareFilters(this.userSegments);
    this.keycloakService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.sub = this.requestsService.getRequests({ activeTask: true }).subscribe(data => {
          if (data.items.length) {
            this.hasTask = true;
          }
        });
      }
    });
  }
  ngOnDestroy() {
    // this.keycloakService.keycloakEvents$.unsubscribe();
  }
  isDisabled(a, b) {

    const bool = this.disabled.includes(a._id) || (!this.segmentInput[a._id][b._id] &&
      this.dataFilters.segmentsGroup_inline[0] &&
      this.dataFilters.segmentsGroup_inline[0][a._id] &&
      (Object.keys(this.segmentInput[a._id]).length - 1) ===
      (Object.keys(this.dataFilters.segmentsGroup_inline[0][a._id]).length));
    if (
      this.segmentInput[a._id][b._id] &&
      this.dataFilters.segmentsGroup_inline[0] &&
      this.dataFilters.segmentsGroup_inline[0][a._id]
    ) {

    }

    return bool;
  }
  trackByFn(index, item) {
    return item._id;
  }
  doFilter = (item, index, array) => {
    let category = true;
    let department = true;
    let segment = false;
    let tags = true;
    let keyword = false;

    if (this.dataFilters.category._id) {
      category = this.dataFilters.category._id === item.category._id;

    }
    if (!category) {
      return false;
    }
    if (this.dataFilters.category.department._id) {
      department = (item.category.department) && this.dataFilters.category.department._id === item.category.department._id;
    }
    if (!department) {
      return false;
    }

    if (this.dataFilters.$or && this.dataFilters.$or.length) {
      this.dataFilters.$or.forEach(element => {
        const key = Object.keys(element)[0];
        if (!element[key] || item[key].includes(element[key])) {
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
      Object.keys(this.dataFilters.tags_inline).forEach(key => {
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
      item.segmentsGroup_inline.forEach((itemSet) => {
        const allBools = [];
        Object.keys(set).forEach((key, index) => {
          allBools[index] = false;
          const bool = Object.keys(set[key]).some(v => Object.keys(itemSet).includes(v));
          if (bool) {
            allBools[index]
              = bool;
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

  }
  loadBanners() {
    this.sub = this.servicesService.getBanners().subscribe(data => {

      this.imagesSlider = [];
      data.entries.forEach(element => {
        const item = {
          url: `${environment.cms.api.assets}${element.url.path}`,
          href: element.href
        };

        this.imagesSlider.push(item);
      });

    });
  }

  mostUsed() {
    this.dataMostUsed = [];
    this.sub = this.servicesService.getServices().subscribe(data => {
      this.dataMostUsed = data.entries;
    });
  }


  // prepare filter to be displayed

  prepareFilters(userSegments) {



    this.sub = this.servicesService.getSegmentType().subscribe(data1 => {
      this.segmentType = data1.entries;
      this.sub = this.servicesService.getSegments().subscribe(data => {
        this.segments = data.entries;
        console.log(userSegments);
        this.disabled = [];
        this.segmentType.forEach((type, j) => {
          const newObj = {};
          const innerObj = newObj[type._id] = {};
          this.segments.forEach((element, i) => {
            if (element.activation && type._id === element.segmentType._id) {
              if (userSegments.includes(element._id)) {
                this.disabled.push(type._id);
                console.log('ok?');
                innerObj[element._id] = true;
              } else {
                innerObj[element._id] = false;
              }
            }
          });
          this.segmentInput = { ...this.segmentInput, ...newObj };
          this.segments.forEach(element=> element.isDisabled = this.isDisabled(type, element));
          // console.log(this.segmentInput);
        });

        this.filterSegment();

      });
    });

    this.sub = this.servicesService.getDepartments().subscribe(data => {
      this.departments = data.entries;
    });

    this.sub = this.servicesService.getTags().subscribe(data => {
      this.tags = data.entries;

      this.tags.forEach((element, i) => {
        const newObj = {};
        newObj[element._id] = false;
        this.tagsInput = { ...this.tagsInput, ...newObj };
      });
    });

    this.sub = this.servicesService.getCategories().subscribe(data => {
      this.categories = data.entries;
    });

    return true;

  }

  // get search from server-side Plus transform result object
  // and add two new keys : 1st (segments_inline -> for beneficiaries), 2nd (tags_inline -> for tags)
  search() {

    this.sub = this.servicesService.getServices().subscribe(data => {
      this.filtered = this.data = data.entries;
      this.totalResult = data.entries.length;

      // transform data structure
      this.data.forEach((element, i) => {

        // change segment object to object of arrays with new key
        let segmentsGroup_inline = [];
        if (element.beneficiaries.length > 0) {


          element.beneficiaries.forEach(element2 => {
            segmentsGroup_inline.push(element2.segments);
          });

          const segments = segmentsGroup_inline;
          segmentsGroup_inline = [];
          segments.forEach(segmentSet => {
            const set = {};
            segmentSet.forEach(segment => {
              set[segment._id] = true;
            });
            segmentsGroup_inline.push(set);
          });

        }
        this.data[i].segmentsGroup_inline = segmentsGroup_inline;

        // change tag object to array with new key
        const tags_inline = {};
        if (element.tag.length > 0) {
          element.tag.forEach(element2 => {
            tags_inline[element2._id] = true;
          });
        }
        this.data[i].tags_inline = tags_inline;

      });
    }
    );
  }

  // action filter for department
  filterDepartment(_id?) {
    if (_id) {
      this.dataFilters.category.department._id = _id;
    } else {
      this.dataFilters.category.department._id = null;
    }
    this.filterCategory();
  }

  // action filter for category
  filterCategory(_id?) {
    if (_id) {
      this.dataFilters.category._id = _id;
    } else {
      this.dataFilters.category._id = null;
    }
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
      { requiredDocs_en: this.keyword }
    ];
    this.filtered = this.filterPipe.transform(this.data, this.doFilter);
  }

  // reset filters
  resetFilters() {
    this.keyword = '';
    this.filterKeyword();
    this.dataFilters.segmentsGroup_inline = [],
      this.dataFilters.tags_inline = {};

    this.tagsInput = [];
    this.segmentInput = [];
    this.segmentType.forEach((type, j) => {
      const newObj = {};
      const innerObj = newObj[type._id] = {};
      this.segments.forEach((element, i) => {
        if (element.activation && type._id === element.segmentType._id) {
          if (this.userSegments.includes(element._id)) {
            console.log('ok?');
            innerObj[element._id] = true;
          } else {
            innerObj[element._id] = false;
          }
        }
      });
      this.segmentInput = { ...this.segmentInput, ...newObj };
      // console.log(this.segmentInput);
    });

    this.filterSegment();
  }

  // apply filter for loggedIn user
  async prepareFiltersFetch() {

    if (await this.keycloakService.isLoggedIn()) {
      this.sub = this.requestsService.getListOfUserSegments().subscribe(data => {
        this.userSegments = data;
        this.prepareFilters(this.userSegments);
      }, err => {
        this.prepareFilters(this.userSegments);
      });

    } else {
      this.prepareFilters(this.userSegments);
    }



  }

}
