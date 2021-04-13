import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform, OnDestroy {

  static DEFAULT_LOCALE = 'en-US';
  static DEFAULT_DATE_FORMAT = 'dd MMMM yyyy hh:mm a';

  defaultLocale: string = LocalizedDatePipe.DEFAULT_LOCALE;
  defaultFormat: string = LocalizedDatePipe.DEFAULT_DATE_FORMAT;

  private onDestroy$ = new Subject<boolean>();

  constructor(public translateService: TranslateService) {
    this.defaultLocale = translateService.currentLang;
    this.translateService.onLangChange
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(event => {
        this.defaultLocale = event.lang;
      });
  }

  transform(value: any, format?: string, locale?: string): any {
    try {
      const actualFormat = format || this.defaultFormat;
      const actualLocale = locale || this.defaultLocale;
      const datePipe: DatePipe = new DatePipe(actualLocale);
      return datePipe.transform(value, actualFormat, 'GMT+3');
    } catch (e) {
      console.warn(e);
      return value;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}