import { Routes } from '@angular/router';
import { HomePublicaComponent } from './components/home-publica/home-publica.component';
import { UsuarioCadastroComponent } from './components/usuario-cadastro/usuario-cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { EsqueciMinhaSenhaComponent } from './components/esqueci-minha-senha/esqueci-minha-senha.component';
import { ResetSenhaComponent } from './components/reset-senha/reset-senha.component';
import { MeuPerfilComponent } from './components/meu-perfil/meu-perfil.component';

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
        path: 'esqueci-minha-senha', component: EsqueciMinhaSenhaComponent,
    },
    {
        path: 'recuperar-senha/:hash/:id', component: ResetSenhaComponent,
    },
    {
        path: 'login', component: LoginComponent, canActivate: [guestGuard],
    },
    {
        path: 'feed', component: FeedComponent, canActivate: [authGuard],
    }, 
    {
        path: 'meu-perfil', component: MeuPerfilComponent, canActivate: [authGuard],
    },    
]
