import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { LifeCycleService } from '../config';
import { environment } from '../../environments/environment';
import { SwitchLangService } from './../switch-lang.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {




  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    public trans: SwitchLangService
  ) { }

  id: any;
  sub: any;

  data: any;
  comments: any;
  segments: any;
  stats = 10;

  active = false;
  public assets_url: string = environment.cms.api.assets;
  // public assets_url:string = 'http://localhost:8080';

  // public lifeCycleService:LifeCycleService



  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.load(this.id);
      this.getStats(this.id);
    });
  }

  load(id) {
    this.servicesService.getService(id).subscribe(
      (data) => {
        this.data = data.entries[0];
        const ids: Array<string> = [];
        this.data.beneficiaries.forEach(element => {
          ids.push(element._id);
        });
        this.servicesService.getSegmentsByIds(ids).subscribe(data => this.segments = data.entries);
        this.servicesService.getComments(id).subscribe(data => this.comments = data.entries);
        console.log(LifeCycleService.PUBLISHED);
        console.log(this.data.lifeCycle);
        if (this.data.lifeCycle === LifeCycleService.PUBLISHED) {
          this.active = true;
        }
      },
      () => { },
      () => {

      });

  }

  getStats(id) {
    // this.servicesService.getStats(id).subscribe(data=>this.stats = data.entries.length);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
