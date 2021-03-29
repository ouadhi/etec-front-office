import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Injector, NgZone, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { FormioLoader } from "dp-formio";
import { KeycloakService } from "keycloak-angular";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/core/services/account.service";
import { SessionService } from "src/app/core/services/session.service";
import { SwitchLangService } from "src/app/core/services/switch-lang.service";
import { ServicesService } from "src/app/modules/services-catalog/services.service";
import { FilterPipe } from "ngx-filter-pipe";
import { ConfigService } from "src/app/core/services/config.service";

@Component({ template: '' })
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
}
