import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent extends BaseComponent implements OnInit {

  profileId: string;
  data: any;
  segmentType;
  segments;
  marital;
  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {

    this.profileId = this.sessionService.getUsername();
    this.loadProfile(this.profileId);
  }

  loadProfile(id) {
    this.sub = combineLatest([
      // this.servicesService.getProfile(id),
      this.servicesService.getSegmentType(),
      this.servicesService.getSegments()
    ]).subscribe(results => {
      this.data = {}; // TODO: get user info here

      this.segmentType = results[0].entries;
      this.data.segments.map(item => {
        const items = this.segmentType.filter(itemFull => (item.typeId === itemFull.key));
        if (items.length) {
          return item.segmentType = items[0];
        }
        return item;
      });

      this.segments = results[1].entries;
      this.data.segments.map(item => {
        const items = this.segments.filter(itemFull => (item.value === itemFull.key));
        if (items.length) {
          return item.segment = items[0];
        }
        return item;
      });
      this.marital = this.segments.filter(itemFull => (this.data.maritalState && this.data.maritalState.toUpperCase() === itemFull.key));
      if (this.marital.length) {
        this.marital = this.marital[0];
      }
    });
  }

}
