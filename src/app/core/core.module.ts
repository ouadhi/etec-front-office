import { SwitchLangService } from 'src/app/core/services/switch-lang.service';
import { LoggerService } from './services/logger.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';
import { createExternalService } from './helpers/external-service.helper';
import { getFormioEnvironment } from './helpers/formio-enviroment.helper';
import { initializer } from './helpers/initializer.helper';
import { DatePipe } from '@angular/common';
import { FormioAppConfig, FormioTranslate, ExternalService } from 'dp-formio';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorI18n } from './paginator-i18n';
import { FormioAuthConfig, FormioAuthService } from 'dp-formio';
import { LicenseInterceptor } from './interceptors/license.interceptor';


export const FormAuthConfig: FormioAuthConfig = {
    login: {
        form: 'user/login'
    },
    register: {
        form: 'user/register'
    }
};
@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
    ],
    exports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        DatePipe,

        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService, SessionService, Platform, ConfigService, LoggerService, SwitchLangService]
        },
        { provide: FormioAppConfig, useFactory: (getFormioEnvironment) },
        {
            provide: FormioTranslate,
            useClass: TranslateService
        },
        {
            provide: ExternalService,
            deps: [HttpClient],
            useFactory: (createExternalService)

        },
        {
            provide: MatPaginatorIntl,
            useClass: PaginatorI18n
        },
        FormioAuthService,
        { provide: HTTP_INTERCEPTORS, useClass: LicenseInterceptor, multi: true },
        { provide: FormioAuthConfig, useValue: FormAuthConfig },
    ],
})
export class CoreModule { }
