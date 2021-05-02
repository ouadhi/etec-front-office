import { LoggerService } from './services/logger.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SharedModule } from '../shared/shared.module';
import { Wso2Interceptor } from './interceptors/wso2.inteceptor';
import { ConfigService } from './services/config.service';
import { SessionService } from './services/session.service';
import { createExternalService } from './helpers/external-service.helper';
import { getFormioEnvironment } from './helpers/formio-enviroment.helper';
import { initializer } from './helpers/initializer.helper';
import { DatePipe } from '@angular/common';
import { FormioAppConfig, FormioTranslate, ExternalService } from 'src/formio/src/public_api';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { PaginatorI18n } from './paginator-i18n';

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
            provide: HTTP_INTERCEPTORS,
            useClass: Wso2Interceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService, SessionService, Platform, ConfigService, LoggerService]
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
            provide: MatPaginatorIntl, deps: [TranslateService],
            useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
        },
    ],
})
export class CoreModule { }