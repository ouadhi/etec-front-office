import { Component, OnInit, Input } from '@angular/core';
import { SwitchLangService } from '../switch-lang.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() pageTitle?;
  @Input() pageTitleNarrow?;
  @Input() hasBackButton?;
    
  constructor(
    public switchLangService: SwitchLangService,
  ) { 
    
  }

  ngOnInit() {
  }

  back(){
    window.history.back()
  }

}
