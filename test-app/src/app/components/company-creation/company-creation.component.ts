import { CompanyService } from './../../services/company/company.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiErrorModule } from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import {
  addressEqualityValidator,
  innValidator,
  kppValidator,
} from '../../validators/validators';
import { Router, RouterLink } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';
import {
  Notification,
  NotificationDescription,
  NotificationTypes,
} from '../../models/notification';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-creation',
  standalone: true,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Это поле не должно быть пустым!',
      },
    },
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiErrorModule,
    AsyncPipe,
    TuiCheckboxModule,
    TuiCheckboxLabeledModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './company-creation.component.html',
  styleUrl: './company-creation.component.scss',
})
export class CompanyCreationComponent implements OnInit {
  public creationForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.creationForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      inn: new FormControl('', [Validators.required, innValidator]),
      kpp: new FormControl('', [Validators.required, kppValidator]),
      postAddress: new FormControl('', Validators.required),
      factAddress: new FormControl('', Validators.required),
      isAddressEq: new FormControl(false, [Validators.required]),
    });

    this.creationForm
      .get('isAddressEq')
      .setValidators(addressEqualityValidator(this.creationForm));
  }

  public validateEqualityCheckbox(): void {
    this.creationForm.get('isAddressEq').updateValueAndValidity();
    this.creationForm.get('isAddressEq').markAsTouched();
  }

  public submitForm(): void {
    this.creationForm.markAllAsTouched();

    if (this.creationForm.valid) {
      this.companyService
        .createCompany(this.creationForm.value)
        .subscribe((res: Company) => {
          this.createNotification(res.id);
          this.router.navigate(['/']);
        });
    }
  }

  private createNotification(id: number): void {
    const notification: Notification = {
      id: id,
      description: NotificationDescription.CREATE_DESCRIPTION,
      type: NotificationTypes.CREATE,
    };

    this.notificationsService.createNotification(notification);
  }
}
