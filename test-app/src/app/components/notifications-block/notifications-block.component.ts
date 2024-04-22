import { TuiSvgModule } from '@taiga-ui/core';
import { Notification } from '../../models/notification';
import { NotificationsService } from './../../services/notifications/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications-block',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './notifications-block.component.html',
  styleUrl: './notifications-block.component.scss',
})
export class NotificationsBlockComponent implements OnInit {
  public notificationsList: Notification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsService
      .getNotifications()
      .subscribe((response: Notification[]) => {
        this.notificationsList = response;
      });
  }

  public deleteNotification(id: number): void {
    this.notificationsService.deleteNotification(id);
  }
}
