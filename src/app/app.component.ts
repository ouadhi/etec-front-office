import { registerRatingComponent } from 'dp-formio';
import { Injector, OnInit, ViewEncapsulation, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

import { registerTemplateComponent } from 'dp-formio';
import { registerTableTreeComponent } from 'dp-formio';
import { registerAssessmentComponent } from 'dp-formio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);
    registerRatingComponent(injector);
    registerTableTreeComponent(injector);
    registerAssessmentComponent(injector);
    registerTemplateComponent(injector);
  }

  ngOnInit() {

  }

}
