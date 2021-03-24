import { Platform } from '@ionic/angular';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { ConfigService } from './config.service';
import { SessionService } from './session.service';


export function initializer(
  keycloak: KeycloakService, session: SessionService, platform: Platform, config: ConfigService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        config.loadConfig().then(() => {
          config.setupEssentials();
        });
      } catch (e) {
        console.warn(e);
      }
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

          if (await keycloak.isLoggedIn()) {
            await session.loadUserProfile();
          } else {
            const kc = keycloak.getKeycloakInstance();
            console.log(kc);
          }
          resolve(true);

        } catch (error) {
          reject(error);
        }
      });

    });
  };
}
