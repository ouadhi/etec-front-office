import { registerRatingComponent } from 'src/formio/src/lib/custom-component/components/rating-wrapper/rating-wrapper.formio';
import { Injector, OnInit, ViewEncapsulation,Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

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
  }

  ngOnInit() {
    
  }

}
