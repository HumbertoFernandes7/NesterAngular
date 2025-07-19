import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.css',
})
export class UsuarioCadastroComponent implements OnInit {
  cadastroUsuarioForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cadastroUsuarioForm = this.formbuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  cadastrarUsuario() {
    if (this.cadastroUsuarioForm.valid) {
      var usuario = this.cadastroUsuarioForm.getRawValue() as Usuario;
      if (this.verificarSenhaValida(usuario)) {
        this.usuarioService.cadastrarUsuario(usuario).subscribe({
          next: () => {
            this.toastService.success('Usuário cadastrado com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (erro) => {
            this.toastService.error(erro.error.message);
          },
        });
      } else {
        this.toastService.error('A senha deve ter pelo menos 8 caracteres.');
      }
    }
  }

  private verificarSenhaValida(usuario: Usuario) {
    if (
      usuario.senha == null ||
      usuario.senha == undefined ||
      usuario.senha.length < 8
    ) {
      return false;
    } else {
      return true;
    }
  }
}
