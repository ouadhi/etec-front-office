import { SharedModule } from './shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderHelper } from './core/helpers/translate-loader.helper';
import { KeycloakAngularModule } from 'keycloak-angular';
import { FormioDemoComponent } from './modules/formio-demo/formio-demo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
	declarations: [AppComponent, FormioDemoComponent],
	imports: [
		CoreModule,
		SharedModule,
		AppRoutingModule,
		KeycloakAngularModule,
		NgbModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: TranslateLoaderHelper,
				deps: [HttpClient],
			},
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [],
})
export class AppModule {}
