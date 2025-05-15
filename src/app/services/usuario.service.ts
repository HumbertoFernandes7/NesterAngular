import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment.desenv';
import { Email } from '../interfaces/email';

const URL_API = environment.api_url + "/usuarios";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${URL_API}/cadastrar`, usuario);
  }

  enviarEmailResetSenha(email: Email) {
    return this.http.post<Email>(`${URL_API}/enviar-email`, email);
  }
}
