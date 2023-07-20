import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.css']
})
export class NewsSecctionComponent extends BaseComponent implements OnInit {

  news: any;
  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.sub = this.servicesService.getNews().subscribe(data => {
      return this.news = data.entries
    });
  }

}
