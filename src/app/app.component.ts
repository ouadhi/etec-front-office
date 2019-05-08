import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';
import { SwitchLangService } from './switch-lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rms';
  

  loggedIn = false;
  userDetails: KeycloakProfile;

  constructor(
    private keycloakService: KeycloakService, 
    public translate: TranslateService,
    public switchLangService: SwitchLangService
    ) { }


  async ngOnInit() {

    this.switchLangService.changeLang(this.switchLangService.getSelectedLang());

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
