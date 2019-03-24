import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rms';

  loggedIn = false;
  userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService, public translate: TranslateService) { }
  /**
   * Fix Dom Direction - localization
   */
  fixDom(dir) {
    document.documentElement.setAttribute('dir', dir);
  }
  async ngOnInit() {
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    this.fixDom(this.translate.instant('dir'));
    this.translate.onLangChange.subscribe((data) => {
      this.fixDom(data.translations.dir);
    });
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
