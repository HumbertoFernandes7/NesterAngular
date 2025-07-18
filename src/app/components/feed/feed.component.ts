import { Component, HostListener, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
// Importe o ícone heroArrowPath
import { heroUsers, heroArrowPath } from '@ng-icons/heroicons/outline'; // Adicione heroArrowPath aqui
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { CommonModule, NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuLateralDireitoComponent } from '../menu-lateral-direito/menu-lateral-direito.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { UsuarioService } from '../../services/usuario.service';
import { forkJoin } from 'rxjs';
import { PostagemService } from '../../services/postagem.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    NgIcon,
    NgIf,
    CommonModule,
    PostagemCadastoComponent,
    MenuLateralComponent,
    MenuLateralDireitoComponent,
    MenuMobileComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  // Adicione heroArrowPath ao provideIcons
  viewProviders: [provideIcons({ heroUsers, heroArrowPath })],
})
export class FeedComponent implements OnInit {
  postagensForYou: Postagem[] = [];
  postagensSeguindo: Postagem[] = [];
  feed1 = true;
  feed2 = true;
  mobile = false;
  loadingFeed = false; // Adicione esta propriedade para controlar o spinner

  constructor(
    private loginService: LoginService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    public postagemService: PostagemService
  ) {}

  ngOnInit() {
    this.listarPublicacoesFeed();
    this.checkWidth();
    this.trocarQuantidadeFeeds();
  }

  listarPublicacoesFeed() {
    this.loadingFeed = true; // Ativa o spinner ao iniciar o carregamento
    forkJoin({
      usuarioLogado: this.usuarioService.buscarDadosUsuarioLogado(),
      postagensForYou: this.postagemService.listarForYou(),
      postagenSeguindo: this.postagemService.listarPostagensSeguindo(),
    }).subscribe({
      next: ({ usuarioLogado, postagensForYou, postagenSeguindo }) => {
        this.postagensForYou = this.postagemService.prepararPostagens(
          postagensForYou,
          usuarioLogado
        );
        this.postagensSeguindo = this.postagemService.prepararPostagens(
          postagenSeguindo,
          usuarioLogado
        );
        this.loadingFeed = false; // Desativa o spinner ao concluir o carregamento com sucesso
      },
      error: () => {
        this.toastService.error('Ocorreu um erro inesperado!');
        this.loadingFeed = false; // Desativa o spinner em caso de erro
      },
    });
  }

  curtirPostagem(postagem: Postagem) {
    this.postagemService.curtirPostagem(postagem);
  }

  removerCurtida(postagem: Postagem) {
    this.postagemService.removerCurtida(postagem);
  }

  abrirModalPublicacao() {
    this.postagemService.abrirModalCadastro();
  }

  deslogar() {
    this.loginService.logout();
  }

  trocarQuantidadeFeeds() {
    this.feed1 = true;
    this.feed2 = !this.mobile;
  }

  trocarAssuntoFeed() {
    if (!this.mobile) return;
    this.feed1 = !this.feed1;
    this.feed2 = !this.feed2;
  }

  private checkWidth() {
    this.mobile = window.innerWidth < 768;
  }

  @HostListener('window:resize')
  private onResize() {
    this.checkWidth();
    this.trocarQuantidadeFeeds();
  }
}