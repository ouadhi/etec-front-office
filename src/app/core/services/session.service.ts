import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { isArray } from 'util';
import { AccountService } from './account.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SessionService {
    // tslint:disable-next-line:variable-name
    private _userProfile = null;
    private _licenseValid = true;

    constructor(private keycloakService: KeycloakService,
        private accountService: AccountService,
        private http: HttpClient,
        private loggerService: LoggerService) { }

    get isLicenseValid() {
        return this._licenseValid;
    }
    getUsername(): string {
        if (!this._userProfile) {
            throw new Error('User not logged in or user profile was not loaded.');
        }

        return this._userProfile.login;
    }
    async checkLicense() {
        const response = await this.http.get(`${environment.gateway}/orchestraservice/api/v1/license/check`,
            { observe: 'response' }).pipe(catchError((err: HttpErrorResponse) => of(err))).toPromise();

        if (response.status === 200) {
            this._licenseValid = true;
        } else if (response.status === 402) {
            this._licenseValid = false;

        }
    }
    async loadUserProfile() {
        const isLoggedIn = await this.keycloakService.isLoggedIn();
        return new Promise(async (resolve, reject) => {
            if (this._userProfile) {
                resolve(this._userProfile);
                return;
            }

            if (!isLoggedIn) {
                reject('The user profile was not loaded as the user is not logged in.');
                return;
            }
            this.accountService.getAccount().toPromise()
                .then(result => {
                    this._userProfile = result;
                    resolve(this._userProfile);
                },
                    () => resolve(this._userProfile)
                );
        });
    }
    isUserInRole(role: any, resource?: string): boolean {
        let hasRole = false;
        this.loggerService.log(this.keycloakService.getUserRoles());
        if (isArray(role)) {
            role.forEach(r => {
                if (this.keycloakService.isUserInRole(environment.roles[r])) {
                    hasRole = true;
                    return;
                }
            });
        } else {
            hasRole = this.keycloakService.isUserInRole(environment.roles[role]);
        }
        return hasRole;
    }
}
