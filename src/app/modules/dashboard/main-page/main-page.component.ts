import { Component, Injector, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent extends BaseComponent implements OnInit {

  public imagesSlider: IImage[];

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.loadBanners();
  }

  loadBanners() {
    this.sub = this.servicesService.getBanners().subscribe(data => {

      this.imagesSlider = [];
      data.entries.forEach(element => {
        let item = {
          url: `${environment.cms}/storage/uploads/${element.url.path}`,
          href: element.href
        }

        this.imagesSlider.push(item)
      });

    });
  }

}
