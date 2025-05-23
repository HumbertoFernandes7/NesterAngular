import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { MenuLateralDireitoComponent } from '../menu-lateral-direito/menu-lateral-direito.component';
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { CommonModule, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { NgIcon } from '@ng-icons/core';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { PostagemService } from '../../services/postagem.service';
import { forkJoin } from 'rxjs';
import { PostagemEditarComponent } from '../postagem-editar/postagem-editar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [
    MenuLateralComponent,
    MenuMobileComponent,
    MenuLateralDireitoComponent,
    PostagemCadastoComponent,
    CommonModule,
    NgIf,
    NgIcon,
    PostagemEditarComponent,
    FormsModule,
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css',
})
export class MeuPerfilComponent implements OnInit {
  postagens: Postagem[] = [];
  usuarioLogado!: Usuario;
  editarPerfilVisivel = false;

  constructor(
    private feedService: FeedService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    public postagemService: PostagemService
  ) {}

  ngOnInit(): void {
    this.listarPostagensUsuarioLogado();
  }

  listarPostagensUsuarioLogado() {
    forkJoin({
      usuarioLogado: this.usuarioService.buscarDadosUsuarioLogado(),
      postagens: this.feedService.listarPostagensUsuarioLogado(),
    }).subscribe({
      next: ({ postagens, usuarioLogado }) => {
        this.postagens = this.postagemService.prepararPostagens(
          postagens,
          usuarioLogado
        );
        this.usuarioLogado = usuarioLogado;
        this.carregarFotoUsuarioLogado();
      },
      error: (erro) => {
        this.toastService.error('Erro inesperado ao listar postagens ' + erro);
      },
    });
  }

  carregarFotoUsuarioLogado() {
    this.usuarioService.buscarFotoUsuarioLogado().subscribe({
      next: (blob) => {
        this.usuarioLogado.foto = URL.createObjectURL(blob);
      },
      error: (erro) => {
        this.toastService.error(
          'Erro inesperado ao carregar foto do usuário ' + erro.message
        );
      },
    });
  }

  curtirPostagem(postagem: Postagem) {
    this.postagemService.curtirPostagem(postagem);
  }

  removerCurtida(postagem: Postagem) {
    this.postagemService.removerCurtida(postagem);
  }

  deletarPostagem(postagem: Postagem) {
    this.postagemService.deletarPostagem(postagem).subscribe({
      next: () => {
        this.toastService.success('Postagem deletada com sucesso!');
        this.listarPostagensUsuarioLogado();
      },
      error: (erro) => {
        this.toastService.error(
          'Erro inesperado ao deletar postagem ' + erro.message
        );
      },
    });
  }

  editarPostagem(postagem: Postagem) {
    this.postagemService.editarPostagem(postagem).subscribe({
      next: () => {
        this.toastService.success('Postagem editada com sucesso!');
        this.listarPostagensUsuarioLogado();
      },
      error: (erro) => {
        this.toastService.error(
          'Erro inesperado ao editar postagem ' + erro.message
        );
      },
    });
  }

  abrirModalEditarPostagem(postagem: Postagem) {
    this.postagemService.postagem = postagem;
    this.postagemService.abrirModalEdicao();
  }

  editarPerfil() {
    this.editarPerfilVisivel = true;
  }

  fecharEdicaoPerfil() {
    this.editarPerfilVisivel = false;
  }

  salvarEdicaoPerfil() {
    if (!this.verificarSenhaValida() && this.usuarioLogado.nome != null) {
      this.usuarioService.atualizarUsuario(this.usuarioLogado).subscribe({
        next: () => {
          this.editarPerfilVisivel = false;
          this.listarPostagensUsuarioLogado();
          this.toastService.success('Perfil editado com sucesso!');
        },
        error: () => {
          this.listarPostagensUsuarioLogado();
          this.toastService.error("Dados inválidos ou não informados! ");
        },
      });
    } else {
      this.listarPostagensUsuarioLogado();
      this.toastService.error('Erro ao editar perfil, senha inválida ou não informada!');
    }
  }

  verificarSenhaValida() {
    if (
      this.usuarioLogado.senha == null ||
      this.usuarioLogado.senha == undefined ||
      this.usuarioLogado.senha.length < 8
    ) {
      return true;
    } else {
      return false;
    }
  }
}
