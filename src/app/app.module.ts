import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';

import { FilterPipeModule } from 'ngx-filter-pipe';

import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';

import { SlideshowModule } from 'ng-simple-slideshow';

import { StarRatingModule } from 'angular-star-rating';

//material
//Angular Material Components
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
import { IonicModule } from '@ionic/angular';
import { DashletFilterComponent } from './dashlet-filter/dashlet-filter.component';
import { DashletTableComponent } from './dashlet-table/dashlet-table.component';
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
import { ViewOpportunityComponent } from './opportunities/view-opportunity/view-opportunity.component';
<<<<<<< HEAD
import { AllOpportunitiesComponent } from './opportunities/all-opportunities/all-opportunities.component';
=======
import { NotFoundComponent } from './not-found/not-found.component';
>>>>>>> 767280a419099dbf30fa78d4f383fa3da0f720d3


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
    DashletTableComponent,
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
<<<<<<< HEAD
    AllOpportunitiesComponent
=======
    NotFoundComponent
>>>>>>> 767280a419099dbf30fa78d4f383fa3da0f720d3
  ],
  imports: [
    KeycloakAngularModule,
    MatNativeDateModule,
    NgSelectModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
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
    FormioModule
  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
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
  bootstrap: [AppComponent]
})
export class AppModule {

}
