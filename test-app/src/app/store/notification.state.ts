import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddNotification, DeleteNotification } from './notification.actions';
import { Notification } from '../models/notification';
import { patch, removeItem } from '@ngxs/store/operators';

export interface NotificationsStateModel {
  notifications: Notification[];
}

@State<NotificationsStateModel>({
  name: 'notificationsState',
  defaults: {
    notifications: [],
  },
})
@Injectable()
export class NotificationsState {
  @Action(AddNotification)
  createNotification(
    ctx: StateContext<NotificationsStateModel>,
    action: AddNotification
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      notifications: [...state.notifications, action.notification],
    });
  }
  @Action(DeleteNotification)
  deleteNotification(
    ctx: StateContext<NotificationsStateModel>,
    action: DeleteNotification
  ) {
    ctx.setState(
      patch({
        notifications: removeItem<Notification>(
          (notification: Notification) => notification.id === action.id
        ),
      })
    );
  }
}
