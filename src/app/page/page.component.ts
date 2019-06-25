import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() pageTitle?;
  @Input() hasBackButton?;
    
  constructor() { }

  ngOnInit() {
  }

  back(){
    window.history.back()
  }

}
