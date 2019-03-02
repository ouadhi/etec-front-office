import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute
  ) { }

  id: any;
  sub: any;

  data:any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
