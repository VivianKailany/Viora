import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.scss',
})
export class LoginLayoutComponent {

  @Input({ required: true }) form!: FormGroup;

  @Input() primaryBtnText = 'Entrar';
  @Input() secondaryBtnText = 'Criar conta';
  @Input() disablePrimaryBtn = false;

  @Output() submitClicked = new EventEmitter<void>();
  @Output() navigateClicked = new EventEmitter<void>();

  submit() {
    this.submitClicked.emit();
  }

  navigate() {
    this.navigateClicked.emit();
  }
}
