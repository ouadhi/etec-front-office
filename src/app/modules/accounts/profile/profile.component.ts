import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
    this.sub = this.servicesService.getProfile(id).subscribe(
      (data) => {
        this.data = data;
        this.sub = this.servicesService.getSegmentType().subscribe(data1 => {
          this.segmentType = data1.entries;
          this.data.segments.map(item => {
            const items = this.segmentType.filter(itemFull => (item.typeId === itemFull.key));
            if (items.length) {
              return item.segmentType = items[0];
            }
            return item;
          });
        });
        this.sub = this.servicesService.getSegments().subscribe(segments => {
          this.segments = segments.entries;
          this.data.segments.map(item => {
            const items = this.segments.filter(itemFull => (item.value === itemFull.key));
            if (items.length) {
              return item.segment = items[0];
            }
            return item;
          });
          this.marital = this.segments.filter(itemFull => (this.data.maritalState.toUpperCase() === itemFull.key));
          if (this.marital.length) {
            this.marital = this.marital[0];
          }
        });
        console.log(this.data);
      });
  }

}
