import { Routes } from '@angular/router';
import { HomePublicaComponent } from './components/home-publica/home-publica.component';
import { UsuarioCadastroComponent } from './components/usuario-cadastro/usuario-cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'public-home',
    },
    {
        path: 'public-home', component: HomePublicaComponent,
    },
    {
        path: 'cadastro', component: UsuarioCadastroComponent,
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'feed', component: FeedComponent,
    }
];
