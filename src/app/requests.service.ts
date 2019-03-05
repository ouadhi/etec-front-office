import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  dummyRequests = {
    totalCount: 200,
    requests: [
      {
        id: 1,
        requestName: 'طلب صرف مكافأة نجاح',
        department: 'إدارة الأبناء',
        requestCategory: 'الخدمات التعليمية',
        requestDate: '10/02/2019',
        status: 'تحت المعالجة',
        description: 'مكافأة نجاح من الصف الثالث متوسط'
      },
      {
        id: 12,
        requestName: 'طلب إعانة علاجية ',
        department: 'إدارة التمكين',
        requestCategory: 'المساعدة المالية',
        requestDate: '24/01/2019',
        status: 'تحت المعالجة',
        description: 'دورة تأهيل في النجاره'
      },
      {
        id: 50,
        requestName: 'طلب إعانة تهيئة مبتعث',
        department: 'إدارة الأبناء',
        requestCategory: 'الخدمات التعليمية',
        requestDate: '01/01/2019',
        status: 'معلق',
        description: 'ابتعاث لاكمال الماجستير في جامعة لندن'
      }
    ]
  };
  constructor(private http: HttpClient) { }

  getDummyRequests(params) {
    const delayedObservable = of(this.dummyRequests).pipe(
      delay(1000)
    );
    return delayedObservable;
  }
}
