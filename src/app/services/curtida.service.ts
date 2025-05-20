import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.desenv';

const URL_API = environment.api_url + "/curtida";

@Injectable({
  providedIn: 'root'
})
export class CurtidaService {

  constructor(private http: HttpClient) { }

  curtirPostagem(idPostagem: number) {
    return this.http.post(`${URL_API}/${idPostagem}`, null);
  }

  removerCurtida(idPostagem: number) {
    return this.http.delete(`${URL_API}/${idPostagem}`);
  }
}
