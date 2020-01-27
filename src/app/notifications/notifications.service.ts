import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionService } from '../session.service';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService implements OnInit {
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listener: Observable<any>;
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  pageSize = 15;
  // tslint:disable-next-line:variable-name
  private _notifications = [];
  get notifications(): Array<object> {
    return this._notifications;
  }
  // tslint:disable-next-line:variable-name
  private _notificationsCount = 0;
  get notificationsCount(): number {
    return this._notificationsCount;
  }
  constructor(private http: HttpClient, private sessionService: SessionService, public router: Router) {

  }
  ngOnInit() {
    this.doCountNew(this.sessionService.getUsername()).subscribe((data) => {
      this._notificationsCount = data;
    });
  }
  fetchNotifications() {
    const observable = this.doGetNotifications(this.sessionService.getUsername(), {
      page: this._notifications.length > 0 ? Math.ceil(this._notifications.length / this.pageSize) : 0,
      size: this.pageSize,
      paged: true,
      sort: 'sendDate,desc',
      sorted: true
    });
    observable.subscribe((notifications) => {
      this._notifications = this._notifications.concat(notifications.items);
    });
    return observable;
  }
  resetCount() {
    this._notificationsCount = 0;

    /*
    this.restService.resetCountNew(this.keycloakService.getUsername()).subscribe(() => {
    });
     */
  }
  markAllAsRead() {
    this.doMarkAllAsRead(this.sessionService.getUsername()).subscribe(() => {
      this._notifications.forEach(item => item.status = 'READ');
    });
  }
  updateStatus(notification) {
    const bool = (notification.status === 'UN_READ' || notification.status === 'NEW');
    if (bool) {
      this.doMarkAsRead(notification.id).subscribe(() => {
        notification.status = 'READ';

      });
    } else {
      this.doMarkAsUnread(notification.id).subscribe(() => {
        notification.status = 'UN_READ';

      });
    }
  }
  deleteNotification(notification) {
    this.doDeleteNotification(notification.id).subscribe(() => {
      this._notifications.filter((item, index) => {
        if (item.id === notification.id) {
          this._notifications.splice(index, 1);
          return;
        }
      });
    });
  }

  doGetNotifications(userId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/all/backOffice/${userId}`;
    return this.http.get<any>(endpoint, { observe: 'response', params: queryParams }).pipe(
      map(resp => ({
        totalCount: resp.headers.get('x-total-count'),
        items: resp.body.map((item) => item)
      })),
      publishReplay(1),
      refCount()
    );
  }
  doCountNew(userId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/countNew/${userId}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doResetCountNew(userId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/resetCount/${userId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doCountUnread(userId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/countUnRead/${userId}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAllAsRead(userId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/markAllAsRead/${userId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAsRead(notificationId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/markAsRead/${notificationId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAsUnread(notificationId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/markAsUnRead/${notificationId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doDeleteNotification(notificationId, queryParams = {}) {
    const endpoint = `${environment.notifications.api}system-notifications/${notificationId}`;
    return this.http.delete<any>(endpoint, { params: queryParams }).pipe(
    );
  }
}
