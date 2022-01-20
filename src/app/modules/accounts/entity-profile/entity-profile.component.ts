import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/formio/src/public_api';
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
  etecData: any;
  submission: any;

  constructor(public injector: Injector,
    private userService: UserService,
    private keycloak: KeycloakService) { super(injector); }

  async ngOnInit() {
    this.etecData = await this.userService.getUserData(await this.keycloak.getToken());
    this.submission = { data: this.etecData };
    this.type = this.etecData.user_type;
    if (this.type == this.ProfileTypes.entityProfileModel || this.type == this.ProfileTypes.individualProfileModel) {
      this.profileId = this.sessionService.getUsername();
    }
    else if (this.type == this.ProfileTypes.educationalInstitutionInformation) {
      const group = this.etecData.user_groups[0];
      this.generatedId = group.split('_')[0];
    }
  }

}
