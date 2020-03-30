import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { LifeCycleService } from '../config';
import { environment } from '../../environments/environment';
import { SwitchLangService } from './../switch-lang.service';
import { RequestsService } from '../requests.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {




  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    public keycloakService: KeycloakService,
    private requestsService: RequestsService,
    public trans: SwitchLangService,
    public translate: TranslateService
  ) { }

  id: any;
  sub: any;

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
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.load(this.id);
    });

  }

  load(id) {

    this.servicesService.getService(id).subscribe(
      (data) => {
        this.data = data.entries[0];
        this.requestsService.getRequestsCount(this.data.key).subscribe(count => {
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



        this.servicesService.getSegmentsByIds(ids).subscribe(data => this.segments = data.entries);
        this.servicesService.getComments(id).subscribe(data => this.comments = data.entries);

        this.servicesService.getCollectionEntryById('department', '_id', this.data.category.department._id).subscribe(
          (data) => {
            console.log('depart', data)
            this.department['departmentName_ar'] = data.entries[0].departmentName_ar;
            this.department['departmentName_en'] = data.entries[0].departmentName_en;
          }
        )
      },
      () => { },
      () => {

      });

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
