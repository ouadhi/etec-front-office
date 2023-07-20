import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRouterModule } from './dashboard.router.module';
import { NewsItemUiComponent } from './main-page/news-section/news-item-ui/news-item-ui.component';
import { NewsSecctionComponent } from './main-page/news-section/news-section.component';
import { AdsSecctionComponent } from './main-page/ads-section/ads-section.component';
import { MainPageComponent } from './main-page/main-page.component';

/**
 * Notifications Module
 */
@NgModule({
  declarations: [
    MainPageComponent,
    AdsSecctionComponent,
    NewsSecctionComponent,
    NewsItemUiComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRouterModule,
  ]
})
export class DashboardModule { }
