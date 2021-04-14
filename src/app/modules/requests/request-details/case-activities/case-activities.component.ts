import { Component, EventEmitter, Injector, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CaseActivityService } from '../../case-activities.service';

@Component({
    selector: 'app-case-activities',
    templateUrl: 'case-activities.component.html',
    styleUrls: ['case-activities.component.scss'],
    providers: [CaseActivityService]
})

export class CaseActivitiesComponent extends BaseComponent implements OnInit, AfterViewInit {
    horizontalScrollMenu = null;
    showScrollBtns = false;

    @Input() caseInstanceId;
    @Output() activityAction = new EventEmitter();
    @Output() task = new EventEmitter();
    activities = [];
    initSlider = false;
    customOptions;

    constructor(public injector: Injector,
        private caseActivityService: CaseActivityService) { super(injector); }

    action(activity) {
        this.loggerService.log(activity);
        this.activityAction.emit({
            type: 'task', activity
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
            autoWidth: true,
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
        this.loggerService.log(slider);
        slider.to(slider.slidesData[slider.slidesData.length - 1].id);
    }
    ngOnInit(): void {
        this.doInitSlider();
        this.sub = this.translateService.onLangChange.subscribe(() => {
            this.doInitSlider();
        });
        this.sub = this.caseActivityService.getCaseHistoryActivities({
            sortBy: 'endTime',
            sortOrder: 'asc', caseInstanceId: this.caseInstanceId
        })
            .subscribe(data => {

                this.activities = data;

                const listWidth = (300 * this.activities.filter(q => q.completed).length) + 10;
                setTimeout(() => {
                    this.horizontalScrollMenu = document.getElementsByClassName('horizontalScrollMenu')[0];
                    this.showScrollBtns = this.horizontalScrollMenu.offsetWidth < listWidth;
                    if (this.translateService.currentLang == "ar")
                        this.next(listWidth);
                    else this.prev(listWidth);
                }, 250);

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
    ngAfterViewInit(): void {
        this.horizontalScrollMenu = document.getElementsByClassName('horizontalScrollMenu')[0];
    }

    next(step: number = 500): void {
        this.horizontalScrollMenu.scrollLeft = this.horizontalScrollMenu.scrollLeft - step;
    }

    prev(step: number = 500): void {
        this.horizontalScrollMenu.scrollLeft = this.horizontalScrollMenu.scrollLeft + step;
    }
}
