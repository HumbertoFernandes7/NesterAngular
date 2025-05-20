import { Component, HostListener, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemCadastoComponent } from '../postagem-cadastro/postagem-cadastro.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { LoginService } from '../../services/login.service';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MenuLateralDireitoComponent } from '../menu-lateral-direito/menu-lateral-direito.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { CurtidaService } from '../../services/curtida.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    NgIcon,
    PostagemCadastoComponent,
    NgIf,
    NgFor,
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
    private datePipe: DatePipe,
    private toastService: ToastrService,
    private curtidaService: CurtidaService
  ) {}

  ngOnInit() {
    this.listarForYou();
    this.checkWidth();
    this.trocarQuantidadeFeeds();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
    this.trocarQuantidadeFeeds();
  }

  listarForYou() {
    this.feedService.listarForYou().subscribe({
      next: (posts) => {
        this.postagens = posts as Postagem[];
        this.postagens.forEach((p) => {
          p.dataPostagem = this.formatarData(p.dataPostagem) as any;
          this.curtidaService.quantidadeCurtidas(p.id).subscribe({
            next: (c) => (p.quantidadeCurtidas = c),
            error: (err) => this.toastService.error(err.error.mensagem),
          });
        });
      },
      error: (erro) => {
        this.toastService.error(erro.error.mensagem);
      },
    });
  }

  curtirPostagem(postagem: Postagem) {
    this.curtidaService.curtirPostagem(postagem.id).subscribe({
      next: () => {
        postagem.quantidadeCurtidas++;
      },
      error: () => {
        this.removerCurtida(postagem);
      },
    });
  }

  removerCurtida(postagem: Postagem) {
    this.curtidaService.removerCurtida(postagem.id).subscribe({
      next: () => {
        postagem.quantidadeCurtidas--;
      },
      error: (erro) => {
        this.toastService.error("Erro inesperado ao remover a curtida");
      },
    });
  }

  quantidadeCurtidas(postagem: Postagem) {
    this.curtidaService.quantidadeCurtidas(postagem.id).subscribe({
      next: (retorno) => {
        return (postagem.quantidadeCurtidas = retorno as number);
      },
      error: (erro) => {
        this.toastService.error(erro.error.mensagem);
      },
    });
  }

  abrirModalPublicacao() {
    this.feedService.abrirModal();
  }

  deslogar() {
    this.loginService.logout();
  }

  formatarData(data: Date | string) {
    return this.datePipe.transform(data, 'dd/MM/yyyy');
  }

  private checkWidth() {
    this.mobile = window.innerWidth < 768;
  }

  trocarQuantidadeFeeds() {
    if (this.mobile && this.mobile == true) {
      this.feed2 = false;
    } else {
      this.feed1 = true;
      this.feed2 = true;
    }
  }

  trocarAssuntoFeed() {
    if (!this.mobile) {
      return;
    } else if (this.feed1) {
      this.feed2 = true;
      this.feed1 = false;
    } else if (this.feed2) {
      this.feed1 = true;
      this.feed2 = false;
    }
  }
}
