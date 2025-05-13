import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.desenv';
import { HttpClient } from '@angular/common/http';

const URL_API = environment.api_url + "/postagem";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  public publicacaoModal = false;


  listarForYou() {
    return this.http.get(`${URL_API}/foryou`)
  }


  abrirModal() {
    this.publicacaoModal = true;
  }

  fecharModal() {
    this.publicacaoModal = false;
  }
}
