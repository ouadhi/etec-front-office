import { LoggerService } from './../services/logger.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Wso2Interceptor implements HttpInterceptor {

    constructor(private loggerService: LoggerService) { }

    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // how to update the request Parameters
        let updatedRequest = request;

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
        );
    }
}
