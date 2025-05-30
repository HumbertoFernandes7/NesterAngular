import { Component, Input, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { MenuLateralDireitoComponent } from '../menu-lateral-direito/menu-lateral-direito.component';
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { CommonModule, NgIf } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { PostagemService } from '../../services/postagem.service';
import { forkJoin } from 'rxjs';
import { PostagemEditarComponent } from '../postagem-editar/postagem-editar.component';
import { FormsModule } from '@angular/forms';
import { FollowService } from '../../services/follow.service';

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
  @Input() isOwner: boolean = true;
  @Input() postagens: Postagem[] = [];
  @Input() usuario!: Usuario;
  @Input() isFollowing = false;

  editarPerfilVisivel = false;

  constructor(
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    public postagemService: PostagemService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    if (this.isOwner) {
      this.listarPostagensUsuarioLogado();
    }
  }

  listarPostagensUsuarioLogado() {
    forkJoin({
      usuario: this.usuarioService.buscarDadosUsuarioLogado(),
      postagens: this.postagemService.listarPostagensUsuarioLogado(),
    }).subscribe({
      next: ({ postagens, usuario }) => {
        this.postagens = this.postagemService.prepararPostagens(
          postagens,
          usuario
        );
        this.usuario = usuario;
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
        this.usuario.foto = URL.createObjectURL(blob);
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
        postagem.menuAberto = false;
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
    postagem.menuAberto = false;
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
    if (!this.verificarSenhaValida() && this.usuario.nome != null) {
      this.usuarioService.atualizarUsuario(this.usuario).subscribe({
        next: () => {
          this.editarPerfilVisivel = false;
          this.listarPostagensUsuarioLogado();
          this.toastService.success('Perfil editado com sucesso!');
        },
        error: () => {
          this.listarPostagensUsuarioLogado();
          this.toastService.error('Dados inválidos ou não informados! ');
        },
      });
    } else {
      this.listarPostagensUsuarioLogado();
      this.toastService.error(
        'Erro ao editar perfil, senha inválida ou não informada!'
      );
    }
  }

  seguirUsuario(usuario: Usuario) {
    this.followService.follow(usuario).subscribe({
      next: (retorno) => {
        this.isFollowing = !this.isFollowing;
        this.toastService.success(retorno);
      },
      error: () => {
        this.toastService.error('Erro inesperado!');
      },
    });
  }

  atualizarFotoPerfil(file: File) {
    this.usuarioService.atualizarFotoPerfil(this.usuario.id, file).subscribe({
      next: () => {
        this.carregarFotoUsuarioLogado();
        this.toastService.success('Foto atualizada com sucesso!');
      },
      error: (erro) => {
        this.toastService.error(erro.error.message);
      },
    });
  }

  aoSelecionarFotoPerfil(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.atualizarFotoPerfil(file);
  }

  private verificarSenhaValida() {
    if (
      this.usuario.senha == null ||
      this.usuario.senha == undefined ||
      this.usuario.senha.length < 8
    ) {
      return true;
    } else {
      return false;
    }
  }
}
