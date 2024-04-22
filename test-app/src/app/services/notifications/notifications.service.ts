import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification';
import {
  AddNotification,
  DeleteNotification,
} from '../../store/notification.actions';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private store: Store) {}

  public getNotifications(): Observable<Notification[]> {
    return this.store.select((state) => state.notificationsState.notifications);
  }

  public createNotification(notification: Notification): void {
    this.store.dispatch(new AddNotification(notification));
  }

  public deleteNotification(id: number): void {
    this.store.dispatch(new DeleteNotification(id));
  }
}
