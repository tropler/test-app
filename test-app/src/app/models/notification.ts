export interface Notification {
  type: string;
  description: string;
  id: number;
}

export enum NotificationTypes {
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum NotificationDescription {
  CREATE_DESCRIPTION = 'Новая запись была успешно создана!',
  UPDATE_DESCRIPTION = 'Запись была успешно обновлена!',
  DELETE_DESCRIPTION = 'Запись была удалена!',
}
