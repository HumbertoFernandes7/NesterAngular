import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';
import { Email } from '../interfaces/email';
import { ResetSenha } from '../interfaces/resetSenha';
import { Seguidor } from '../interfaces/seguidor';

const URL_API = environment.api_url + '/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  buscarUsuarioPorId(id: number) {
    return this.http.get<Usuario>(`${URL_API}/buscar/${id}`);
  }

  buscarDadosUsuarioLogado() {
    return this.http.get<Usuario>(`${URL_API}/logado`);
  }

  buscarQuantidadeSeguidoresESeguidos(id: number){
    return this.http.get<Seguidor>(`${URL_API}/quantidade-seguidores-e-seguidos/${id}`)
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

  atualizarFotoPerfil(id: number, file: File) {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.put<void>(`${URL_API}/atualizar/foto-perfil/${id}`, form);
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
