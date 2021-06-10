import { LoggerService } from './../services/logger.service';
import { Platform } from '@ionic/angular';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../services/config.service';
import { SessionService } from '../services/session.service';


export function initializer(keycloak: KeycloakService,
  session: SessionService,
  platform: Platform,
  config: ConfigService,
  loggerService: LoggerService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (config)
          config.loadConfig().then(() => {
            config.setupEssentials();
          });
      } catch (e) {
        loggerService.warn(e);
      }
      platform.ready().then(async () => {
        try {
          await keycloak.init({
            config: environment.keycloak,
            loadUserProfileAtStartUp: false,
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: false,
              // redirectUri: window.location.origin
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
            loggerService.log(kc);
          }
          resolve(true);

        } catch (error) {
          reject(error);
        }
      });

    });
  };
}
