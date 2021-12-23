import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ManagePasswordService {

    constructor(private http: HttpClient) { }

    generateOTP(userId: string, otpchannel?: string) {
        const data: any = { user: userId };
        if (otpchannel) data.otpchannel = otpchannel;
        return this.http.post<any>(`${environment.gateway}${environment.endpoints.notifications}otp/generate/changepassword`, data);
    }

    verify(userId: string, otp: string) {
        return this.http.post<any>(`${environment.gateway}${environment.endpoints.notifications}otp/verify/changepassword`, { identifier: userId, otp: otp });
    }

    resetPassword(userId: string, token: string, password: string) {
        return this.http.put<any>(`${environment.gateway}${environment.endpoints.dataservice}v1/keycloak/users/${userId}/resetPassword`,
            { password: password, token: token });
    }
    getFormConfig() {
        return this.http.get<any>(`${environment.formio.appUrl}config.json`);
    }
}