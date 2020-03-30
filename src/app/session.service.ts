import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { isArray } from 'util';
import { environment } from '../environments/environment';
import { AccountService } from './account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 *
 */
@Injectable({
    providedIn: 'root'
})

export class SessionService {
    // tslint:disable-next-line:variable-name
    private _userProfile = null;

    constructor(private keycloakService: KeycloakService, private accountService: AccountService, private http: HttpClient
    ) {
    }
    getUsername(): string {
        if (!this._userProfile) {
            throw new Error('User not logged in or user profile was not loaded.');
        }

        return this._userProfile.login;
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
                    // () => reject('The user profile could not be loaded.')
                    () => resolve(this._userProfile)
                );
        });
    }
    isUserInRole(role: any, resource?: string): boolean {
        let hasRole = false;
        console.log(this.keycloakService.getUserRoles());
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
    loginAnonymous() {
        const body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('client_id', environment.keycloak.secret_client);
        body.set('client_secret', environment.keycloak.secret);
        body.set('username', environment.keycloak.anonymous_user);
        body.set('password', environment.keycloak.anonymous_password);

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        this.http.post(`${environment.keycloak.url}realms/${environment.keycloak.realm}/protocol/openid-connect/token`,
            body.toString(), options).subscribe(data => {
                localStorage.setItem('anonymous', JSON.stringify(data));
            });
    }
    getAnonymousToken() {
        const anon = localStorage.getItem('anonymous');
        try {
            return JSON.parse(anon).access_token;

        } catch (e) {
            return false;
        }
    }
}
