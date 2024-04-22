import { Routes } from '@angular/router';
import { CompanyTableComponent } from './components/company-table/company-table.component';

export const routes: Routes = [
  { path: '', component: CompanyTableComponent },
  {
    path: 'company/create',
    loadComponent: () =>
      import('./components/company-creation/company-creation.component').then(
        (mod) => mod.CompanyCreationComponent
      ),
  },
  {
    path: 'company/change/:id',
    loadComponent: () =>
      import('./components/company-change/company-change.component').then(
        (mod) => mod.CompanyChangeComponent
      ),
  },
  {
    path: 'company/:id',
    loadComponent: () =>
      import('./components/company-view/company-view.component').then(
        (mod) => mod.CompanyViewComponent
      ),
  },
];
