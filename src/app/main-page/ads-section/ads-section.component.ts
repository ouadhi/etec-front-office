import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { environment } from 'src/environments/environment';
import { SwitchLangService } from 'src/app/switch-lang.service';

@Component({
  selector: 'app-ads-section',
  templateUrl: './ads-section.component.html',
  styleUrls: ['./ads-section.component.css']
})
export class AdsSecctionComponent implements OnInit {

  ads:any;
  constructor( private servicesService:ServicesService,public trans:SwitchLangService ) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews(){
    this.servicesService.getAds().subscribe(data=>{
          return this.ads = data.entries
      });
    }

}
