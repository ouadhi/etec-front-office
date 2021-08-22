import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-entity-profile',
  templateUrl: './entity-profile.component.html',
  // styleUrls: ['./entity-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EntityProfileComponent extends BaseComponent implements OnInit {

  type: string;
  profileId: string;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.type = localStorage.getItem('_type');
    if (this.type == 'entityprofilemodel') {
      this.profileId = this.sessionService.getUsername();
    }
  }

}
