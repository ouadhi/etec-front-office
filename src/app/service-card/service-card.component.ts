import { Component, OnInit, Input } from '@angular/core';
import { SwitchLangService } from '../switch-lang.service';
 
 

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

  constructor(
    public switchLangService: SwitchLangService,
  ) { }

  ngOnInit() {
  }

}
