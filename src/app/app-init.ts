import { KeycloakService } from 'keycloak-angular';

import { environment } from '../environments/environment';
import { SessionService } from './session.service';
import { AccountService } from './account.service';
import { Platform } from '@ionic/angular';

export function initializer(keycloak: KeycloakService, session: SessionService, platform: Platform): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      platform.ready().then(async () => {
        try {
          await keycloak.init({
            config: environment.keycloak,
            loadUserProfileAtStartUp: false,
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: true
            },
            bearerExcludedUrls: [
              '/assets/', // due to call ngx-translate
              environment.statisticsApi.api,
              environment.cms.api.master,
              environment.cms.api.assets,
              // environment.formio.api.requestForm,
              // environment.formio.api.master,
              // environment.filter.api
              // environment.requestApi.api
            ],
          });
          if (await keycloak.isLoggedIn()) {
            await session.loadUserProfile();
          }
          resolve();

        } catch (error) {
          reject(error);
        }
      });

    });
  };
}
