import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService
  ) { }

  id: any;
  serviceId: any;
  formReady = false;
  sub: any;

  data: any;
  params;

  ngOnInit() {
    this.formReady = true;
  }

}
