import { Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BaseComponent } from './shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {
  style = 'locale-style';
  isStylesLoaded = false;
  isFontsLoaded = false;

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);
  }

  ngOnInit() {
    // const fontName = this.configurationService.getConfig().fontName;
    // const headerColor = this.configurationService.getConfig().headerColor;
    // const bodyColor = this.configurationService.getConfig().bodyColor;
    // const footerColor = this.configurationService.getConfig().footerColor;
    // const textColor = this.configurationService.getConfig().textColor;
    // const style = this.configurationService.getConfig().style;

    const stylesheet = document.createElement('link');

    stylesheet.addEventListener('load', () => {
      // document.documentElement.style.setProperty('--font-name', fontName);
      // document.documentElement.style.setProperty('--header-color', headerColor);
      // document.documentElement.style.setProperty('--body-color', bodyColor);
      // document.documentElement.style.setProperty('--footer-color', footerColor);
      // document.documentElement.style.setProperty('--text-color', textColor);
      this.isStylesLoaded = true;
    });

    stylesheet.rel = 'stylesheet';
    stylesheet.href = this.style + '.css';
    document.getElementsByTagName('head')[0].appendChild(stylesheet);


    // const customStylesheet = document.createElement('link');
    // customStylesheet.rel = 'stylesheet';
    // customStylesheet.href = 'assets/custom.css';
    // document.getElementsByTagName('head')[0].appendChild(customStylesheet);

    // WebFontLoader.load({
    //   active: () => {
    //     this.isFontsLoaded = true;
    //   },
    //   google: {
    //     families: [fontName]
    //   }
    // });
  }

}
