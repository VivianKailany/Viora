import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMsg = '';

  form = this.fb.group({
    nameUser: ['', [Validators.required, Validators.minLength(2)]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  submit() {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg = 'Preencha todos os campos corretamente.';
      return;
    }

    const { nameUser, login, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.errorMsg = 'As senhas não conferem';
      return;
    }

    this.loading = true;

    this.auth.register({
      nameUser: nameUser!,
      login: login!,
      password: password!,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => {
        this.errorMsg = err?.error?.message ?? 'Erro ao cadastrar';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
