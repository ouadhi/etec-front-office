
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';

import { FilterPipeModule } from 'ngx-filter-pipe';

import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';

import { SlideshowModule } from 'ng-simple-slideshow';

import { StarRatingModule } from 'angular-star-rating';

// material
// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { PageComponent } from './page/page.component';
import { SectionComponent } from './section/section.component';
import { RequestComponent } from './request/request.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

// Components & Module added by imad
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicModule, Platform } from '@ionic/angular';
import { DashletFilterComponent } from './dashlet-filter/dashlet-filter.component';
import { DashletFilterOppComponent } from './dashlet-filter-opp/dashlet-filter-opp.component';
import { DashletTableComponent } from './dashlet-table/dashlet-table.component';
import { DashletTableOppComponent } from './dashlet-table-opp/dashlet-table-opp.component';
import { SelectComponent } from './select/select.component';

import { NgSelectModule } from '@ng-select/ng-select';

import { DatePipe } from '@angular/common';
import { CaseActivitiesComponent } from './case-activities/case-activities.component';
import { FormioModule, ExternalService, FormioAppConfig, FormioTranslate } from 'dp-formio';
import { environment } from 'src/environments/environment';
import { PaginatorI18n } from './paginator-i18n';

import { MainPageComponent } from './main-page/main-page.component';

import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsItemUiComponent } from './news-item-ui/news-item-ui.component';
import { NewsSecctionComponent } from './main-page/news-section/news-section.component';

import { AdsSecctionComponent } from './main-page/ads-section/ads-section.component';
import { AdsDetailsComponent } from './ads-details/ads-details.component';
import { ProfileComponent } from './profile/profile.component';
import { AddOpportunityComponent } from './opportunities/add-opportunity/add-opportunity.component';
import { RequestTaskComponent } from './request-task/request-task.component';
import { ViewOpportunityComponent, MessageDialog } from './opportunities/view-opportunity/view-opportunity.component';
import { AllOpportunitiesComponent } from './opportunities/all-opportunities/all-opportunities.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HasRoleDirective } from './has-role.directive';
import { SessionService } from './session.service';
import { ApplyOpportunityComponent } from './opportunities/apply-opportunity/apply-opportunity.component';
import { Wso2Interceptor } from './wso2.inteceptor';
import { AppliedOpportunityComponent } from './opportunities/applied-opportunity/applied-opportunity.component';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsIndexComponent } from './notifications-index/notifications-index.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { RequestInfoDialogComponent } from './request-info/request-info.dialog';
import { RequestQueryComponent } from './request-query/request-query.component';
import { AnonymousInterceptor } from './anonymous.inteceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ConfigService } from './config.service';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {

  }
  getTranslation(lang: string) {
    const languages = {
      ar: 'frontoffice_ar',
      en: 'frontoffice_en'
    };
    try {
      return this.http.get<any>(
        `${environment.cms.api.master}/api/singletons/get/${languages[lang]}`, {})
        .pipe(
          map((data) => {
            if (data.translations && Object.keys(data.translations).length === 0) {
              throw new Error('Translations Empty');
            }
            return data.translations;
            //  return  { ...data[1], forms: { ...data[1].forms, ...JSON.parse(data[0].data.textArea).forms } };

          })
        );
    } catch (e) {
      console.warn(e);
      return this.http.get<any>(
        `./assets/i18n/${lang}.json`,
      ).pipe(data => {
        return data;
      });
    }
  }

}

export function createExternalService(http: HttpClient) {
  return new ExternalService(http);
}
export function getFormioEnv() {
  return environment.formio;
}

@NgModule({
  declarations: [
    AppComponent,
    ServiceCatalogComponent,
    ServiceDetailsComponent,
    ServiceCardComponent,
    PageComponent,
    SectionComponent,
    RequestComponent,
    MyRequestsComponent,
    RequestDetailsComponent,
    SelectComponent,
    DashletFilterComponent,
    DashletFilterOppComponent,
    DashletTableComponent,
    DashletTableOppComponent,
    CaseActivitiesComponent,
    MainPageComponent,
    NewsSecctionComponent,
    NewsDetailsComponent,
    NewsItemUiComponent,
    AdsSecctionComponent,
    AdsDetailsComponent,
    ProfileComponent,
    AddOpportunityComponent,
    ViewOpportunityComponent,
    RequestTaskComponent,
    AllOpportunitiesComponent,
    NotFoundComponent,
    HasRoleDirective,
    ApplyOpportunityComponent,
    AppliedOpportunityComponent,
    MessageDialog,
    NotificationsIndexComponent,
    NotAllowedComponent,
    RequestInfoDialogComponent,
    RequestQueryComponent
  ],
  imports: [
    CommonModule,
    KeycloakAngularModule,
    MatNativeDateModule,
    NgSelectModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    FilterPipeModule,
    SlideshowModule,
    StarRatingModule.forRoot(),

    // material
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    }),
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // Formio implementation Module Import
    FormioModule,
    NotificationsModule,
    NgxCaptchaModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Wso2Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AnonymousInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, SessionService, Platform, ConfigService]
    },
    { provide: FormioAppConfig, useFactory: (getFormioEnv) },
    {
      provide: FormioTranslate,
      useClass: TranslateService
    },
    {
      provide: ExternalService,
      deps: [HttpClient],
      useFactory: (createExternalService)

    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialog, RequestInfoDialogComponent]
})
export class AppModule {

}
