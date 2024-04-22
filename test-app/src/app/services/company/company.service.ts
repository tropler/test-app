import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../../models/company';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private urlBase: string = 'http://localhost:24589';

  constructor(private httpClient: HttpClient) {}

  public getCompaniesList(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.urlBase + '/company');
  }

  public getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(this.urlBase + `/company/${id}`);
  }

  public createCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(this.urlBase + `/company`, company);
  }

  public updateCompany(company: Company, id: number): Observable<Company> {
    return this.httpClient.patch<Company>(
      this.urlBase + `/company/${id}`,
      company
    );
  }

  public deleteCompany(id: number) {
    return this.httpClient.delete<Company>(this.urlBase + `/company/${id}`);
  }
}
