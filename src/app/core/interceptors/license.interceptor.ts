import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LicenseInterceptor implements HttpInterceptor {
    alert;
    constructor(private alertController: AlertController, private translate: TranslateService) {

    }

    async onLicenseInvalid() {
        this.alert = await this.alertController.create({
            message: this.translate.instant('LICENSE.INVALID'),
            backdropDismiss: false,
            buttons: [
                {
                    text: this.translate.instant('OK'),
                    role: 'close',
                    cssClass: 'secondary',
                    handler: () => {
                        this.alert = null;
                    }
                }
            ]
        });
        await this.alert.present();
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 402 && !this.alert && !req.url.includes('check')) {
                    this.onLicenseInvalid();
                    return throwError(err);

                } else {
                    return throwError(err);
                }
            })
        );
    }

}
