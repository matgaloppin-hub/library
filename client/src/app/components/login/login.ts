import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../model/users';
import { UserService } from '../../services/userService';
import { RequestLogin } from '../../model/requestLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html', // Vérifie bien que le nom est exact
  styleUrls: ['./login.css']    // Vérifie bien que le nom est exact
})
export class Login implements OnInit {
  private fb = inject(FormBuilder); // Utilisation de inject() pour éviter le undefined
  loginForm!: FormGroup;
  userService:UserService = inject(UserService)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      const user = new RequestLogin(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      
      const token = this.userService.login(user);
    }
  }
}