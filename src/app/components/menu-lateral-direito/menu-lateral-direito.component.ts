import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral-direito',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, FormsModule],
  templateUrl: './menu-lateral-direito.component.html',
  styleUrl: './menu-lateral-direito.component.css',
})
export class MenuLateralDireitoComponent implements OnInit {
  searchInput = '';
  usuarios: Usuario[] = [];
  usuariosRecomendados: Usuario[] = [];
  private fotoCache: { [userId: number]: string } = {}; // Cache em memória das fotos

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buscarUsuariosRecomendados();
  }

  buscarUsuarioPor() {
    if (this.searchInput.length >= 3) {
      this.usuarioService.buscarUsuariosPor(this.searchInput).subscribe({
        next: (retorno) => {
          this.usuarios = retorno as Usuario[];
          this.carregarFotosUsuarios(this.usuarios);
        },
        error: (erro) => {
          const mensagem =
            erro.error?.mesage || erro.message || 'Erro ao buscar usuários';
          this.toast.error(mensagem);
        },
      });
    } else {
      this.usuarios = [];
    }
  }

  buscarUsuariosRecomendados() {
    this.usuarioService.buscarUsuariosRecomendados().subscribe({
      next: (retorno) => {
        this.usuariosRecomendados = retorno as Usuario[];
        this.carregarFotosUsuarios(this.usuariosRecomendados);
      },
      error: (erro) => {
        const mensagem =
          erro.error?.mesage || erro.message || 'Erro ao buscar usuários';
        this.toast.error(mensagem);
      },
    });
  }

  carregarFotosUsuarios(usuarios: Usuario[]) {
    usuarios.forEach((usuario) => {
      if (this.fotoCache[usuario.id]) {
        usuario.foto = this.fotoCache[usuario.id];
      } else {
        this.usuarioService.buscarFotoUsuarioPeloId(usuario.id).subscribe({
          next: (blob) => {
            const fotoUrl = URL.createObjectURL(blob);
            this.fotoCache[usuario.id] = fotoUrl; // Armazena no cache
            usuario.foto = fotoUrl;
          },
          error: (erro) => {
            const msg =
              erro.error?.message ||
              erro.message ||
              'Erro ao buscar foto do usuário';
            this.toast.error(msg);
          },
        });
      }
    });
  }

  selecionarUsuario(usuario: Usuario) {
    this.usuarios = [];
    this.router.navigate(['/perfil/', usuario.id]);
  }

  seguirUsuario(nome: string) {
    console.log("seguindo: "+ nome);
  }

  deslogar() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
