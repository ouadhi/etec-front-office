import { LoggerService } from './../services/logger.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { SessionService } from '../services/session.service';

@Injectable()
export class AnonymousInterceptor implements HttpInterceptor {
    isLoggedIn = false;

    constructor(private session: SessionService,
        private keycloakService: KeycloakService,
        private loggerService: LoggerService) {
        keycloakService.isLoggedIn().then(data => {
            this.isLoggedIn = data;
        });
    }
    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return from(this.handle(request, next));
    }

    async handle(
        request: HttpRequest<any>,
        next: HttpHandler
    ) {
        this.isLoggedIn = await this.keycloakService.isLoggedIn();

        // how to update the request Parameters
        let updatedRequest = request;
        const anonToken = this.session.getAnonymousToken();

        if (anonToken && !this.isLoggedIn) {
            updatedRequest = updatedRequest.clone({
                headers: updatedRequest.headers.set(
                    'Authorization',
                    `Bearer ${anonToken}`
                )
            });
        }

        // logging the updated Parameters to browser's console
        this.loggerService.log('Before making api call : ', updatedRequest);
        return next.handle(updatedRequest).pipe(
            tap(
                event => {
                    // logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        this.loggerService.log('api call success :', event);
                    }
                },
                error => {
                    // logging the http response to browser's console in case of a failuer
                    if (event instanceof HttpResponse) {
                        this.loggerService.log('api call error :', event);
                    }
                }
            )
        ).toPromise();
    }

}
