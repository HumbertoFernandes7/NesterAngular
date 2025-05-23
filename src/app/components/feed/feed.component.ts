import { Component, HostListener, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { CommonModule, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
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
  viewProviders: [provideIcons({ heroUsers })],
})
export class FeedComponent implements OnInit {
  postagens: Postagem[] = [];
  feed1 = true;
  feed2 = true;
  mobile = false;

  constructor(
    public feedService: FeedService,
    private loginService: LoginService,
    private toastService: ToastrService,
    private usuarioService: UsuarioService,
    private postagemService: PostagemService
  ) {}

  ngOnInit() {
    this.listarForYou();
    this.checkWidth();
    this.trocarQuantidadeFeeds();
  }

  listarForYou() {
    forkJoin({
      usuarioLogado: this.usuarioService.buscarDadosUsuarioLogado(),
      postagens: this.feedService.listarForYou(),
    }).subscribe({
      next: ({ usuarioLogado, postagens }) => {
        this.postagens = this.postagemService.prepararPostagens(
          postagens,
          usuarioLogado
        );
      },
      error: () => {
        this.toastService.error('Ocorreu um erro inesperado!');
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
    this.feedService.abrirModal();
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
