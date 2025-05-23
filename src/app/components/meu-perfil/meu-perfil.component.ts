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
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.css',
})
export class MeuPerfilComponent implements OnInit {
  postagens: Postagem[] = [];
  usuarioLogado!: Usuario;

  constructor(
    public feedService: FeedService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    private postagemService: PostagemService
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
}
