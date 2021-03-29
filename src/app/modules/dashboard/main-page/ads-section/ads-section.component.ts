import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-ads-section',
  templateUrl: './ads-section.component.html',
  styleUrls: ['./ads-section.component.css']
})
export class AdsSecctionComponent extends BaseComponent implements OnInit {

  ads: any;
  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.servicesService.getAds().subscribe(data => {
      return this.ads = data.entries
    });
  }

}
