import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiSvgModule,
} from '@taiga-ui/core';
import { CompanyService } from '../../services/company/company.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../services/notifications/notifications.service';
import {
  Notification,
  NotificationDescription,
  NotificationTypes,
} from '../../models/notification';

@Component({
  selector: 'app-company-delete-modal',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './company-delete-modal.component.html',
  styleUrl: './company-delete-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDeleteModalComponent {
  @Input() public companyId: number;

  @Input() public companyFullName: string;

  @Output() public companyDelete: EventEmitter<boolean> = new EventEmitter();

  private dialogsSubscription: Subscription;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private companyService: CompanyService,
    private notificationsService: NotificationsService
  ) {}

  public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsSubscription = this.dialogs.open(content).subscribe();
  }

  public deleteCompany(): void {
    this.companyService.deleteCompany(this.companyId).subscribe(() => {
      this.createNotification();
      this.companyDelete.emit(true);
      this.dialogsSubscription.unsubscribe();
    });
  }

  private createNotification() {
    const notification: Notification = {
      id: this.companyId,
      description: NotificationDescription.DELETE_DESCRIPTION,
      type: NotificationTypes.DELETE,
    };

    this.notificationsService.createNotification(notification);
  }
}
