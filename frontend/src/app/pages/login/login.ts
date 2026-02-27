import {Component, inject} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import {LoginLayoutComponent} from '../../components/login-layout/login-layout';
import {AuthService} from '../../core/auth/auth-service';

type LoginForm = {
  login: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoginLayoutComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private router = inject(Router);
  loginForm = new FormGroup<LoginForm>({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  constructor(
    private authService: AuthService,
  ) {}

  loading = false;

  submit() {
    const { login, password } = this.loginForm.getRawValue();

    if (!login || !password) {
      alert("Preencha login e senha.");
      return;
    }

    this.loading = true;

    this.authService.login({ login, password }).subscribe({
      next: () => alert('Login feito com sucesso!'),
      error: () => alert('Erro no login! Verifique seus dados.'),
      complete: () => (this.loading = false),
    });
  }

  navigate() {
    this.router.navigate(['/register']);
  }
}
