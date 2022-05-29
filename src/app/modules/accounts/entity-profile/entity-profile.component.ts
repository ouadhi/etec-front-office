import { I } from '@angular/cdk/keycodes';
import { Injector, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ResourceNameService, UserService } from 'src/formio/src/public_api';
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
    educationalInstitutionInformation: 'educationalinstitutioninformation',
    facilityInformation: 'facilityInformation'
  }

  type: string;
  profileId: string;
  generatedId: string;
  etecData: any;
  submission: any;
  loading = true;

  constructor(public injector: Injector,
    private userService: UserService,
    private resourceNameService: ResourceNameService,
    private keycloak: KeycloakService) { super(injector); }

  async ngOnInit() {
    this.etecData = await this.userService.getUserData(await this.keycloak.getToken());
    this.submission = { data: this.etecData };
    this.type = this.etecData.user_type;
    if (this.type == this.ProfileTypes.entityProfileModel || this.type == this.ProfileTypes.individualProfileModel) {
      this.profileId = this.sessionService.getUsername();
    }
    else if ([this.ProfileTypes.educationalInstitutionInformation, this.ProfileTypes.facilityInformation].includes(this.type)) {
      const group = this.etecData.user_groups[0];
      this.generatedId = group.split('_')[0];
    }
    this.checkIfProfileExist();
  }

  private checkIfProfileExist() {
    if (this.generatedId && this.type) {
      this.sub = this.resourceNameService.checksSubmissionExistance(this.type, 'generatedId', this.generatedId)
        .subscribe(data => {
          if (!data?.length) {
            this.generatedId = null;
            this.profileId = null;
          }
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    } else this.loading = false;
  }

}
