import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  private fb = inject(FormBuilder);

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
      const newUser = {
        id: Date.now().toString(),
        prenom: formValues.prenom,
        nom: formValues.nom,
        email: formValues.email,
        password: formValues.password
      };

      console.log('Utilisateur valide !', newUser);
      alert('Inscription réussie !' + JSON.stringify(newUser));
      this.subscribeForm.reset();
    } else {
      this.subscribeForm.markAllAsTouched();
    }
  }
}
