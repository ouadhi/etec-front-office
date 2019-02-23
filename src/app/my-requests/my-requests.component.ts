import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service'

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private requestsService: RequestsService
    ) { }

  data:any;

  ngOnInit() {


    this.requestsService.getMyRequests('test').subscribe(data => this.data = data.entries)          

  }

}
