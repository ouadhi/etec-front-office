import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { KeycloakService } from 'keycloak-angular';
import { SessionService } from '../../core/services/session.service';

@Injectable({ providedIn: 'root' })
export class NotificationsService implements OnInit {
  stompClient = null;
  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any;
  listenerObserver: EventEmitter<any> = new EventEmitter();
  alreadyConnectedOnce = false;
  pageSize = 15;
  private subscription: Stomp.Subscription;

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
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    public router: Router,
    private keycloak: KeycloakService,

  ) {
    this.connect();
    this.connection = this.createConnection();
    this.subscribe();
    this.getCount();

  }
  getCount() {
    this.doCountNew(this.sessionService.getUsername()).subscribe((data) => {
      this._notificationsCount = data;
    });
  }

  async connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url;
    url = `${environment.gateway}${environment.endpoints.socket}`;
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers = {
      // Upgrade: 'websocket',
      // Connection: 'Upgrade',
      token: `${await this.keycloak.getToken()}`
    };
    this.stompClient.connect(
      headers,
      () => {
        this.connectedPromise('success');
        this.connectedPromise = null;
        if (!this.alreadyConnectedOnce) {
          this.alreadyConnectedOnce = true;
        }
      }
    );
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.alreadyConnectedOnce = false;
  }



  subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/user/topic/notification', data => {
        const notification = JSON.parse(data.body);
        this._notifications.unshift(notification);
        this.getCount();
        this.listenerObserver.emit(notification);
      });
    });
  }

  unsubscribe() {
    if (this.subscriber !== null) {
      this.subscriber.unsubscribe();
    }
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
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
  updateStatus(notification, onOpen = false) {
    const bool = (notification.status === 'UN_READ' || notification.status === 'NEW' || onOpen);
    if (bool) {
      this.doMarkAsRead(notification.id).subscribe(() => {
        notification.status = 'READ';
        this.getCount();
      });
    } else {
      this.doMarkAsUnread(notification.id).subscribe(() => {
        notification.status = 'UN_READ';
        this.getCount();
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
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/all/backOffice/${userId}`;
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
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/countNew/${userId}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doResetCountNew(userId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/resetCount/${userId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doCountUnread(userId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/countUnRead/${userId}`;
    return this.http.get<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAllAsRead(userId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/markAllAsRead/${userId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAsRead(notificationId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/markAsRead/${notificationId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doMarkAsUnread(notificationId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/markAsUnRead/${notificationId}`;
    return this.http.put<any>(endpoint, { params: queryParams }).pipe(
    );
  }
  doDeleteNotification(notificationId, queryParams = {}) {
    const endpoint = `${environment.gateway}${environment.endpoints.notifications}system-notifications/${notificationId}`;
    return this.http.delete<any>(endpoint, { params: queryParams }).pipe(
    );
  }
}