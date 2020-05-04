import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SwitchLangService } from '../switch-lang.service';



@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceCardComponent implements OnInit {

  @Input() id: number;
  @Input() cardTitle: string;
  @Input() text: string;


  random: number;

  constructor(
    public switchLangService: SwitchLangService,
  ) { }

  ngOnInit() {
  }

}
