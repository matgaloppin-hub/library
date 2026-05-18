// components/reservation/reservation.ts
import { Component, inject, output, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookDTO } from '../../../model/book.dto';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css'
})
export class Reservation {
  private fb = inject(FormBuilder);
  
  // Reçoit le DTO complet via signal
  book = input.required<BookDTO>(); 

  reservationComplete = output<any>();
  cancel = output<void>();

  reservationForm: FormGroup = this.fb.group({
    nomEmprunteur: ['', Validators.required],
    dateEmprunt: ['', Validators.required],
    dateRetour: ['', Validators.required]
  });

  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservationComplete.emit({
        ...this.reservationForm.value,
        bookTitre: this.book().titre // On utilise la donnée du signal
      });
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}