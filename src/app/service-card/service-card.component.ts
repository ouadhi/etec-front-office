import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {

  @Input() id:number;
  @Input() cardTitle:string;
  @Input() text:string;
  
  random:number;

  constructor() { }

  ngOnInit() {
  }

}
