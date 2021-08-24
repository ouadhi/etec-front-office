import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ETECService } from 'src/app/core/services/etec.service';
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

  constructor(public injector: Injector,
    private etecService: ETECService) { super(injector); }

  async ngOnInit() {
    const etecData = await this.etecService.getEtecData();
    this.type = etecData.type;
    if (this.type == this.ProfileTypes.entityProfileModel || this.type == this.ProfileTypes.individualProfileModel) {
      this.profileId = this.sessionService.getUsername();
    }
    else if (this.type == this.ProfileTypes.educationalInstitutionInformation) {
      const group = etecData.groups[0];
      this.generatedId = group.split('_')[0];
    }
  }

}
