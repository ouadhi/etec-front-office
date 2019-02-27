import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent {

  constructor(
    private http: HttpClient,
    ) { }

    dummyData = {
    totalCount: 200, items:
      [{
        id: 1, caseName: 'طلب صرف مكافأة نجاح',
        department: 'إدارة الأبناء', caseType: 'الخدمات التعليمية',
        caseDate: '10/02/2019',
        status: 'تحت المعالجة', beneficiary: 'عبد الله الحربي - من 15 الى 20 - عازب', description: 'مكافأة نجاح من الصف الثالث متوسط'
      },
      {
        id: 12, caseName: 'طلب إعانة علاجية ',
        department: 'إدارة التمكين', caseType: 'المساعدة المالية',
        caseDate: '24/01/2019', status: 'تحت المعالجة',
        beneficiary: 'ابراهيم العتيبي - من 21 الى 30 - عازب',
        description: 'دورة تأهيل في النجاره'
      },
      {
        id: 50, caseName: 'طلب إعانة تهيئة مبتعث',
        department: 'إدارة الأبناء',
        caseType: 'الخدمات التعليمية',
        caseDate: '01/01/2019',
        status: 'معلق', beneficiary: 'ابراهيم العتيبي - من 21 الى 30 - عازب', description: 'ابتعاث لاكمال الماجستير في جامعة لندن'
      }]
  };
  dashletCols = {
    caseName: { name: 'Name', sortable: true },
    department: { name: 'Department', sortable: true, display: 'chip', color: 'tertiary', icon: 'cube' },
    caseType: { name: 'Type', sortable: true, display: 'badge', color: 'primary' },
    caseDate: { name: 'Date', sortable: true, display: 'chip', color: 'medium', icon: 'calendar' },
    status: { name: 'Status', sortable: true, display: 'badge', color: 'secondary' },
    beneficiary: { name: 'Beneficiary', sortable: true },
    description: { name: 'Description', sortable: false }
  };
  dashletService = (queryParams) => {
    console.log("dashletService-----");
    console.log(queryParams);
    // pass params to service function and return observable
    const delayedObservable = of(this.dummyData).pipe(
      delay(1000)
    );
    return delayedObservable;
  }
  

}
