import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';
import { LifeCycleService } from '../config';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  
  

  constructor(
    private route:ActivatedRoute,
    private servicesService:ServicesService
    ) { }

  id: any;
  sub: any;

  data:any;
  comments:any;
  segments:any;
  
  active:boolean = false;
  public assets_url:string = environment.cms.api.assets;
  // public assets_url:string = 'http://localhost:8080';

  // public lifeCycleService:LifeCycleService
  
  

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; 
       this.load(this.id);
    });
  }

  load(id){
    this.servicesService.getService(id).subscribe(
      (data)=>{
        this.data = data.entries[0];
        let ids:Array<string>=[];
        this.data.beneficiaries.forEach(element => {
          ids.push(element._id);
          console.log(ids);
        });
        this.servicesService.getSegmentsByIds(ids).subscribe(data=>this.segments = data.entries)
        this.servicesService.getComments(id).subscribe(data=>this.comments = data.entries)

        if(this.data.lifeCycle == LifeCycleService.PUBLISHED){
          this.active = true;
        }
      },
      ()=>{},
      ()=>{
        
      })
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
