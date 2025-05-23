import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { MenuLateralDireitoComponent } from '../menu-lateral-direito/menu-lateral-direito.component';
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { CommonModule, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { NgIcon } from '@ng-icons/core';
import { Postagem } from '../../interfaces/postagem';
import { CurtidaService } from '../../services/curtida.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

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
  usuarioLogado: any;

  constructor(
    public feedService: FeedService,
    private curtidaService: CurtidaService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listarPostagensUsuarioLogado();
    this.buscarDadosUsuarioLogado();
    this.carregaFotoUsuario();
  }

  listarPostagensUsuarioLogado() {
    this.feedService.listarPostagensUsuarioLogado().subscribe({
      next: (postagens) => {
        this.postagens = postagens;
      },
      error: (erro) => {
        this.toastService.error('Erro inesperado ao listar postagens ' + erro);
      },
    });
  }

  buscarDadosUsuarioLogado() {
    this.usuarioService.buscarDadosUsuarioLogado().subscribe({
      next: (usuario) => {
        this.usuarioLogado = usuario;
      },
      error: (erro) => {
        this.toastService.error(
          'Erro inesperado ao buscar usuário logado ' + erro
        );
      },
    });
  }

  carregaFotoUsuario() {
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

  /**
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
    */
}
