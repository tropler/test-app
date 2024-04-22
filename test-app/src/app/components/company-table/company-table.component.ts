import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { Company } from '../../models/company';
import { TuiRootModule, TuiSvgModule } from '@taiga-ui/core';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TABLE_COLUMN_NAMES } from '../../constants/tableColumnNames.constant';
import { CompanyDeleteModalComponent } from '../company-delete-modal/company-delete-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-table',
  standalone: true,
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss',
  imports: [
    TuiRootModule,
    TuiTableModule,
    TuiTablePaginationModule,
    CompanyDeleteModalComponent,
    TuiSvgModule,
    RouterLink,
  ],
})
export class CompanyTableComponent implements OnInit {
  public columns: string[] = TABLE_COLUMN_NAMES;

  public companiesList: Company[];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.updateCompaniesList();
  }

  public updateCompaniesList(): void {
    this.companyService.getCompaniesList().subscribe((response: Company[]) => {
      this.companiesList = response;
    });
  }
}
