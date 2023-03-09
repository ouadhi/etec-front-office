import { SwitchLangService } from 'src/app/core/services/switch-lang.service';
import { LoggerService } from './../services/logger.service';
import { Platform } from '@ionic/angular';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../services/config.service';
import { SessionService } from '../services/session.service';
import { JwtHelperService } from "@auth0/angular-jwt";


export function initializer(keycloak: KeycloakService,
  session: SessionService,
  platform: Platform,
  configService: ConfigService,
  loggerService: LoggerService,
  switchLangService: SwitchLangService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (configService)
          configService.loadConfig().then(() => {
            configService.setupEssentials();
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
              // environment.statisticsApi.api,
              environment.keycloak.url,
              environment.cms,
              '/api/requests/count'
              // environment.formio.api.requestForm,
              // environment.formio.api.master,
              // environment.gateway
              // environment.gateway
            ],
          });

          if (await keycloak.isLoggedIn()) {
            const token = await keycloak.getToken();
            localStorage.setItem('_token', token);
            if (localStorage.getItem('needLogin') == 'true' || !localStorage.getItem('needLogin')) {
              //take lang from token and change language
              const helper = new JwtHelperService();
              const decodedToken = helper.decodeToken(token);
              switchLangService.changeLang((decodedToken.locale || 'ar').toLowerCase());
              localStorage.setItem('needLogin', 'false');
            }
            await session.checkLicense();
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
