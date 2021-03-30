import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LifeCycleService } from '../life-cycle-service.config';
import { BaseComponent } from '../../../shared/components/base.component';
import { environment } from 'src/environments/environment';
import { RequestsService } from '../../requests/requests.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    private requestsService: RequestsService) { super(injector); }

  id: any;

  data: any;
  comments: any;
  segments: any;
  stats = 0;
  isLoggedIn = false;
  active = false;
  department = {
    'departmentName_ar': '',
    'departmentName_en': ''
  }

  public assets_url: string = environment.cms.api.master;
  // public assets_url:string = 'http://localhost:8080';

  // public lifeCycleService:LifeCycleService



  ngOnInit() {
    this.keycloakService.isLoggedIn().then(data => {
      this.isLoggedIn = data;
    })
    this.sub = this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.load(this.id);
    });

  }

  load(id) {

    this.sub = this.servicesService.getService(id).subscribe(
      (data) => {
        this.data = data.entries[0];
        this.sub = this.requestsService.getRequestsCount(this.data.key).subscribe(count => {
          this.stats = count;
        });
        if (this.data.lifeCycle == LifeCycleService.PUBLISHED) {
          this.active = true;
        }
        const ids: Array<string> = [];

        this.data.beneficiaries.forEach(elementParent => {

          elementParent.segments.forEach(element => {
            ids.push(element._id);
          });

        });



        this.sub = this.servicesService.getSegmentsByIds(ids).subscribe(data => this.segments = data.entries);
        this.sub = this.servicesService.getComments(id).subscribe(data => this.comments = data.entries);

        this.sub = this.servicesService.getCollectionEntryById('department', '_id', this.data.category.department._id).subscribe(
          (data) => {
            this.loggerService.log('depart', data)
            this.department['departmentName_ar'] = data.entries[0].departmentName_ar;
            this.department['departmentName_en'] = data.entries[0].departmentName_en;
          }
        )
      },
      () => { },
      () => {

      });

  }

}
