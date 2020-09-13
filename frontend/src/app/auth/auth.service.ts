import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Credentials {
  email: string;
  password: string;
}

interface LoggedInSuccessfully {
  expiresIn: number;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

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
