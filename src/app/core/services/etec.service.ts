import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ETECService {
    constructor(private http: HttpClient){}

    getEtecData(){
        return this.http.get('https://611e17387d273a0017e2fa4c.mockapi.io/cretical-data/1');
    }
}