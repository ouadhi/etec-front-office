import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })

export class ConfigService {
    style = 'locale-style';
    isStylesLoaded = false;
    isFontsLoaded = false;

    // tslint:disable-next-line:variable-name
    private config = null;
    private defaults = [{
        backgroundColor: 'rgb(235, 235, 235)',
        primary50: 'rgb(232, 243, 245)',
        primary100: 'rgb(197, 224, 230)',
        primary200: 'rgb(158, 204, 213)',
        primary300: 'rgb(119, 183, 196)',
        primary400: 'rgb(90, 167, 183)',
        primary500: 'rgb(61, 152, 170)',
        primary600: 'rgb(55, 144, 163)',
        primary700: 'rgb(47, 133, 153)',
        primary800: 'rgb(39, 123, 144)',
        primary900: 'rgb(26, 106, 127)',
        primaryA100: 'rgb(184, 239, 255)',
        primaryA200: '#85e3ff',
        primaryA400: 'rgb(82, 215, 255)',
        primaryA700: 'rgb(57, 209, 255)',
        primaryContrast50: 'rgb(0, 0, 0)',
        primaryContrast100: 'rgb(0, 0, 0)',
        primaryContrast200: 'rgb(0, 0, 0)',
        primaryContrast300: 'rgb(0, 0, 0)',
        primaryContrast400: 'rgb(0, 0, 0)',
        primaryContrast500: 'rgb(255, 255, 255)',
        primaryContrast600: 'rgb(255, 255, 255)',
        primaryContrast700: 'rgb(255, 255, 255)',
        primaryContrast800: 'rgb(255, 255, 255)',
        primaryContrast900: 'rgb(255, 255, 255)',
        primaryContrastA100: 'rgb(0, 0, 0)',
        primaryContrastA200: 'rgb(0, 0, 0)',
        primaryContrastA400: 'rgb(0, 0, 0)',
        primaryContrastA700: 'rgb(0, 0, 0)',
        accent50: 'rgb(230, 243, 240)',
        accent100: 'rgb(191, 224, 218)',
        accent200: 'rgb(149, 204, 194)',
        accent300: 'rgb(107, 184, 170)',
        accent400: 'rgb(75, 168, 151)',
        accent500: 'rgb(43, 153, 133)',
        accent600: 'rgb(38, 145, 125)',
        accent700: 'rgb(32, 134, 114)',
        accent800: 'rgb(26, 124, 104)',
        accent900: 'rgb(16, 107, 85)',
        accentA100: 'rgb(160, 255, 230)',
        accentA200: 'rgb(109, 255, 217)',
        accentA400: 'rgb(58, 255, 203)',
        accentA700: 'rgb(32, 255, 197)',
        accentContrast50: 'rgb(0, 0, 0)',
        accentContrast100: 'rgb(0, 0, 0)',
        accentContrast200: 'rgb(0, 0, 0)',
        accentContrast300: 'rgb(0, 0, 0)',
        accentContrast400: 'rgb(0, 0, 0)',
        accentContrast500: 'rgb(255, 255, 255)',
        accentContrast600: 'rgb(255, 255, 255)',
        accentContrast700: 'rgb(255, 255, 255)',
        accentContrast800: 'rgb(255, 255, 255)',
        accentContrast900: 'rgb(255, 255, 255)',
        accentContrastA100: 'rgb(0, 0, 0)',
        accentContrastA200: 'rgb(0, 0, 0)',
        accentContrastA400: 'rgb(0, 0, 0)',
        accentContrastA700: 'rgb(0, 0, 0)',
        primaryColor: '#00adc3',
        warningColor: '#f0b432',
        accentColor: '#0c7782',
        secondaryColor: '#666',
        greenColor: '#3aad6d',
        redColor: '#ff0000'
    }];

    constructor(private http: HttpClient, private translate: TranslateService) {
    }

    getAppConfig(queryParams = {}): Observable<any> {
        const endpoint = `${environment.cms}${environment.appConfig.endpoint}?filter[_id]=${environment.appConfig.id}`;
        return this.http.post<any>(endpoint,
            {

            }).pipe(
                map(resp => (resp)),
                catchError((e) => {
                    return from(
                        [{
                            entries: this.defaults
                        }]
                    );
                }));

    }

    async loadConfig(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.config) {
                resolve(this.config);
                return;
            }

            this.getAppConfig().toPromise()
                .then(async (result) => {
                    this.config = result.entries[0];
                    resolve(this.config);
                },
                    () => reject('App Config could not be loaded.')
                );
        });
    }
    setupEssentials() {
        Object.keys(this.config).forEach(key => {
            if (key.includes('primary') || key.includes('accent') || key.includes('background') || key.includes('Color')) {
                document.documentElement.style.setProperty(`--${key}`, this.config[key]);
                document.documentElement.style.setProperty(`--${key}-parts`,
                    this.config[key].replace('rgb', '').replace('(', '').replace(')', ''));
            } else if (key.includes('favicon') && this.config[key]) {
                document.getElementById('favicon').setAttribute('href', `${environment.cms}/${this.config[key].path}`);
            }
        });
        if (!this.config.favicon) {
            document.getElementById('favicon').setAttribute('href', `/assets/favicon.ico`);
        }
        if (this.config.name) {
            document.title = this.config.name;
        }
        if (this.config.fontFamily) {
            var customfont = new FontFace('customFont', `url(${this.config.fontFamily})`);
            customfont.load().then(loaded_face => {
                (document as any).fonts.add(loaded_face);
                document.body.style.fontFamily = '"customFont", "Quicksand", sans-serif';

                var head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style') as any;
                head.appendChild(style);
                const customFont = `html, body, h1, h2, h3, h4, h5, h6, p, span, div, section, b, strong, small, ul, ol, li, button, a, table, thead, tbody, tr, td, th, .mat-menu-item{font-family:"customFont", "Quicksand", sans-serif;}`;
                if (style.styleSheet) {
                    style.styleSheet.cssText = customFont;
                } else {
                    style.appendChild(document.createTextNode(customFont));
                }
            }).catch(error => {
                console.log(error);
            });
        }

        const stylesheet = document.createElement('link');

        stylesheet.addEventListener('load', () => {
            this.isStylesLoaded = true;
        });
        stylesheet.rel = 'stylesheet';
        stylesheet.href = this.style + '.css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);

        const endpoint = `${environment.cms}${environment.appConfig.customStyle}?filter[_id]=${environment.appConfig.customStyleId}`;
        this.http.post<any>(endpoint, {}).pipe(
            catchError((e) => {
                console.log(e);
                return null;
            })).subscribe(data => {
                if (!data || !data.entries) return;
                const css = data.entries[0].frontOffice;
                var head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style') as any;

                head.appendChild(style);

                style.type = 'text/css';
                if (style.styleSheet) {
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
            });
    }

    get logo() {
        if (!this.config || !this.config.logo) return null;
        return `${environment.cms}${this.config.logo.path}`;
    }

    get smallLogo() {
        if (!this.config || !this.config.smallLogo) return null;
        return `${environment.cms}${this.config.smallLogo.path}`;
    }

    get userAvatar() {
        if (!this.config || !this.config.userAvatar) return null;
        return `${environment.cms}${this.config.userAvatar.path}`;
    }
}
