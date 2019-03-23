import { Component } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rms';

  loggedIn: boolean = false;
  userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService, public translate: TranslateService) { }

  async ngOnInit() {
    this.translate.setDefaultLang('ar');
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.loggedIn = true;
    }
  }

  async doLogout() {
    await this.keycloakService.logout();
  }


  login() {

    this.keycloakService.login();

  }

}
