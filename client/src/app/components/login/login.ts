import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/userService';
import { RequestLogin } from '../../model/requestLogin';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  protected notifService = inject(NotificationService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const user = new RequestLogin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.userService.login(user).subscribe({
      next: () => {
        this.notifService.show(true, 'Connexion réussie !');
        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: (err) => {
        const message = err.status === 401
          ? 'Email ou mot de passe incorrect.'
          : 'Erreur serveur. Veuillez réessayer.';
        this.notifService.show(false, message);
      }
    });
  }
}