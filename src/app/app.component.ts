import { Injector, OnInit, ViewEncapsulation, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

import { registerTemplateComponent } from 'src/formio/src/public_api';
import { registerTableTreeComponent } from 'src/formio/src/public_api';
import { registerAssessmentComponent } from 'src/formio/src/public_api';
import { registerProccessRequirmentsComponent } from 'src/formio/src/lib/features/formio/custom-component/components/proccess-requirments-wrapper/proccess-requirments-wrapper.formio';
// import { registerProccessRequirmentsComponent } from 'src/formio/src/public_api';
import { registerMapComponent } from 'src/formio/src/lib/features/formio/custom-component/components/map-wrapper/map-wrapper.formio';
import { NavigationStart } from '@angular/router';
// import { registerMapComponent } from 'src/formio/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {
  fullPage = false;

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);
    registerTableTreeComponent(injector);
    registerAssessmentComponent(injector);
    registerTemplateComponent(injector);
    registerProccessRequirmentsComponent(injector);
    registerMapComponent(injector);
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.fullPage = event.url.includes('reset-password');
      }
    });
  }

  ngOnInit() {

  }

}
