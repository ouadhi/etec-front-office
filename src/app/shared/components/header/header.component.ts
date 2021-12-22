import { Component, Injector, ViewEncapsulation } from "@angular/core";
import { Platform } from "@ionic/angular";
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import { environment } from "src/environments/environment";
import { BaseComponent } from "../base.component";
import { Formio } from 'formiojs';
import { DatePipe, formatDate } from '@angular/common';
import myLocaleAr from '@angular/common/locales/Ar';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    // styleUrls: ['./header.component.scss'],
    providers: [DatePipe],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends BaseComponent {

    logo = '';
    loggedIn = false;
    userDetails;
    myDate = new Date();
    newDate;
    time;
    todaysDataTime;
    today = new HijriDate().format('dd mmmm yyyy');
    ;
    hijriDate;
    languages = [
        { name: 'ENGLISH', code: 'en' },
        { name: 'ARABIC', code: 'ar' }
    ];
    selectedLang = this.translateService.currentLang;
    constructor(public injector: Injector, public datePipe: DatePipe,
        public platform: Platform) {
        super(injector);
        this.newDate = this.datePipe.transform(this.myDate, ' d MMMM y');
        this.time = this.myDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        this.todaysDataTime = formatDate(this.myDate, ' hh:mm a', 'en-US', '+3');
        // this.hijriDate = this.today.toHijri();
        this.configService.loadConfig().then(config => {
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
        localStorage.setItem('_etec_data', null);
        await this.keycloakService.logout();
    }


    login() {

        this.keycloakService.login();

    }
    goToLink() {
        window.open('https://www.etec.gov.sa/ar/Pages/default.aspx', '_blank');
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