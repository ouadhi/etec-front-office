import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { InOutAnimation } from 'src/app/core/animations/in-out.animation';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  // styleUrls: ['./manage-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [InOutAnimation]
})
export class ManagePasswordComponent extends BaseComponent implements OnInit {
  verify = false;
  languages = [
    { name: 'ENGLISH', code: 'en' },
    { name: 'ARABIC', code: 'ar' }
];

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
  }

  get currentLang() {
    const lang = this.languages.find(lang => lang.code === this.switchLangService.getSelectedLang());
    return lang ? lang.name.toLocaleUpperCase() : '';
}
}
