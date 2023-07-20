import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ManagePasswordService {
    constructor(private http: HttpClient, private translateService: TranslateService) { }

    generateOTP(userId: string, otpchannel?: string) {
        return this.http.post<any>(
            `${environment.gateway}${environment.endpoints.notifications}otp/generate/changepassword`,
            {
                user: userId,
                msgContent: this.translateService.instant(
                    'To complete enbale account enter this number : {}'
                ),
            },
            { params: otpchannel ? { otpchannel: otpchannel } : null }
        );
    }

    verify(userId: string, otp: string) {
        return this.http.post<any>(
            `${environment.gateway}${environment.endpoints.notifications}otp/verify/changepassword`,
            { identifier: userId, otp: otp }
        );
    }

    resetPassword(userId: string, token: string, password: string) {
        return this.http.put<any>(
            `${environment.gateway}${environment.endpoints.dataservice}v1/keycloak/users/${userId}/resetPassword`,
            { password: password, token: token }
        );
    }
    getFormConfig() {
        return this.http.get<any>(`${environment.formio.appUrl}config.json`);
    }
}