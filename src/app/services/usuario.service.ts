import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment.desenv';
import { Email } from '../interfaces/email';
import { ResetSenha } from '../interfaces/resetSenha';
import { ToastrService } from 'ngx-toastr';

const URL_API = environment.api_url + '/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private toastService: ToastrService
  ) {}

  buscarUsuarioPorId(id: number) {
    return this.http.get<Usuario>(`${URL_API}/buscar/${id}`);
  }

  buscarDadosUsuarioLogado() {
    return this.http.get<Usuario>(`${URL_API}/logado`);
  }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${URL_API}/cadastrar`, usuario);
  }

  buscarUsuariosPor(por: string) {
    return this.http.get<Usuario[]>(`${URL_API}/buscar?por=${por}`);
  }

  atualizarUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(`${URL_API}/atualizar`, usuario);
  }

  buscarFotoUsuarioPeloId(id: number) {
    return this.http.get(`${URL_API}/foto-perfil/${id}`, {
      responseType: 'blob',
    });
  }

  buscarFotoUsuarioLogado() {
    return this.http.get(`${URL_API}/minha/foto-perfil`, {
      responseType: 'blob',
    });
  }

  enviarEmailResetSenha(email: Email) {
    return this.http.post<Email>(`${URL_API}/enviar-email`, email);
  }

  resetarSenha(resetSenha: ResetSenha, hash: string, id: string) {
    return this.http.put<ResetSenha>(
      `${URL_API}/recuperar-senha/${hash}/${id}`,
      resetSenha
    );
  }

  buscarUsuariosRecomendados() {
    return this.http.get<Usuario[]>(`${URL_API}/recomendados`);
  }
}
