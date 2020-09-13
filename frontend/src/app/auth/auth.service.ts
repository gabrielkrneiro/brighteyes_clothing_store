import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../common/services/session.service';

import { Credentials, LoggedInSuccessfully, TokenData } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  login(credentials: Credentials): Observable<LoggedInSuccessfully> {
    try {
      return this.httpClient.post<LoggedInSuccessfully>(
        `http://${environment.BACKEND_ADDRESS}/auth/sign-in`,
        credentials
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
