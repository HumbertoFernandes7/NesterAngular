import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  public publicacaoModal = false;

  abrirModal() {
    this.publicacaoModal = true;
  }

  fecharModal() {
    this.publicacaoModal = false;
  }
}
