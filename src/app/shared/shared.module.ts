import { HasRoleDirective } from './directives/has-role.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { IonicModule } from '@ionic/angular';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SlideshowModule } from 'ng-simple-slideshow';
import { StarRatingModule } from 'angular-star-rating';
import { ToastrModule } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TranslateModule } from '@ngx-translate/core';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SectionComponent } from './components/section/section.component';
import { SelectComponent } from './components/select/select.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PageComponent } from './components/page/page.component';
import { NotificationsButtonComponent } from './components/notifications/notifications-button/notifications-button.component';
import { NotificationItemComponent } from './components/notifications/notification-item/notification-item.component';
import { NotificationOptionsComponent } from './components/notifications/notification-options/notification-options.component';
import { NotificationsModalComponent } from './components/notifications/notifications-modal/notifications-modal.component';
import { RouterModule } from '@angular/router';
import { FormioModule } from 'src/formio/src/public_api';
import { HeaderComponent } from './components/header/header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeAr from '@angular/common/locales/ar';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { RequestFeedbackComponent } from './components/request-feedback/request-feedback.component';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeAr, 'ar');

@NgModule({
	declarations: [
		NotAllowedComponent,
		NotFoundComponent,
		RequestFeedbackComponent,
		PageComponent,
		SectionComponent,
		PageTitleComponent,
		SelectComponent,
		NotificationsModalComponent,
		NotificationsButtonComponent,
		NotificationItemComponent,
		NotificationOptionsComponent,
		HeaderComponent,
		TimeAgoPipe,
		LocalizedDatePipe,
		HasRoleDirective,
		FooterComponent,
		FeedbackModalComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MaterialModule,
		NgSelectModule,
		IonicModule.forRoot({
			menuType: 'push',
		}),
		FilterPipeModule,
		SlideshowModule,
		StarRatingModule.forRoot(),
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
			timeOut: 5000,
		}),
		FormioModule,
		NgxCaptchaModule,
		TranslateModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MaterialModule,
		NgSelectModule,
		IonicModule,
		FilterPipeModule,
		SlideshowModule,
		StarRatingModule,
		FooterComponent,
		ToastrModule,
		FormioModule,
		NgxCaptchaModule,
		TranslateModule,
		RequestFeedbackComponent,
		NotAllowedComponent,
		NotFoundComponent,
		PageComponent,
		SectionComponent,
		PageTitleComponent,
		SelectComponent,
		NotificationsModalComponent,
		NotificationsButtonComponent,
		NotificationItemComponent,
		NotificationOptionsComponent,
		HeaderComponent,
		TimeAgoPipe,
		LocalizedDatePipe,
		HasRoleDirective,
	],
	entryComponents: [
		NotificationsModalComponent,
		NotificationOptionsComponent,
		FeedbackModalComponent,
	],
	providers: [],
})
export class SharedModule {}
