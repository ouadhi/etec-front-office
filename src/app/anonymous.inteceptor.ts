import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SessionService } from './session.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AnonymousInterceptor implements HttpInterceptor {
    isLoggedIn = false;
    constructor(private session: SessionService, private keycloakService: KeycloakService) {
        keycloakService.isLoggedIn().then(data => {
            this.isLoggedIn = data;
        });
    }
    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // how to update the request Parameters
        let updatedRequest = request;
        const anonToken = this.session.getAnonymousToken();
        // if (request.url.includes(environment.wso2.base)) {
        if (anonToken && !this.isLoggedIn) {
            updatedRequest = updatedRequest.clone({
                headers: updatedRequest.headers.set(
                    'Authorization',
                    `Bearer ${anonToken}`
                )
            });
        }

        // logging the updated Parameters to browser's console
        console.log('Before making api call : ', updatedRequest);
        return next.handle(updatedRequest).pipe(
            tap(
                event => {
                    // logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log('api call success :', event);
                    }
                },
                error => {
                    // logging the http response to browser's console in case of a failuer
                    if (event instanceof HttpResponse) {
                        console.log('api call error :', event);
                    }
                }
            )
        );
    }
}
