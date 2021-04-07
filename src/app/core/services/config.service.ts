import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })

export class ConfigService {
    // tslint:disable-next-line:variable-name
    private _config = null;
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
    }];

    constructor(private http: HttpClient, private translate: TranslateService) {
    }

    getAppConfig(queryParams = {}): Observable<any> {
        const endpoint = `${environment.cms.api.master}${environment.cms.appConfig.endpoint}?filter[_id]=${environment.cms.appConfig.id}`;
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
            if (this._config) {
                resolve(this._config);
                return;
            }

            this.getAppConfig().toPromise()
                .then(async (result) => {
                    this._config = result.entries[0];
                    resolve(this._config);
                },
                    () => reject('App Config could not be loaded.')
                );
        });
    }
    setupEssentials() {
        Object.keys(this._config).forEach(key => {
            if (key.includes('primary') || key.includes('accent') || key.includes('background')) {
                document.documentElement.style.setProperty(`--${key}`, this._config[key]);
                document.documentElement.style.setProperty(`--${key}-parts`,
                    this._config[key].replace('rgb', '').replace('(', '').replace(')', ''));
            } else if (key.includes('favicon')) {
                document.getElementById('favicon').setAttribute('href', `${environment.cms.api.master}/${this._config[key].path}`);
            }
        });
        if (!this._config.favicon) {
            document.getElementById('favicon').setAttribute('href', `/assets/favicon.ico`);
        }
    }

}
