import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SwitchLangService } from '../switch-lang.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileId: string;
  data: any;
  segmentType;
  segments;
  marital;
  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private session: SessionService,
    public trans: SwitchLangService
  ) { }

  ngOnInit() {

    this.profileId = this.session.getUsername();
    this.loadProfile(this.profileId);
  }

  loadProfile(id) {
    this.servicesService.getProfile(id).subscribe(
      (data) => {
        this.data = data;
        this.servicesService.getSegmentType().subscribe(data1 => {
          this.segmentType = data1.entries;
          this.data.segments.map(item => {
            const items = this.segmentType.filter(itemFull => (item.typeId === itemFull.key));
            if (items.length) {
              return item.segmentType = items[0];
            }
            return item;
          });
        });
        this.servicesService.getSegments().subscribe(segments => {
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
