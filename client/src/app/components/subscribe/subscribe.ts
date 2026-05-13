import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/userService';
import { User } from '../../model/users';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css'
})
export class Subscribe {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  protected notifService = inject(NotificationService);

  showPassword = false;

  subscribeForm: FormGroup = this.fb.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]]
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.subscribeForm.valid) {
      this.subscribeForm.markAllAsTouched();
      return;
    }

    const { prenom, nom, email, password } = this.subscribeForm.value;
    const newUser = new User(prenom, nom, email, password);

    this.userService.createUser(newUser).subscribe({
      next: () => {
        this.notifService.show(true, 'Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const message = err.status === 409
          ? 'Cet email est déjà utilisé.'
          : 'Erreur serveur. Veuillez réessayer.';
        this.notifService.show(false, message);
      }
    });
  }
}