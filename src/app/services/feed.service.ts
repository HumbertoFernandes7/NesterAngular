import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.desenv';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postagem } from '../interfaces/postagem';

const URL_API = environment.api_url + '/postagem';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  public publicacaoModal = false;

  constructor(private http: HttpClient) {}

  listarForYou(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${URL_API}/foryou`);
  }

  listarPostagensUsuarioLogado(){
    return this.http.get<Postagem[]>(`${URL_API}/usuario`);
  }

  abrirModal() {
    this.publicacaoModal = true;
  }

  fecharModal() {
    this.publicacaoModal = false;
  }
}
