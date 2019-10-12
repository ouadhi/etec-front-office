import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';
import { SwitchLangService } from './switch-lang.service';

import { Formio } from 'formiojs';
import { AccountService } from './account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent implements OnInit {
  title = 'rms';


  loggedIn = false;
  userDetails: KeycloakProfile;

  constructor(
    private keycloakService: KeycloakService,
    public translate: TranslateService,
    public switchLangService: SwitchLangService,
    private accountService: AccountService
  ) {
    console.log('.');
    const DelayPlugin = {
      priority: 100,
      preRequest: (requestArgs) => {
        return new Promise((resolve, reject) => {
          this.keycloakService.getToken().then(token => {
            console.log(requestArgs);
            if (!requestArgs.opts) {
              requestArgs.opts = {};
            }
            if (!requestArgs.opts.header) {
              requestArgs.opts.header = new Headers();
            }
            if (requestArgs.type !== 'submission' && requestArgs.type !== 'form') {
              if (requestArgs.opts.header.has('authorization')) {
                requestArgs.opts.header.append('BE-Authorization', `bearer ${token}`);
                // requestArgs.opts.header.set('Authorization', `bearer ${token}`);
              } else {
                requestArgs.opts.header.append('Authorization', `bearer ${token}`);
              }
            }
            if (requestArgs.type === 'submission') {
              requestArgs.opts.header.append('content-type', `application/json`);
              requestArgs.opts.header.append('Authorization', `bearer ${token}`);
            }
            resolve();
          });
        });
      }
    };

    Formio.registerPlugin(DelayPlugin, 'delay');
  }


  async ngOnInit() {

    this.switchLangService.changeLang(this.switchLangService.getSelectedLang());

    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.accountService.getAccount().toPromise()
        .then(result => { console.log(result); return result; }); // await this.keycloakService.loadUserProfile();
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
