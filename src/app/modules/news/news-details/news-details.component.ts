import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent extends BaseComponent implements OnInit {

  newsId: string;
  data: any;
  assetPath = environment.cms.api.assets;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.newsId = params['id'];
      this.loadNews(this.newsId);
    });
  }

  loadNews(id) {
    this.sub = this.servicesService.getSingleNews(id).subscribe(
      (data) => {
        this.data = data.entries[0];
      })
  }

}
