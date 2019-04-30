import { KeycloakService } from 'keycloak-angular';

import { environment } from '../environments/environment';

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
            '/assets/', // due to call ngx-translate
            environment.cms.api.master,
            environment.cms.api.assets,
            // environment.formio.api.requestForm,
            // environment.formio.api.master,
            // environment.filter.api
            // environment.requestApi.api
          ],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}