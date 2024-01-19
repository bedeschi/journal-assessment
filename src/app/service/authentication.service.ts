import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private apiUrl = `${environment.authUrl}`;

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', 'dailylistmock-qa');
    body.set('client_secret', 'afg5meg1bof0');
    body.set('scope', 'DataServices.JOURNAL.API');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
}
