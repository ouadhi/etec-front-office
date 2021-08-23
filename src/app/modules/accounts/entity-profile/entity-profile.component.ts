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

  ProfileTypes = {
    entityProfileModel: 'entityprofilemodel',
    individualProfileModel: 'individualprofilemodel',
    educationalInstitutionInformation: 'educationalinstitutioninformation'
  }

  type: string;
  profileId: string;
  generatedId: string;

  constructor(public injector: Injector) { super(injector); }

  ngOnInit() {
    this.type = localStorage.getItem('_type');
    if (this.type == this.ProfileTypes.entityProfileModel || this.type == this.ProfileTypes.individualProfileModel) {
      this.profileId = this.sessionService.getUsername();
    }
    else if (this.type == this.ProfileTypes.educationalInstitutionInformation) {
      const group = localStorage.getItem('_groups').split(',')[0];
      this.generatedId = group.split('_')[0];
    }
  }

}
