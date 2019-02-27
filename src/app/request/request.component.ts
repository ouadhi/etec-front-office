import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

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
      this.loadRequest(this.id);
   });

  }


  loadRequest(id){
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
