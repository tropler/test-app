import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../../models/company';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private urlBase: string = 'http://localhost:24589';

  constructor(private httpClient: HttpClient) {}

  public getCompaniesList(): Observable<Company[]> {
    return this.httpClient
      .get<Company[]>(this.urlBase + '/company')
      .pipe(catchError(this.handleError));
  }

  public getCompanyById(id: number): Observable<Company> {
    return this.httpClient
      .get<Company>(this.urlBase + `/company/${id}`)
      .pipe(catchError(this.handleError));
  }

  public createCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(this.urlBase + `/company`, company)
      .pipe(catchError(this.handleError));
  }

  public updateCompany(company: Company, id: number): Observable<Company> {
    return this.httpClient
      .patch<Company>(this.urlBase + `/company/${id}`, company)
      .pipe(catchError(this.handleError));
  }

  public deleteCompany(id: number) {
    return this.httpClient
      .delete<Company>(this.urlBase + `/company/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(
      () => new Error('Произошла ошибка, повторите попытку позже.')
    );
  }
}
