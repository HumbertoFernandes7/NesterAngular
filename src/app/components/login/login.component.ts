import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (retorno) => {
          this.toast.success('Login realizado com sucesso');
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          this.toast.error(error.error.message)
        },
      });
    } 
  }
}
