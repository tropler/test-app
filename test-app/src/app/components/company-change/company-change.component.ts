import { NotificationsService } from './../../services/notifications/notifications.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Company } from '../../models/company';
import { CompanyService } from './../../services/company/company.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  innValidator,
  kppValidator,
  addressEqualityValidator,
} from '../../validators/validators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TuiErrorModule } from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiCheckboxModule,
  TuiCheckboxLabeledModule,
} from '@taiga-ui/kit';
import {
  Notification,
  NotificationDescription,
  NotificationTypes,
} from '../../models/notification';

@Component({
  selector: 'app-company-change',
  standalone: true,
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
  templateUrl: './company-change.component.html',
  styleUrl: './company-change.component.scss',
})
export class CompanyChangeComponent implements OnInit {
  public company: Company;

  public changeForm: FormGroup;

  public isCompanyLoaded: boolean = false;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    const companyId = +this.route.snapshot.paramMap.get('id');

    this.companyService
      .getCompanyById(companyId)
      .subscribe((response: Company) => {
        this.company = response;
        this.isCompanyLoaded = true;
        this.setForm();
      });
  }

  private setForm(): void {
    this.changeForm = new FormGroup({
      fullName: new FormControl(this.company.fullName, Validators.required),
      shortName: new FormControl(this.company.shortName, Validators.required),
      inn: new FormControl(this.company.inn.toString(), [
        Validators.required,
        innValidator,
      ]),
      kpp: new FormControl(this.company.kpp.toString(), [
        Validators.required,
        kppValidator,
      ]),
      postAddress: new FormControl(
        this.company.postAddress,
        Validators.required
      ),
      factAddress: new FormControl(
        this.company.factAddress,
        Validators.required
      ),
      isAddressEq: new FormControl(
        this.company.isAddressEq,
        Validators.required
      ),
    });

    this.changeForm
      .get('isAddressEq')
      .setValidators(addressEqualityValidator(this.changeForm));
  }

  public validateEqualityCheckbox(): void {
    this.changeForm.get('isAddressEq').updateValueAndValidity();
    this.changeForm.get('isAddressEq').markAsTouched();
  }

  public submitForm(): void {
    this.changeForm.markAllAsTouched();

    if (this.changeForm.valid) {
      this.companyService
        .updateCompany(this.changeForm.value, this.company.id)
        .subscribe(() => {
          this.createNotification();
          this.router.navigate(['/']);
        });
    }
  }

  private createNotification(): void {
    const notification: Notification = {
      id: this.company.id,
      description: NotificationDescription.UPDATE_DESCRIPTION,
      type: NotificationTypes.UPDATE,
    };

    this.notificationsService.createNotification(notification);
  }
}
