import { Routes } from '@angular/router';
import { HomePublicaComponent } from './components/home-publica/home-publica.component';
import { UsuarioCadastroComponent } from './components/usuario-cadastro/usuario-cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'home',
    },
    {
        path: 'home', component: HomePublicaComponent,
    },
    {
        path: 'cadastro', component: UsuarioCadastroComponent,
    },
    {
        path: 'login', component: LoginComponent, canActivate: [guestGuard],
    },
    {
        path: 'feed', component: FeedComponent, canActivate: [authGuard],
    }
];
