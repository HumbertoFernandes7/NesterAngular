import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { PostagemService } from '../../services/postagem.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [NgIcon, RouterLink],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

     constructor( 
           public postagemService: PostagemService,
     ){}


    abrirModalPublicacao(){
       this.postagemService.abrirModalCadastro();
     }
}
