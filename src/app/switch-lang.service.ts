import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchLangService {

  currentLang;
  defaultLang = 'ar';

  constructor(public translate: TranslateService) { }

  /**
   * Fix Dom Direction - localization
   */
  fixDom(dir) {
    document.documentElement.setAttribute('dir', dir);
  }

  changeLang(lang){
    this.currentLang = lang;
    localStorage.setItem('lang',lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.fixDom(this.translate.instant('dir'));
    this.translate.onLangChange.subscribe((data) => {
      this.fixDom(data.translations.dir);
    });
  }

  getSelectedLang(){
    if(localStorage.getItem('lang') =='ar' || localStorage.getItem('lang') =='en'){
      return localStorage.getItem('lang');
    }else{
      return this.defaultLang;
    }
  }

  _key(key){
    return key+'_'+this.getSelectedLang();
  }

}
