import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [NgIcon, RouterLink],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

     constructor( 
           public feedService: FeedService,
     ){}


    abrirModalPublicacao(){
       this.feedService.abrirModal();
     }


}
