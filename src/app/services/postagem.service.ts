import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.desenv';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../interfaces/postagem';
import { Usuario } from '../interfaces/usuario';
import { CurtidaService } from './curtida.service';
import { ToastrService } from 'ngx-toastr';

const URL_API = environment.api_url + '/postagem';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(
    private http: HttpClient,
    private curtidaService: CurtidaService,
    private toastService: ToastrService
  ) {}

  cadastrarPostagem(postagem: Postagem) {
    return this.http.post<Postagem>(`${URL_API}/cadastrar`, postagem);
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
}
