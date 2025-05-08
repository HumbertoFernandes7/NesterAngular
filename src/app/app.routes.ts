import { Routes } from '@angular/router';
import { HomePublicaComponent } from './components/home-publica/home-publica.component';
import { UsuarioCadastroComponent } from './components/usuario-cadastro/usuario-cadastro.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'public-home',
    },
    {
        path: 'public-home', component: HomePublicaComponent,
    },
    {
        path: 'cadastro', component: UsuarioCadastroComponent,
    }
];
