import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-ads-details',
  templateUrl: './ads-details.component.html',
  styleUrls: ['./ads-details.component.css']
})
export class AdsDetailsComponent extends BaseComponent implements OnInit {

  adsId: string;
  data: any;
  assetPath = `${environment.cms}/storage/uploads`;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.adsId = params['id'];
      this.loadAds(this.adsId);
    });
  }

  loadAds(id) {
    this.sub = this.servicesService.getSingleAds(id).subscribe(
      (data) => {
        this.data = data.entries[0];
      })
  }

}
