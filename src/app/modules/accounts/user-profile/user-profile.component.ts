import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';

declare let $: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    userInfoObject: any;
    formReady = false;
    id: string;
    submission: any = { data: null };
    url: any = environment.keycloak.url + 'realms/' + environment.keycloak.realm + '/account';

    constructor() {
        this.id = 'userprofile';
    }

    ngOnInit() {
        const helper = new JwtHelperService();
        const localToken = localStorage.getItem('_token');
        const decodedToken = helper.decodeToken(localToken);
        this.submission.data = decodedToken ? decodedToken : null;

        const newObj = Object.keys(this.flattenObject(this.submission.data.attributes)).map((e, i) => {
            return {
                ['attributes_' + e.replace('.', '_')]:
                    Object.values(this.flattenObject(this.submission.data.attributes))[i],
            };
        });
        this.submission.data = Object.assign(this.submission.data, ...newObj);
        setTimeout(() => {
            this.formReady = true;
        }, 400);
    }

    formLoad(formSettings) {
        setTimeout(() => {
            const array = $('.app-user-profile [name="data[submit]"]');
            for (let index = 0; index < array.length; index++) {
                $(array[index]).hide();
            }
        }, 400);
    }

    flattenObject(ob) {
        let toReturn = {};

        for (let i in ob) {
            if (!ob.hasOwnProperty(i)) {
                continue;
            }

            if ((typeof ob[i]) == 'object') {
                let flatObject = this.flattenObject(ob[i]);
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) {
                        continue;
                    }

                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    };
}
