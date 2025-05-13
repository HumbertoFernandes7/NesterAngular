import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { FeedService } from '../../services/feed.service';
import { NgIcon } from '@ng-icons/core';


@Component({
  selector: 'app-postagem',
  standalone: true,
  imports:[NgIcon],
  templateUrl: './postagem.component.html',
  styleUrl: './postagem.component.css'
})
export class PostagemComponent {

  constructor( 
    private feedService: FeedService
  ){}

  fecharModalPublicacao(){
    this.feedService.fecharModal();
  }

}
