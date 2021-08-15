import { registerRatingComponent } from 'src/formio/src/lib/custom-component/components/rating-wrapper/rating-wrapper.formio';
import { Injector, OnInit, ViewEncapsulation,Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';
import { registerTableTreeComponent } from 'src/formio/src/lib/custom-component/components/table-tree-wrapper/table-tree-wrapper.formio';
import { registerAssessmentComponent } from 'src/formio/src/lib/custom-component/components/assessment-wrapper/assessment-wrapper.formio';
import { registerTemplateComponent } from 'src/formio/src/lib/custom-component/components/template-wrapper/template-wrapper.formio';

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
