import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostagemComponent } from "../postagem/postagem.component";
import { NgIf } from '@angular/common';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgIcon, PostagemComponent, NgIf],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  viewProviders: [provideIcons({heroUsers})]
})
export class FeedComponent {

    constructor( 
       public feedService: FeedService
     ){}
   
     abrirModalPublicacao(){
       this.feedService.abrirModal();
     }

}