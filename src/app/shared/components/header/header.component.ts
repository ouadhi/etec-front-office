import { Component, Injector, ViewEncapsulation } from "@angular/core";
import { Platform } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { BaseComponent } from "../base.component";
import { Formio } from 'formiojs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    // styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends BaseComponent {

    logo = '';
    loggedIn = false;
    userDetails;


    languages = [
        { name: 'ENGLISH', code: 'en' },
        { name: 'ARABIC', code: 'ar' }
    ];
    selectedLang = this.translateService.currentLang;

    constructor(public injector: Injector,
        public platform: Platform) {
        super(injector);

        this.configService.loadConfig().then(config => {
        });
        const DelayPlugin = {
            priority: 100,
            preRequest: (requestArgs) => {
                return new Promise((resolve, reject) => {
                    if (this.loggedIn) {
                        this.keycloakService.getToken().then(token => {
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
                        if (!requestArgs.opts) {
                            requestArgs.opts = {};
                        }
                        if (!requestArgs.opts.header) {
                            requestArgs.opts.header = new Headers();
                        }
                        if (requestArgs.type === 'submission') {
                            requestArgs.opts.header.append('content-type', `application/json`);
                        }
                        resolve(true);
                    }
                });
            }
        };

        Formio.registerPlugin(DelayPlugin, 'delay');
    }
    async ngOnInit() {

        this.switchLangService.changeLang(this.switchLangService.getSelectedLang());

        if (await this.keycloakService.isLoggedIn()) {
            this.userDetails = await this.sessionService.loadUserProfile();
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
        this.keycloakService.keycloakEvents$.subscribe(async () => {
            if (await this.keycloakService.isLoggedIn()) {
                // window.location.reload();
                this.zone.run(async () => {
                    this.userDetails = await this.sessionService.loadUserProfile();
                    this.loggedIn = true;

                });
            }
        });

    }

    async doLogout() {
        localStorage.setItem('needLogin', 'true');
        await this.keycloakService.logout();
    }


    login() {

        this.keycloakService.login();

    }

    selectLang(lang): void {
        this.selectedLang = this.switchLangService.getSelectedLang();
        this.switchLangService.changeLang(lang.value);
    }
    get currentLang() {
        const lang = this.languages.find(lang => lang.code === this.switchLangService.getSelectedLang());
        return lang ? lang.name.toLocaleUpperCase() : '';
    }
}