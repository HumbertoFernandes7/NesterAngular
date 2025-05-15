import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-esqueci-minha-senha',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrl: './esqueci-minha-senha.component.css',
})
export class EsqueciMinhaSenhaComponent implements OnInit {
  resetSenhaForm!: FormGroup;
  loading = false;

  constructor(
      private formbuilder: FormBuilder,
      private toast: ToastrService,
      private usuarioService: UsuarioService,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.resetSenhaForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  enviarEmail() {
    if(this.resetSenhaForm.valid){
      this.loading = true;
      this.usuarioService.enviarEmailResetSenha(this.resetSenhaForm.value).subscribe({
        next: (retorno) => {
          this.loading = false;
          this.toast.success('Email enviado com sucesso');
          this.router.navigate(['/login']);
        },
        error: (error) => {this.loading = false;
          this.loading = false;
          this.toast.error(error.error.message)
        },
      });
    }
  }
}
