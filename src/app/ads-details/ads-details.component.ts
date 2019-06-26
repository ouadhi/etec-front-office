import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SwitchLangService } from '../switch-lang.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ads-details',
  templateUrl: './ads-details.component.html',
  styleUrls: ['./ads-details.component.css']
})
export class AdsDetailsComponent implements OnInit {

  adsId:string;
  data: any;
  assetPath = environment.cms.api.assets;

  constructor(
    private route:ActivatedRoute,
    private servicesService:ServicesService,
    public trans:SwitchLangService
    ) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
         this.adsId = params['id']; 
         this.loadAds(this.adsId);
      });
    }

    loadAds(id){
      this.servicesService.getSingleAds(id).subscribe(
        (data)=>{
          this.data = data.entries[0];
        })
    }

}
