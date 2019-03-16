import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form, Formio, Utils } from 'formiojs';
import _, { assign, get, isEmpty } from 'lodash';
import { ExternalService } from '../../external.service';
import { FormioError, FormioForm, FormioOptions, FormioRefreshValue } from '../../formio.common';
import { FormioService } from '../../formio.service';
import { FormioAlerts } from '../alerts/formio.alerts';
import { FormioLoader } from '../loader/formio.loader';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';


/* tslint:disable */
@Component({
    selector: 'app-formio',
    templateUrl: './formio.component.html',
    styleUrls: ['./formio.component.scss'],
})
/* tslint:enable */
export class AppFormioComponent implements OnInit, OnChanges {
    @Input() formKey;
    @Input() submissionId;
    @Input() form?: FormioForm;
    @Input() params?: any = {};
    @Input() submission?: any = {};
    @Input() src?: string;
    @Input() url?: string;
    @Input() service?: FormioService;
    @Input() options?: FormioOptions;
    @Input() formioOptions?: any;
    @Input() renderOptions?: any;
    @Input() readOnly?= false;
    @Input() viewOnly?= false;
    @Input() hideComponents?: string[];
    @Input() refresh?: EventEmitter<FormioRefreshValue>;
    @Input() error?: EventEmitter<any>;
    @Input() success?: EventEmitter<object>;
    @Input() language?: EventEmitter<string>;
    @Input() hooks?: any = {};
    @Input() renderer?: any;
    @Input() version?: any = {};
    @Output() render = new EventEmitter<object>();
    @Output() customEvent = new EventEmitter<object>();
    @Output() submit = new EventEmitter<object>();
    @Output() prevPage = new EventEmitter<object>();
    @Output() nextPage = new EventEmitter<object>();
    @Output() beforeSubmit = new EventEmitter<object>();
    @Output() change = new EventEmitter<object>();
    @Output() invalid = new EventEmitter<boolean>();
    @Output() errorChange = new EventEmitter<any>();
    @Output() formLoad = new EventEmitter<any>();
    @Output() submissionLoad = new EventEmitter<any>();
    @Output() ready = new EventEmitter<AppFormioComponent>();
    @ViewChild('formio') formioElement?: ElementRef;

    public formio: any;
    public initialized = false;
    public alerts = new FormioAlerts();

    private formioReady: Promise<any>;
    private formioReadyResolve: any;
    private submitting = false;
    private timeout;

    constructor(
        public loader: FormioLoader,
        private externalService: ExternalService,
        private translate: TranslateService,
        private keyCloakService: KeycloakService

    ) {

        if (environment.formio.api.master && environment.formio.api.project) {
            Formio.setBaseUrl(environment.formio.api.master);
            Formio.setProjectUrl(environment.formio.api.project);
        } else {
            console.warn('You must provide formio Config');
        }

        this.formioReady = new Promise((ready) => {
            this.formioReadyResolve = ready;
        });
    }

    setForm(form: FormioForm) {
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        const Renderer = this.renderer || Form;
        this.formio = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null,
            this.form,
            assign({}, {
                icons: 'fontawesome',
                noAlerts: get(this.options, 'noAlerts', true),
                readOnly: this.readOnly,
                viewAsHtml: this.viewOnly,
                i18n: get(this.options, 'i18n', null),
                fileService: get(this.options, 'fileService', null),
                hooks: this.hooks
            }, this.renderOptions || {}))).create();

        if (this.url) {
            this.formio.setUrl(this.url, this.formioOptions || {});
        }
        if (this.src) {
            this.formio.setUrl(this.src, this.formioOptions || {});
        }

        this.formio.nosubmit = false;
        this.formio.on('languageChanged', () => {
            this.disableForms(this.formio);
        });
        this.formio.on('prevPage', (data: any) => this.onPrevPage(data));
        this.formio.on('nextPage', (data: any) => this.onNextPage(data));
        this.formio.on('change', (value: any) => this.change.emit(value));
        this.formio.on('customEvent', (event: any) =>
            this.onCustomEvent(event)
        );
        this.formio.on('submit', (submission: any) =>
            this.submitForm(submission)
        );
        this.formio.on('error', (err: any) => this.onError(err));
        this.formio.on('render', () => this.render.emit());
        this.formio.on('formLoad', (loadedForm: any) =>
            this.onFormLoad(loadedForm)
        );

        this.formio.form = this.form;
        return this.formio.ready.then(() => {
            this.loader.loading = false;
            this.ready.emit(this);
            this.formioReadyResolve(this.formio);
            if (this.formio.submissionReady) {
                this.formio.submissionReady.then((submission) => {
                    this.submissionLoad.emit(submission);
                });
            }
            return this.formio;
        });
    }

    initialize() {
        if (this.initialized) {
            return;
        }
        if (this.formKey) {
            this.src = environment.formio.api.project + this.formKey;
            if (this.submissionId) {
                this.src += `/submission/${this.submissionId}`;
            }
            if (this.version && this.version[this.formKey.toLowerCase()]) {
                this.src += '/v/' + this.version[this.formKey.toLowerCase()].value;
            }
        }
        this.options = Object.assign(
            {
                errors: {
                    message: 'Please fix the following errors before submitting.'
                },
                alerts: {
                    submitMessage: 'Submission Complete.'
                },
                disableAlerts: false,
                hooks: {
                    beforeSubmit: null
                }
            },
            this.options
        );
        this.initialized = true;
    }

    async ngOnInit() {
        this.initialize();
        this.formioReady.then(() => {
            this.assignVersions(this.formio);
            setTimeout(() => this.disableForms(this.formio), 0);
        });

        if (this.language) {
            this.language.subscribe((lang: string) => {
                this.formio.language = lang;
            });
        }
        if (this.translate) {
            this.addLanguage(this.translate.currentLang);
            this.translate.onLangChange.subscribe((lang) => {
                this.addLanguage(lang);
            });
        }

        if (this.refresh) {
            this.refresh.subscribe((refresh: FormioRefreshValue) =>
                this.onRefresh(refresh)
            );
        }

        if (this.error) {
            this.error.subscribe((err: any) => this.onError(err));
        }

        if (this.success) {
            this.success.subscribe((message: string) => {
                this.alerts.setAlert({
                    type: 'success',
                    message: message || get(this.options, 'alerts.submitMessage')
                });
            });
        }

        if (this.src) {
            if (!this.service) {
                const token = await this.keyCloakService.getToken();
                this.service = new FormioService(this.src, {}, token);
            }
            this.loader.loading = true;
            this.service.loadForm({ params: { live: 1 } }).subscribe(
                (form: FormioForm) => {
                    if (form && form.components) {
                        this.setForm(form);
                    }

                    // if a submission is also provided.
                    if (
                        isEmpty(this.submission) &&
                        this.service &&
                        this.service.formio.submissionId
                    ) {
                        this.service.loadSubmission().subscribe(
                            (submission: any) => {
                                if (this.readOnly) {
                                    this.formio.options.readOnly = true;
                                }
                                this.submission = this.formio.submission = submission;
                            },
                            err => this.onError(err)
                        );
                    }
                },
                err => this.onError(err)
            );
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    }

    onRefresh(refresh: FormioRefreshValue) {
        this.formioReady.then(() => {
            if (refresh.form) {
                this.formio.setForm(refresh.form).then(() => {
                    if (refresh.submission) {
                        this.formio.setSubmission(refresh.submission);
                    }
                });
            } else if (refresh.submission) {
                this.formio.setSubmission(refresh.submission);
            } else {
                switch (refresh.property) {
                    case 'submission':
                        this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        this.formio.form = refresh.value;
                        break;
                }
            }
        });
    }

    ngOnChanges(changes: any) {
        this.initialize();

        if (changes.form && changes.form.currentValue) {
            this.setForm(changes.form.currentValue);
        }

        this.formioReady.then(() => {
            if (changes.submission && changes.submission.currentValue) {
                this.formio.submission = changes.submission.currentValue;
                setTimeout(() => this.disableForms(this.formio), 0);
            }

            if (changes.hideComponents) {
                this.formio.hideComponents(changes.hideComponents.currentValue);
            }
        });
    }

    onPrevPage(data: any) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    }

    onNextPage(data: any) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    }

    onSubmit(submission: any, saved: boolean, noemit?: boolean) {
        this.submitting = false;
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit({ submission: submission, version: this.version });
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    }

    onError(err: any) {
        this.loader.loading = false;
        this.alerts.setAlerts([]);
        this.submitting = false;

        if (!err) {
            return;
        }

        // Make sure it is an array.
        const errors = Array.isArray(err) ? err : [err];

        // Emit these errors again.
        this.errorChange.emit(errors);

        // Iterate through each one and set the alerts array.
        errors.forEach((error: any) => {
            const {
                message,
                paths,
            } = error
                    ? error.details
                        ? {
                            message: error.details.map((detail) => detail.message).join(' '),
                            paths: error.details.map((detail) => detail.path),
                        }
                        : {
                            message: error.message || error.toString(),
                            paths: error.path ? [error.path] : [],
                        }
                    : {
                        message: '',
                        paths: [],
                    };

            this.alerts.addAlert({
                type: 'danger',
                message,
            });

            paths.forEach((path) => {
                const component = this.formio.getComponent(path);
                const components = Array.isArray(component) ? component : [component];

                components.forEach((comp) => comp.setCustomValidity(message, true));
            });
        });
    }

    submitExecute(submission: object) {
        if (this.service && !this.url) {
            this.service
                .saveSubmission(submission)
                .subscribe(
                    (sub: {}) => this.onSubmit(sub, true),
                    err => this.onError(err)
                );
        } else {
            this.onSubmit(submission, false);
        }
    }

    submitForm(submission: any) {
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.submitting = true;
        this.beforeSubmit.emit(submission);

        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        const beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (err: FormioError, sub: object) => {
                if (err) {
                    this.onError(err);
                    return;
                }
                this.submitExecute(sub);
            });
        } else {
            this.submitExecute(submission);
        }
    }

    /**
     * Search deeply for form components and assigns Form Version to them.
     * @param formio
     *  Formio Webform object
     */
    assignVersions(formio) {
        const nestedForms = Utils.searchComponents(formio.components, { type: 'form' });
        if (nestedForms.length > 0) {
            clearTimeout(this.timeout);
            this.loader.loading = true;

            nestedForms.forEach(formComponent => {
                const formKey = formComponent.component.key.toLowerCase();
                if (this.version && this.version[formKey]) {
                    formComponent.component.form = formComponent.component.form + '/v/'
                        + this.version[formKey].value;

                }
                formComponent.subFormReady.then((subForm) => {
                    subForm.formReady.then(() => {
                        this.assignVersions(subForm);
                    });
                });
            });
        } else {
            clearTimeout(this.timeout);
            formio.ready.then(() => {
                this.timeout = setTimeout(() => {
                    this.loader.loading = false;
                }, 100);
            });
        }
        formio.formReady.then(() => {
            if (!this.version || !this.version[formio.component.key.toLowerCase()]) {
                this.version[formio._form.path] = { value: formio._form._vid, type: 'string' };
            }
        });

    }


    /**
     * Search deeply for form components
     * Assign readOnly and ViewAsHtml properties from API properties.
     * @param formio
     *  Formio Webform object
     */
    disableForms(formio) {
        // function needs to be called at the end of the stack // setTimeout 0
        const nestedForms = Utils.searchComponents(formio.components, { type: 'form' });
        nestedForms.forEach(formComponent => {
            formComponent.subFormReady.then((subForm) => {
                subForm.options['readOnly'] = formComponent.component.properties.readOnly === 'true';
                subForm.options['viewAsHtml'] = formComponent.component.properties.readOnly === 'true';
                subForm.triggerRedraw();
                this.disableForms(subForm);
            });
        });
    }



    onFormLoad(loadedForm) {
        this.processFormCalls(loadedForm);
        this.formLoad.emit(loadedForm);
    }

    /**
     * Searchs form object properties for OnFormLoad Actions and executes them if any.
     * @param loadedForm
     *  contains formio form object
     */
    processFormCalls(loadedForm) {
        if (this.params) {
            try {
                if (this.params.url) {
                    const temp = Object.assign({}, this.submission);
                    this.externalService.apiCall('get', this.params.url).subscribe(response => {
                        this.submission = this.formio.submission =
                            Utils.evaluate('submission.data = response;', { submission: temp, response: response }, 'submission');
                    });
                }
            } catch (e) {
                console.log(e);
            }

        }
    }
    /**
     * extract value from submission object using property path witihin a string [submission.path.to.value]
     */
    parseVariables(string): string {
        const vars = string.match(/\[(.*?)\]/g);
        if (vars) {
            vars.forEach(variable => {
                const path = variable.replace(/\[|\]/g, '').replace('submission.', '');
                const value = _.get(this.submission, path);
                string = string.replace(variable, value);
            });
        }
        return string;
    }
    /**
     * add and choose language
     */
    addLanguage(lang): void {
        this.formioReady.then(() => {
            this.formio.addLanguage(lang, {
                ...this.translate.instant('forms.common'),
                ...this.translate.instant(`forms.${this.formKey}`)
            });
            this.formio.language = lang;
        });
    }
    /**
     * parse component api properties variables and emit customEvent.
     */
    onCustomEvent(event): void {
        try {
            if (event.component.properties && event.component.properties['variables']) {
                event.component.properties['variables'] = this.parseVariables(event.component.properties['variables']);
            }
            this.customEvent.emit(event);

        } catch (err) {
            this.customEvent.emit(event);
        }
    }

}
