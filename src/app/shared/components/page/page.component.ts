import { Injector } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent extends BaseComponent implements OnInit {

  @Input() pageTitle?;
  @Input() pageTitleNarrow?;
  @Input() hasBackButton?;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

  back() {
    window.history.back()
  }

}