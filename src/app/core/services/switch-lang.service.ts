import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SwitchLangService {

  currentLang;
  defaultLang = 'ar';

  constructor(public translate: TranslateService, private titleService: Title) { }

  /**
   * Fix Dom Direction - localization
   */
  fixDom(dir) {
    document.documentElement.setAttribute('dir', dir);
  }

  changeLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.fixDom(this.translate.instant('dir'));
    this.translate.onLangChange.subscribe((data) => {
      this.fixDom(data.translations.dir);
      this.titleService.setTitle(this.translate.instant('LAYOUT.TITLE'));
    });
  }

  getTranslated(string, source = null) {
    if (!string) return '';
    const sourceString = source ? (source + '.' + string.trim()) : string.trim();
    const translated = this.translate.instant(sourceString);
    return translated === sourceString ? string : translated;
  }

  getSelectedLang() {
    if (localStorage.getItem('lang') == 'ar' || localStorage.getItem('lang') == 'en') {
      return localStorage.getItem('lang');
    } else {
      return this.defaultLang;
    }
  }

  get current(): string {
    return this.getSelectedLang();
  }
}
