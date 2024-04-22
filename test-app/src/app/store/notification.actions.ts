import { Notification } from '../models/notification';

export class AddNotification {
  static readonly type = '[Notification Service] Add Notification';
  constructor(public notification: Notification) {}
}
export class DeleteNotification {
  static readonly type = '[Notification Service] Delete Notification';
  constructor(public id: number) {}
}
