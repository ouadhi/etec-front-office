import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

/**
 *
 */
@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    // tslint:disable-next-line:variable-name
    private _config = null;
    constructor(private http: HttpClient, private translate: TranslateService) {
    }

    getAppConfig(queryParams = {}): Observable<any> {
        const endpoint = `${environment.cms.api.master}${environment.cms.appConfig.endpoint}?filter[_id]=${environment.cms.appConfig.id}`;
        return this.http.post<any>(endpoint,
            {

            }).pipe(
                map(resp => (resp)),
                catchError((e) => {
                    console.error(e);
                    return e;
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
                document.getElementById('favicon').setAttribute('href', `${environment.cms.api.master}${this._config[key].path}`);
            }
        });
    }

}
