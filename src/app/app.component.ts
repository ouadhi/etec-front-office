import { Injector } from '@angular/core';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);
  }

}
