import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Formio } from 'formiojs';
import _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { formioApiUrl, formioAppUrl } from '../../../config';

/**
 * FormComponent
 * Handles forms and submissions
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formKey;
  @Input() resourceName;
  @Input() resourceId;
  @Input() extra;
  @Input() readOnly;
  @Input() version;
  @Input() executionVariables;
  @Output() submit: EventEmitter<object> = new EventEmitter();
  @Output() customEvent: EventEmitter<object> = new EventEmitter();
  public form: any;
  public resource: any;
  public resourceUrl?: string;
  public formUrl: string;
  public formFormio: any;
  public formio: any;
  public refresh: EventEmitter<any> = new EventEmitter();
  public language: ReplaySubject<any> = new ReplaySubject(1);
  public resourceLoading?: Promise<any>;
  public resourceLoaded?: Promise<any>;
  public resourceResolve: any;
  public resourceReject: any;
  public resources: any;

  public formLoading?: Promise<any>;
  public formLoaded: Promise<any> = new Promise(() => { });
  public formResolve: any;
  public formReject: any;



  constructor(
    public route: ActivatedRoute,
    public translate: TranslateService,

  ) {
    this.formLoaded = new Promise(() => { });
    if (formioApiUrl && formioAppUrl) {
      Formio.setBaseUrl(formioApiUrl);
      Formio.setProjectUrl(formioAppUrl);
    } else {
      console.error('You must provide an AppConfig within your application!');
    }
    // Create the form url and load the resources.
    this.resource = { data: {} };
    this.resourceLoaded = new Promise((resolve, reject) => {
      this.resourceResolve = resolve;
      this.resourceReject = reject;
    });
    this.formLoaded = new Promise((resolve, reject) => {
      this.formResolve = resolve;
      this.formReject = reject;
    });
  }


  onSubmissionError(err: any) {
    this.resourceReject(err);
    this.onError(err);
  }

  /**
   * Sets Resource and Form URL and initilizes Resource Object
   * Sets initial Form's Version.
   */
  setContext() {
    this.resource = { data: {} };
    this.resourceUrl = formioAppUrl + '/' + this.resourceName;
    this.formUrl = formioAppUrl + '/' + this.formKey;
    if (this.resourceId) {
      this.resourceUrl += '/submission/' + this.resourceId;
    }
    if (this.version && this.version[this.formKey.toLowerCase()]) {
      this.formUrl += '/v/' + this.version[this.formKey];
    }
    this.formio = new Formio(this.resourceUrl);
  }

  /**
   * Loads Formio Resource
   */
  loadResource() {
    this.setContext();
    this.resourceLoading = this.formio
      .loadSubmission(null, { ignoreCache: true })
      .then((resource) => {
        resource.data = { executionVariables: this.executionVariables, extras: this.extra, ...resource.data };
        this.resource = resource;
        this.refresh.emit({
          property: 'submission',
          value: this.resource
        });
        this.resourceResolve(resource);
        return resource;
      }, (err) => { })
      .catch((err) => {
        console.log(err);
      });
    return this.resourceLoading;
  }

  /**
   * Gets a string as param, searchs for variables :eg[submission.data.user_id] and
   * deep searchs for it inside resource object.
   * Returns a string with the variable replaced with its value, undefined if not found.
   */

  parseVariables(stringVar) {
    const vars = stringVar.match(/\[(.*?)\]/g);
    if (vars) {
      vars.forEach(variable => {
        const value = _.get(this.resource, variable.replace(/\[|\]/g, '').replace('submission.', ''));
        stringVar = stringVar.replace(variable, value);
      });
    }

    return stringVar;
  }

  /**
   * Formio Custom Event Callback
   * @param event
   *  Formio CustomEvent
   */
  onCustomEvent(event) {
    try {
      if (event.hasOwnProperty('type')) {
        switch (event.type) {
          case 'complete':
            this.onSubmit(event).then(() => {
              if (event.component.properties && event.component.properties.variables) {
                event.component.properties.variables = this.parseVariables(event.component.properties.variables);
              }
              this.customEvent.emit(event);
            });
            break;
          default:
            this.customEvent.emit(event);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Loads Formio Form Object.
   */
  loadForm() {
    this.formFormio = new Formio(this.formUrl);
    this.formLoading = this.formFormio
      .loadForm()
      .then((form) => {
        this.form = form;
        this.formResolve(form);
        return form;
      }, (err) => this.onFormError(err))
      .catch((err) => this.onFormError(err));
    return this.formLoading;
  }

  /**
   * FormLoad Error Callback
   */
  onFormError(err) {
    this.formReject(err);
    this.onError(err);
  }

  /**
   * On Resource load / save Error
   */
  onError(error) {
    throw error;
  }


  /**
   * On Form Submit Callback
   * @param event
   *  Form Submission Event
   */
  onSubmit(event) {
    const submission = event.submission ? event.submission : event;
    return this.save(submission).then((data) => {
      submission._id = data._id;
      this.submit.emit(submission);
    });

  }

  /**
   * Save Formio Resource
   */
  save(resource: any) {
    const formio = resource._id ? this.formio : this.formFormio;
    return formio
      .saveSubmission(resource)
      .then(
        (saved: any) => {
          this.resource = saved;
          saved._fvid = this.form._vid;
          return saved;
        },
        (err: any) => this.onError(err)
      )
      .catch((err: any) => this.onError(err));
  }

  ngOnInit() {

    this.setContext();
    this.loadForm();

    if (this.resourceId) {
      this.loadResource();
    }
    this.language.next(this.translate.currentLang);

    this.translate.onLangChange.subscribe(data => {
      this.language.next(data.lang);
    });
  }


  ngOnDestroy() {
    // Formio.clearCache();
  }

}
