import { Component, OnInit, Input, ViewEncapsulation, Injector } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceCardComponent extends BaseComponent implements OnInit {

  @Input() id: number;
  @Input() cardTitle: string;
  @Input() text: string;


  random: number;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

}
