import { NgModule } from '@angular/core';
import { AppFormioComponent } from './components/formio/formio.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { ExternalService } from './external.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
/**
 * FormioModule imported where needed
 * AppFormioComponent & FormComponent are exported
 */
@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [AppFormioComponent, FormioAlertsComponent, FormioLoaderComponent],
  providers: [
    FormioLoader,
    FormioAlerts,
    ExternalService
  ],
  entryComponents: [
    AppFormioComponent, FormioLoaderComponent
  ],
  exports: [
    AppFormioComponent, FormioLoaderComponent]
})

export class FormModule { }
