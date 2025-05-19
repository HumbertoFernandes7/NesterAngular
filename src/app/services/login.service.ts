import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Token } from '../interfaces/token';
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
        localStorage.setItem('tipo', retorno.tipo);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
