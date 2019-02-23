import { NgModule } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { AppFormioComponent } from './components/formio/formio.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
/**
 * FormioModule imported where needed
 * AppFormioComponent & FormComponent are exported
 */
@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [AppFormioComponent, FormComponent, FormioAlertsComponent, FormioLoaderComponent],
  providers: [
    FormioLoader,
    FormioAlerts
  ],
  entryComponents: [
    FormComponent,
  ],
  exports: [
    AppFormioComponent, FormComponent, FormioLoaderComponent]
})

export class FormModule { }
