import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { Company } from '../../models/company';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-company-view',
  standalone: true,
  imports: [TuiSvgModule, RouterLink],
  templateUrl: './company-view.component.html',
  styleUrl: './company-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyViewComponent implements OnInit {
  public company: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompany();
  }

  private getCompany(): void {
    const companyId = +this.route.snapshot.paramMap.get('id');

    this.companyService
      .getCompanyById(companyId)
      .subscribe((response: Company) => {
        this.company = response;
      });
  }
}
