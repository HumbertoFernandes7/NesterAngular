import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.desenv';
import { HttpClient } from '@angular/common/http';
import { Postagem } from '../interfaces/postagem';


const URL_API = environment.api_url + "/postagem";


@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  cadastrarPostagem(postagem : Postagem){
     return this.http.post<Postagem>(`${URL_API}/cadastrar`, postagem)
}
}
