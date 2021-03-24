import { Component, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Formio } from 'formiojs';
import { KeycloakService } from 'keycloak-angular';
import { SessionService } from './session.service';
import { SwitchLangService } from './switch-lang.service';
import { Platform } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rms';

  logo = '';
  loggedIn = false;
  userDetails;

  constructor(
    private keycloakService: KeycloakService,
    public translate: TranslateService,
    public switchLangService: SwitchLangService,
    private sessionService: SessionService,
    private configService: ConfigService,
    public platform: Platform,
    private changeRef: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {
    this.configService.loadConfig().then(config => {
      if (config.logo) {
        this.logo = `${environment.cms.api.master}${config.logo.path}`;
      } else {
        this.logo = '/assets/logo.png';
      }
    });
    const DelayPlugin = {
      priority: 100,
      preRequest: (requestArgs) => {
        return new Promise((resolve, reject) => {
          if (this.loggedIn) {
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
                  // requestArgs.opts.header.append('BE-Authorization', `bearer ${token}`);
                  requestArgs.opts.header.set('Authorization', `bearer ${token}`);
                } else {
                  requestArgs.opts.header.append('Authorization', `bearer ${token}`);
                }
              }
              if (requestArgs.type === 'submission') {
                requestArgs.opts.header.append('content-type', `application/json`);
                requestArgs.opts.header.append('Authorization', `bearer ${token}`);
              }
              resolve(true);
            });
          } else {
            const token = this.sessionService.getAnonymousToken();
            if (!requestArgs.opts) {
              requestArgs.opts = {};
            }
            if (!requestArgs.opts.header) {
              requestArgs.opts.header = new Headers();
            }
            if (requestArgs.type !== 'submission' && requestArgs.type !== 'form') {
              if (requestArgs.opts.header.has('authorization')) {
                // requestArgs.opts.header.append('BE-Authorization', `bearer ${token}`);
                requestArgs.opts.header.set('Authorization', `bearer ${token}`);
              } else {
                requestArgs.opts.header.append('Authorization', `bearer ${token}`);
              }
            }
            if (requestArgs.type === 'submission') {
              requestArgs.opts.header.append('content-type', `application/json`);
              requestArgs.opts.header.append('Authorization', `bearer ${token}`);
            }
            resolve(true);
          }
        });
      }
    };

    Formio.registerPlugin(DelayPlugin, 'delay');
  }

  handleAnonymous() {
    if (!this.loggedIn) {
      this.sessionService.loginAnonymous();
    }

  }
  async ngOnInit() {

    this.switchLangService.changeLang(this.switchLangService.getSelectedLang());

    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.sessionService.loadUserProfile();
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.handleAnonymous();
    this.keycloakService.keycloakEvents$.subscribe(async () => {
      if (await this.keycloakService.isLoggedIn()) {
        // window.location.reload();
        this.zone.run(async () => {
          this.userDetails = await this.sessionService.loadUserProfile();
          this.loggedIn = true;

        });
      } else {
        this.zone.run(() => {
          this.loggedIn = false;
          this.router.navigate(['/']).then(() => {
            this.handleAnonymous();

            //window.location.reload();
          });
        });

      }
      /*  if (await this.keycloakService.isLoggedIn()) {
        this.userDetails = await this.sessionService.loadUserProfile();
        this.loggedIn = true;
        this.changeRef.detectChanges();
      } else {
        this.loggedIn = false;
        this.changeRef.detectChanges();
        this.router.navigate(['/']);
      }
       */
    });

  }

  async doLogout() {
    await this.keycloakService.logout();
  }


  login() {

    this.keycloakService.login();

  }

}
