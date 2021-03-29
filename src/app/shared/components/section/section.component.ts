import { Injector } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent extends BaseComponent implements OnInit {

  @Input() sectionTitle;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

}
