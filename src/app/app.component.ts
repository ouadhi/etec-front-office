import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Formio } from 'formiojs';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BaseComponent } from './shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'rms';

  logo = '';
  loggedIn = false;
  userDetails;

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);

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
              this.loggerService.log(requestArgs);
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
