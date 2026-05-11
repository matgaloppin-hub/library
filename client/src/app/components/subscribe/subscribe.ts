import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/userService';
import { User } from '../../model/users';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  private fb = inject(FormBuilder);
  private userService: UserService = inject(UserService);
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      const formValues = this.subscribeForm.value;
      
      // Création de l'objet utilisateur direct
      const newUser = new User(
        formValues.prenom,
        formValues.nom,
        formValues.email,
        formValues.password
      );

      this.userService.createUser(newUser)

      console.log('Utilisateur valide !', newUser);
      alert('Inscription réussie !' + JSON.stringify(newUser));
      this.subscribeForm.reset();
    } else {
      this.subscribeForm.markAllAsTouched();
    }
  }
}