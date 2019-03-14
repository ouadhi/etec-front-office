import { Formio } from 'formiojs';
import { Observable, Observer } from 'rxjs';
import { FormioForm } from './formio.common';

export class FormioService {
    public formio: any;
    public optsHeaders: any = {};
    constructor(public url: string, public options?: object, public token?: string) {
        this.formio = new Formio(this.url, this.options);
        if (token) {
            this.optsHeaders = {
                header: new Headers({
                    authorization: `bearer ${this.token}`
                })
            };
            /*
           this.formio.currentUser({
               header: {
                   authorization: `bearer ${token}`
               }
           }); */
        }
    }
    requestWrapper(fn: any) {
        let record: any;
        let called = false;
        return Observable.create((observer: Observer<any>) => {
            try {
                if (!called) {
                    called = true;
                    fn()
                        .then((_record: any) => {
                            record = _record;
                            observer.next(record);
                            observer.complete();
                        })
                        .catch((err: any) => observer.error(err));
                } else if (record) {
                    observer.next(record);
                    observer.complete();
                }
            } catch (err) {
                observer.error(err);
            }
        });
    }
    saveForm(form: FormioForm): Observable<FormioForm> {
        return this.requestWrapper(() => this.formio.saveForm(form));
    }
    loadForm(options?: any): Observable<FormioForm> {
        return this.requestWrapper(() => this.formio.loadForm(options, { ...this.optsHeaders }));
    }
    loadSubmission(): Observable<{}> {
        return this.requestWrapper(() => this.formio.loadSubmission({}, { ...this.optsHeaders }));
    }
    saveSubmission(submission: {}): Observable<{}> {
        return this.requestWrapper(() => this.formio.saveSubmission(submission, { ...this.optsHeaders }));
    }
    loadSubmissions(): Observable<{}> {
        return this.requestWrapper(() => this.formio.loadSubmissions({}, { ...this.optsHeaders }));
    }
}
