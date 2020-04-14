import { Platform } from '@ionic/angular';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { ConfigService } from './config.service';
import { SessionService } from './session.service';


export function initializer(
  keycloak: KeycloakService, session: SessionService, platform: Platform, config: ConfigService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      platform.ready().then(async () => {
        try {
          await keycloak.init({
            config: environment.keycloak,
            loadUserProfileAtStartUp: false,
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: false
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: [
              '/assets/', // due to call ngx-translate
              '/localization/submission/',
              environment.statisticsApi.api,
              environment.keycloak.url,
              environment.cms.api.master,
              environment.cms.api.assets,
              '/api/requests/count'
              // environment.formio.api.requestForm,
              // environment.formio.api.master,
              // environment.filter.api
              // environment.requestApi.api
            ],
          });
          try {
            await config.loadConfig();
            config.setupEssentials();
          } catch (e) {
            console.warn(e);
          }
          if (await keycloak.isLoggedIn()) {
            await session.loadUserProfile();
          } else {
            const kc = keycloak.getKeycloakInstance();
            console.log(kc);
          }
          resolve();

        } catch (error) {
          reject(error);
        }
      });

    });
  };
}
