import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../interfaces/postagem';
import { Usuario } from '../interfaces/usuario';
import { CurtidaService } from './curtida.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const URL_API = environment.api_url + '/postagem';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  postagem!: Postagem
  modalCadastrarPostagem = false;
  modalEditarPostagem = false;

  constructor(
    private http: HttpClient,
    private curtidaService: CurtidaService,
    private toastService: ToastrService
  ) {}

  listarPostagensSeguindo(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${URL_API}/follow`);
  }

  listarForYou(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${URL_API}/foryou`);
  }

  listarPostagensUsuarioLogado(){
    return this.http.get<Postagem[]>(`${URL_API}/usuario`);
  }

  listarPostagensDoUsuarioPeloId(id: number): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${URL_API}/usuario/${id}`);
  }

  cadastrarPostagem(postagem: Postagem) {
    return this.http.post<Postagem>(`${URL_API}/cadastrar`, postagem);
  }

  editarPostagem(postagem: Postagem) {
    return this.http.put<Postagem>(`${URL_API}/atualizar/${postagem.id}`, postagem);
  }

  deletarPostagem(postagem: Postagem) {
    return this.http.delete(`${URL_API}/remover/${postagem.id}`);
  }

  prepararPostagens(postagens: Postagem[], usuarioLogado: Usuario) {
    return postagens.map((p) => ({
      ...p,
      quantidadeCurtidas: p.curtidas.length,
      jaCurtiu: p.curtidas.some((c) => c.usuario.id === usuarioLogado.id),
    }));
  }

  curtirPostagem(postagem: Postagem) {
    this.curtidaService.curtirPostagem(postagem.id).subscribe({
      next: () => {
        postagem.jaCurtiu = true;
        postagem.quantidadeCurtidas++;
      },
      error: () => {
        this.toastService.error('Erro inesperado ao curtir postagem');
      },
    });
  }

  removerCurtida(postagem: Postagem) {
    this.curtidaService.removerCurtida(postagem.id).subscribe({
      next: () => {
        postagem.jaCurtiu = false;
        postagem.quantidadeCurtidas--;
      },
      error: () => {
        this.toastService.error('Erro inesperado ao remover a curtida');
      },
    });
  }

  abrirModalCadastro() {
    this.modalCadastrarPostagem = true;
  }

  fecharModalCadastro() {
    this.modalCadastrarPostagem = false;
  }

  abrirModalEdicao() {
    this.modalEditarPostagem = true;
  }

  fecharModalEdicao() {
    this.modalEditarPostagem = false;
  }
}
