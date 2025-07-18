import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

const URL_API = environment.api_url + '/follow';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient) {}

  follow(usuario: Usuario) {
    return this.http.post(`${URL_API}/${usuario.id}`, null, {
      responseType: 'text',
    });
  }

  isFollow(usuarioId: number): Observable<boolean>{
    return this.http.get<boolean>(`${URL_API}/is-follow/${usuarioId}`);
  }
}
