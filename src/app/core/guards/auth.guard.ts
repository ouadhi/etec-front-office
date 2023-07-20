import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router,
    protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        if (route.routeConfig.path.includes('403')) {
          this.router.navigate(['/']);

        } else {
          localStorage.setItem('needLogin', 'true');
          this.keycloakAngular.login();
        }
        return;
      }

      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1 || this.roles.some(q=> q.includes(environment.roles.admin))) {
            granted = true;
            break;
          }
        }
        if (granted) {
          resolve(granted);

        } else {
          if (['/403'].indexOf(this.router.url) === -1) localStorage.setItem('_previousUrl', this.router.url);
          this.router.navigate(['/errors/403']);
        }
      }
    });
  }
}