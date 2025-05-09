import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../modulos/usuario';

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
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cadastroUsuarioForm = this.formbuilder.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  cadastrarUsuario() {
    if (this.cadastroUsuarioForm.valid) {
      var usuario = this.cadastroUsuarioForm.getRawValue() as Usuario;
      this.usuarioService.cadastrarUsuario(usuario).subscribe({
        next: () => {
          console.log('Usuário cadastrado com sucesso!');
        },
        error: () => {
          console.error('Erro ao cadastrar usuário');
        },
      });
    }
  }
}
