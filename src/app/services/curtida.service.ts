import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL_API = environment.api_url + '/curtida';

@Injectable({
  providedIn: 'root',
})
export class CurtidaService {
  constructor(private http: HttpClient) {}

  toggleCurtida(idPostagem: number) {
    return this.http.post(`${URL_API}/${idPostagem}/toggle`, null);
  }
}
