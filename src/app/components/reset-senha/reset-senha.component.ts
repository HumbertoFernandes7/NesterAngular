import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ResetSenha } from '../../interfaces/resetSenha';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.css',
})
export class ResetSenhaComponent implements OnInit {
  novaSenhaForm!: FormGroup;

  hash: string = '';
  id: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private urlRoute: ActivatedRoute,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hash = this.urlRoute.snapshot.paramMap.get('hash')!;
    this.id = this.urlRoute.snapshot.paramMap.get('id')!;

    this.novaSenhaForm = this.formbuilder.group({
      senha: ['', [Validators.required]],
      repetirSenha: ['', [Validators.required]],
    });
  }

  resetarSenha() {
    if (this.novaSenhaForm.valid) {
      var senhaAlterada = this.novaSenhaForm.getRawValue() as ResetSenha;
      this.usuarioService.resetarSenha(senhaAlterada, this.hash, this.id).subscribe({
          next: () => {
            this.toast.success('Senha alterada com sucesso!')
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.toast.error(error.error.message);
          },
        });
    }
  }
}
