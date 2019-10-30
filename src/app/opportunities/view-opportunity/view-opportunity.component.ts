import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.css']
})
export class ViewOpportunityComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private servicesService:ServicesService
    ) { }

  id: any;
  sub: any;
  data:any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; 
       this.load(this.id);
    });
  }
  
  load(id){
    this.servicesService.getOpportunity(id).subscribe(
      (data)=>{
        this.data = data.entries[0];
      }) 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
