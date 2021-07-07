import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  // styleUrls: ['./page-title.component.scss']
  encapsulation: ViewEncapsulation.None
})
export class PageTitleComponent extends BaseComponent implements OnInit {

  @Input() title;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

}
