import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemCadastoComponent } from "../postagem-cadastro/postagem-cadastro.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { LoginService } from '../../services/login.service';
import { RouterLink} from '@angular/router';
import { Postagem } from '../../interfaces/postagem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgIcon, PostagemCadastoComponent, NgIf, RouterLink, NgFor],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  viewProviders: [provideIcons({heroUsers})]
})
export class FeedComponent implements OnInit {

  postagens: Postagem [] = [];

    constructor( 
       public feedService: FeedService,
       private loginService: LoginService,
       private datePipe: DatePipe,
       private toastService: ToastrService,
     ){}

      ngOnInit(){
        this.listarForYou();
      }

      listarForYou(){
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

     abrirModalPublicacao(){
       this.feedService.abrirModal();
     }

     deslogar(){
      this.loginService.logout()
     }

      formatarData(data: Date) {
        return this.datePipe.transform(data, 'dd/MM/yyyy');
      } 
}