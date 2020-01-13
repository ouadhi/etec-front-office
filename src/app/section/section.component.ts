import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwitchLangService } from '../switch-lang.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() sectionTitle;

  constructor(
    public switchLangService: SwitchLangService,
  ) { }

  ngOnInit() {
  }

}
