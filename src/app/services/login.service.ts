import { Injectable } from '@angular/core';
import { Login } from '../modulos/login';
import { Token } from '../modulos/token';
import { environment } from '../../environments/environment.desenv';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

const URL_API = environment.api_url + '/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpCLiente: HttpClient) {}

  login(login: Login) {
    return this.httpCLiente.post<Token>(`${URL_API}/login`, login).pipe(
      tap((retorno) => {
        localStorage.setItem('token', retorno.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
