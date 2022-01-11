import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { USE_STORE } from "@ngx-translate/core";
import { KeycloakService } from "keycloak-angular";

@Injectable({ providedIn: "root" })
export class ETECService {
  constructor(private http: HttpClient, private keycloak: KeycloakService) { }

  async getEtecData(): Promise<any> {
    // return this.http.get('https://611e17387d273a0017e2fa4c.mockapi.io/cretical-data/1');
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(await this.keycloak.getToken());
      let generatedId = null;
      if (decodedToken.type)
        generatedId =
          decodedToken.groups && decodedToken.groups.length
            ? decodedToken.groups[0].split("_")[0]
            : "";

      const etecData = {
        user_name: decodedToken.name,
        user_roles: decodedToken.roles,
        user_groups: decodedToken.groups,
        user_preferred_username: decodedToken.preferred_username,
        user_type: decodedToken.type,
        user_locale: decodedToken.locale,
        user_given_name: decodedToken.given_name,
        user_family_name: decodedToken.family_name,
        user_email: decodedToken.email,
        generatedId: generatedId,
        currentUser_name: decodedToken.name,
        currentUser_roles: decodedToken.roles,
        currentUser_groups: decodedToken.groups,
        currentUser_preferred_username: decodedToken.preferred_username,
        currentUser_type: decodedToken.type,
        currentUser_locale: decodedToken.locale,
        currentUser_given_name: decodedToken.given_name,
        currentUser_family_name: decodedToken.family_name,
        currentUser_email: decodedToken.email,
        currentUser_generatedId: generatedId,
      };
      if (decodedToken.attributes)
        for (const [key, value] of Object.entries(decodedToken.attributes)) {
          etecData[`user_${key}`] = value;
          etecData[`currentUser_${key}`] = value;
        }

      return { ...etecData };
    } catch (e) {
      return {};
    }
  }
  async getTaskData(): Promise<any> {
    // return this.http.get('https://611e17387d273a0017e2fa4c.mockapi.io/cretical-data/1');
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(await this.keycloak.getToken());
      let generatedId = null;
      if (decodedToken.type)
        generatedId =
          decodedToken.groups && decodedToken.groups.length
            ? decodedToken.groups[0].split("_")[0]
            : "";

      const etecData = {
        task_name: decodedToken.name,
        task_roles: decodedToken.roles,
        task_groups: decodedToken.groups,
        task_preferred_username: decodedToken.preferred_username,
        task_type: decodedToken.type,
        task_locale: decodedToken.locale,
        task_given_name: decodedToken.given_name,
        task_family_name: decodedToken.family_name,
        task_email: decodedToken.email,
        task_generatedId: generatedId,
        currentUser_name: decodedToken.name,
        currentUser_roles: decodedToken.roles,
        currentUser_groups: decodedToken.groups,
        currentUser_preferred_username: decodedToken.preferred_username,
        currentUser_type: decodedToken.type,
        currentUser_locale: decodedToken.locale,
        currentUser_given_name: decodedToken.given_name,
        currentUser_family_name: decodedToken.family_name,
        currentUser_email: decodedToken.email,
        currentUser_generatedId: generatedId,
      };

      if (decodedToken.attributes)
        for (const [key, value] of Object.entries(decodedToken.attributes)) {
          etecData[`task_${key}`] = value;
          etecData[`currentUser_${key}`] = value;
        }

      return { ...etecData };
    } catch (e) {
      return {};
    }
  }

  async getTokenData() {
    const helper = new JwtHelperService();
    return helper.decodeToken(await this.keycloak.getToken());
  }
}