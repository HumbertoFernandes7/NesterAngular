import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-lateral-direito',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, FormsModule],
  templateUrl: './menu-lateral-direito.component.html',
  styleUrl: './menu-lateral-direito.component.css',
})
export class MenuLateralDireitoComponent {
  searchInput = '';
  usuarios: Usuario[] = [];

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private toast: ToastrService
  ) {}

  buscarUsuarioPor() {
    if (this.searchInput.length >= 3) {
      this.usuarioService.buscarUsuariosPor(this.searchInput).subscribe({
        next: (retorno) => {
          this.usuarios = retorno as Usuario[];
          console.log('Usuários encontrados:', this.usuarios);
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

  onSelect(usuario: Usuario) {
    console.log('Selecionou:', usuario);
  }

  deslogar() {
    this.loginService.logout();
  }
}
