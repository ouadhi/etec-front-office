import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isObject } from 'util';

@Component({
  selector: 'app-more-info',
  templateUrl: 'more-info.component.html',
  styleUrls: ['more-info.component.scss'],
}
)

export class MoreInfoComponent implements OnInit {

  @Input() data;
  constructor(private translate: TranslateService) { }


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
    const translation = this.translate.instant(`forms.common.${key}`);
    if (translation === `forms.common.${key}`) {
      return key;
    } else {
      return translation;
    }
  }
}
