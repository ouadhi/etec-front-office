import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeycloakService } from 'keycloak-angular';


@Injectable({ providedIn: 'root' })
export class ETECService {
    constructor(private http: HttpClient,
        private keycloak: KeycloakService) { }

    async getEtecData(): Promise<any> {
        // return this.http.get('https://611e17387d273a0017e2fa4c.mockapi.io/cretical-data/1');
        try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(await this.keycloak.getToken());
            const generatedId = decodedToken.groups && decodedToken.groups.length ? decodedToken.groups[0].split('_')[0] : '';
            const etecData = {
                name: decodedToken.name,
                roles: decodedToken.roles,
                groups: decodedToken.groups,
                preferred_username: decodedToken.preferred_username,
                type: decodedToken.type,
                locale: decodedToken.locale,
                given_name: decodedToken.given_name,
                family_name: decodedToken.family_name,
                email: decodedToken.email,
                generatedId: generatedId
            };
            return etecData;
        } catch (e) {
            return {};
        }
    }
}