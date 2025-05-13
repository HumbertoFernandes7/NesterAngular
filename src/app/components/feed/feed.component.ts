import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemCadastoComponent } from "../postagem/postagem-cadastro.component";
import { NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';
import { LoginService } from '../../services/login.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgIcon, PostagemCadastoComponent, NgIf, RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  viewProviders: [provideIcons({heroUsers})]
})
export class FeedComponent {

    constructor( 
       public feedService: FeedService,
       private loginService: LoginService
     ){}
   
     abrirModalPublicacao(){
       this.feedService.abrirModal();
     }

     deslogar(){
      this.loginService.logout()
     }
}