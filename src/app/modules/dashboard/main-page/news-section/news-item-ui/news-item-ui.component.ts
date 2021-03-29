import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-item-ui',
  templateUrl: './news-item-ui.component.html',
  styleUrls: ['./news-item-ui.component.scss']
})
export class NewsItemUiComponent implements OnInit {

  @Input() title;
  @Input() date;
  @Input() image;
  @Input() link;
  @Input() description;
  description_plainText;
  public assetPath = environment.cms.api.assets;
  
  constructor() {
    this.description_plainText = this.description;

   }


  maxTitleLength = 90;
  maxDescriptionLength = 160;

  ngOnInit() {
    this.description_plainText = this.description.replace(/<[^>]*>/g, '');
  }

}
