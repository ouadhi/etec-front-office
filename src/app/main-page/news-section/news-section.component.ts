import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { environment } from 'src/environments/environment';
import { SwitchLangService } from 'src/app/switch-lang.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.css']
})
export class NewsSecctionComponent implements OnInit {

  news:any;
  constructor( private servicesService:ServicesService,public trans:SwitchLangService ) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews(){
    this.servicesService.getNews().subscribe(data=>{
          return this.news = data.entries
      });
    }

}
