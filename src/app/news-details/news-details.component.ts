import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SwitchLangService } from '../switch-lang.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  newsId:string;
  data: any;
  assetPath = environment.cms.api.assets;

  constructor(
    private route:ActivatedRoute,
    private servicesService:ServicesService,
    public trans:SwitchLangService
    ) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
         this.newsId = params['id']; 
         this.loadNews(this.newsId);
      });
    }

    loadNews(id){
      this.servicesService.getSingleNews(id).subscribe(
        (data)=>{
          this.data = data.entries[0];
        })
    }

}
