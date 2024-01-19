import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SecurityService } from './authentication.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = `${environment.apiUrl}`;

  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  private fetchAccessToken(): Observable<string> {
    return this.securityService.getAccessToken().pipe(
      catchError((error) => {
        console.error('Error fetching access token:', error);
        return of('');
      })
    );
  }

  private getValidAccessToken(): Observable<string> {
    if (this.accessToken && !this.isTokenExpired(this.accessToken)) {
      return of(this.accessToken);
    } else {
      return this.fetchAccessToken().pipe(
        switchMap((token) => {
          if (token) {
            this.accessToken = token;
            return of(token);
          } else {
            console.error('Failed to obtain a valid access token.');
            return of('');
          }
        })
      );
    }
  }

  private isTokenExpired(token: string): boolean {
    // Implement your logic to check if the token is expired here.
    // You may need to parse the token and check the expiration time.
    // Return true if expired, false otherwise.
    return false; // Modify this logic according to your needs.
  }

  getJournalData(): Observable<any> {
    return this.getValidAccessToken().pipe(
      switchMap((accessToken) => {
        if (accessToken) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          });

          return this.http.get(this.apiUrl, { headers });
        } else {
          console.error(
            'Unable to fetch journal data due to invalid access token.'
          );
          return of(null);
        }
      })
    );
  }
}
