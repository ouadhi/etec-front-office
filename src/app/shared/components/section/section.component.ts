import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  // styleUrls: ['./section.component.scss']
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent extends BaseComponent implements OnInit {

  @Input() sectionTitle;
  @Input() sectionCard = true;
  @Input() showContainer = true;
  @Input() hasPadding = true;
  @Input() TypeB = false;
  @Input() NoBack = false;
  @Input() titleClass = "sub-main-title";

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

}
