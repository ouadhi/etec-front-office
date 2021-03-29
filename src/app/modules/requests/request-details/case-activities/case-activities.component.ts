import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CaseActivityService } from './case-activities.service';

@Component({
    selector: 'app-case-activities',
    templateUrl: 'case-activities.component.html',
    styleUrls: ['case-activities.component.scss'],
    providers: [CaseActivityService]
})

export class CaseActivitiesComponent extends BaseComponent implements OnInit {

    @Input() caseInstanceId;
    @Output() activityAction = new EventEmitter();
    @Output() task = new EventEmitter();
    activities = [];
    initSlider = false;
    customOptions;

    constructor(public injector: Injector,
        private caseActivityService: CaseActivityService) { super(injector); }

    action(activity) {
        console.log(activity);
        this.activityAction.emit({
            type: 'task', activity
            /*
            formKey: this.tasks[this.tasks.length - 1].formKey,
            caseDefinitionId: this.tasks[this.tasks.length - 1].caseDefinitionId,
            caseInstanceId: this.tasks[this.tasks.length - 1].caseInstanceId,
            taskDefinitionKey: this.tasks[this.tasks.length - 1].taskDefinitionKey,
            taskId: this.tasks[this.tasks.length - 1].taskId
            */
        });
    }
    doInitSlider() {
        this.initSlider = false;
        const rtl = this.translateService.currentLang === 'ar';
        this.customOptions = {
            loop: false,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            navSpeed: 700,
            autoWidth: false,
            mergeFit: true,
            center: false,
            margin: 5,
            rtl: rtl,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
                },
                640: {
                    items: 2
                },
                940: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1440: {
                    items: 6
                },
                1700: {
                    items: 7
                }
            },
        };
        if (rtl) {
            this.customOptions.navText = this.customOptions.navText.reverse();
        }
        setTimeout(() => {
            this.initSlider = true;
        }, 0);

    }

    onInit(event, slider) {
        console.log(slider);
        slider.to(slider.slidesData[slider.slidesData.length - 1].id);
    }
    ngOnInit(): void {
        this.doInitSlider();
        this.sub = this.translateService.onLangChange.subscribe(() => {
            this.doInitSlider();
        });
        this.sub = this.caseActivityService.getCaseHistoryActivities({ caseInstanceId: this.caseInstanceId })
            .subscribe(data => {

                this.activities = data;
                this.activities.forEach(activity => {
                    if (activity.caseActivityName === 'task') {
                        activity.caseActivityName = this.switchLangService.getTranslated('SERVICE.beneficiaryTask');
                    }
                    else {
                        activity.caseActivityName = this.switchLangService.getTranslated(activity.caseActivityName, 'STATUSES');
                    }
                    if (activity.caseActivityType === 'humanTask' && activity.active && !activity.completed) {
                        this.task.emit(activity);
                    }
                });
            });
    }
}
