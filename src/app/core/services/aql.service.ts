import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/config/app-config.service';
import { IAql } from '../models/aql.interface';

@Injectable({
  providedIn: 'root'
})
export class AqlService {
  private baseUrl: string;

  private aqls: IAql[] = [];
  private aqlsSubject$ = new BehaviorSubject(this.aqls);
  public aqlsObservable$ = this.aqlsSubject$.asObservable();

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/aql`;
  }

  getAll(): Observable<IAql[]> {
    return this.httpClient.get<IAql[]>(this.baseUrl)
      .pipe(
        tap((aqls) => {
          this.aqls = aqls;
          this.aqlsSubject$.next(aqls);
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
