import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { isObject } from 'util';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'app-more-info',
  templateUrl: 'more-info.component.html',
  // styleUrls: ['more-info.component.scss'],
  encapsulation: ViewEncapsulation.None
}
)

export class MoreInfoComponent extends BaseComponent implements OnInit {

  @Input() data;
  constructor(public injector: Injector) { super(injector) }


  ngOnInit(): void {

  }
  isObject(item) {
    return isObject(item);
  }
  objectKeys(item) {
    return Object.keys(item);
  }
  translateKey(key) {
    key = key.replace(/([A-Z])/g, ' $1').trim();
    key = key.charAt(0).toUpperCase() + key.slice(1);
    const translation = this.translateService.instant(`forms.common.${key}`);
    if (translation === `forms.common.${key}`) {
      return key;
    } else {
      return translation;
    }
  }
}
