import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { ServicesService } from '../services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public imagesSlider:IImage[];

  constructor( private servicesService:ServicesService ) { }

  ngOnInit() {
    this.loadBanners();
  }

  loadBanners(){
    this.servicesService.getBanners().subscribe(data=>{

      this.imagesSlider=[];
      data.entries.forEach(element => {
        let item={
        url :`${environment.cms.api.assets}${element.url.path}`,
        href : element.href
      }
          
        this.imagesSlider.push(item)
      });

    });
  }

}
