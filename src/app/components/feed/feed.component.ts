import { Component, HostListener, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemCadastoComponent } from "../postagem-cadastro/postagem-cadastro.component";
import { DatePipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { MenuLateralDireitoComponent } from "../menu-lateral-direito/menu-lateral-direito.component";
import { MenuMobileComponent } from "../menu-mobile/menu-mobile.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgIcon, PostagemCadastoComponent, NgIf, NgFor, MenuLateralComponent, MenuLateralDireitoComponent, MenuMobileComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  viewProviders: [provideIcons({ heroUsers })]
})
export class FeedComponent implements OnInit {

  postagens: Postagem[] = [];
  feed2 = true;
  feed1 = true;
  mobile = false;

  constructor(
    public feedService: FeedService,
    private loginService: LoginService,
    private datePipe: DatePipe,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.listarForYou();
    this.checkWidth()
    this.trocarQuantidadeFeeds()
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth()
    this.trocarQuantidadeFeeds()
    console.log("test");

  }

  listarForYou() {
    this.feedService.listarForYou().subscribe({
      next: (retorno) => {
        this.postagens = (retorno as Postagem[]).map((postagem) => {
          postagem.dataPostagem = this.formatarData(postagem.dataPostagem) as any;
          return postagem;
        });
      },
      error: (erro) => {
        this.toastService.error(erro.error.mensagem);
      }
    })
  }

  abrirModalPublicacao() {
    this.feedService.abrirModal();
  }

  deslogar() {
    this.loginService.logout()
  }

  formatarData(data: Date) {
    return this.datePipe.transform(data, 'dd/MM/yyyy');
  }

  private checkWidth() {
    this.mobile = window.innerWidth < 768;
  }


  private trocarQuantidadeFeeds() {
    if (this.mobile) {
      this.feed2 = false;
    } else {
      this.feed1 = true
      this.feed2 = true
    }
  }

  trocarAssuntoFeed() {
    if (this.feed1) {
      this.feed2 = true
      this.feed1 = false
    } else {
      this.feed2 = false
      this.feed1 = true
    }
  }
}