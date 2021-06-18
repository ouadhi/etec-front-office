import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { combineLatest, from } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class TranslateLoaderHelper implements TranslateLoader {
    constructor(private http: HttpClient) { }

    getTranslation(lang: string) {
        try {
            return combineLatest([
                this.http.get<any>(
                    `${environment.cms}/api/collections/get/i18n?filter[name]=frontoffice_${lang}`, {}).pipe(
                        tap(data => {
                            if (data && data.entries[0]) {
                                return data;
                            } else {
                                throw new Error('Translation List empty');
                            }
                        }),
                        catchError((err) => {
                            console.warn(err);
                            return this.http.get<any>(
                                `./assets/i18n/${lang}.json`,
                            ).pipe(
                                map(data => {
                                    return { entries: [{ translations: data }] };
                                }
                                ));
                        })),
                this.http.get<any>(
                    `${environment.cms}/api/collections/get/i18n?filter[name]=forms_${lang}`, {}).pipe(
                        tap(data => data),
                        catchError((err) => {
                            return from([
                                { entries: [] }
                            ]);
                        }))

            ])
                .pipe(
                    map((data) => {
                        if (data[0] && data[0].entries[0] && data[1] && data[1].entries[0]) {
                            const main = data[0].entries[0].translations;
                            const forms = data[1].entries[0].translations;
                            const translations = { ...main, forms: { ...main.forms, common: forms } };
                            return translations;
                        } else if (data[0] && data[0].entries[0]) {
                            return data[0].entries[0].translations;
                        }
                    })
                );
        } catch (e) {
            console.warn(e);
        }
    }

}