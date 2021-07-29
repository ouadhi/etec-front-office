import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Injector, NgZone, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { KeycloakService } from "keycloak-angular";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/core/services/account.service";
import { SessionService } from "src/app/core/services/session.service";
import { SwitchLangService } from "src/app/core/services/switch-lang.service";
import { ServicesService } from "src/app/modules/services-catalog/services.service";
import { FilterPipe } from "ngx-filter-pipe";
import { ConfigService } from "src/app/core/services/config.service";
import { LoggerService } from "src/app/core/services/logger.service";
import { FormioLoader } from "src/formio/src/public_api";

// @Component({ })
export abstract class BaseComponent implements OnDestroy {
    private subs: Subscription[] = [];
    set sub(s: Subscription) { this.subs.push(s); }

    route: ActivatedRoute;
    router: Router;
    location: Location;
    cdr: ChangeDetectorRef;
    zone: NgZone;
    matDialog: MatDialog;
    translateService: TranslateService;
    toastrService: ToastrService;
    keycloakService: KeycloakService;
    formioLoader: FormioLoader;
    servicesService: ServicesService;
    switchLangService: SwitchLangService;
    loggerService: LoggerService;
    sessionService: SessionService;
    accountService: AccountService;
    configService: ConfigService

    datePipe: DatePipe;
    filterPipe: FilterPipe;

    constructor(public injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.location = injector.get(Location);
        this.cdr = injector.get(ChangeDetectorRef);
        this.zone = injector.get(NgZone);
        this.matDialog = injector.get(MatDialog);
        this.translateService = injector.get(TranslateService);
        this.toastrService = injector.get(ToastrService);
        this.keycloakService = injector.get(KeycloakService);
        this.formioLoader = injector.get(FormioLoader);
        this.servicesService = injector.get(ServicesService);
        this.switchLangService = injector.get(SwitchLangService);
        this.loggerService = injector.get(LoggerService);
        this.sessionService = injector.get(SessionService);
        this.accountService = injector.get(AccountService);
        this.configService = injector.get(ConfigService);

        this.datePipe = injector.get(DatePipe);
        this.filterPipe = injector.get(FilterPipe);
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
        this.subs = [];
    }

    replaceUrl(queryString: string) {
        window.history.replaceState(null,
            null,
            `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString}`);
    }

    toQueryString(obj: any) {
        const str = [];
        for (const p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + (!!`${obj[p]}` && obj[p] != null ? encodeURIComponent(obj[p]) : ''));
            }
        return str.join('&');
    }

    fromQueryString(query: string = null): any {
        if (!location.search) return null;
        if (query == null) query = location.search.replace('?', '');
        const result = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        for (const p in result)
            if (result[p].includes(',')) result[p] = result[p].split(',');
        return result;
    }
}
