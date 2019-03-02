import { KeycloakService } from 'keycloak-angular';

import { environment } from '../environments/environment';
import {assets_url, formioAppUrl, formioApiUrl } from './config'

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'check-sso',
            checkLoginIframe: false
          },
          bearerExcludedUrls: [
            'http://localhost:8080',
            formioAppUrl,
            formioApiUrl,
            'http://34.207.137.198:8120',
            assets_url,
          ],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}