import { Component, signal, input, computed } from '@angular/core'; // Ajoute computed
import { CommonModule } from '@angular/common';
import { Reservation } from './reservation/reservation';
import { BookDTO } from '../../model/book.dto';

// On définit le livre par défaut (random) en dehors de la classe
const RANDOM_BOOK: BookDTO = {
  titre: 'Titre du livre',
  auteurs: 'Auteur',
  genre: 'Genre',
  emplacement: 'A0',
  anneeParution: 2000,
  edition: 'Edition',
  disponible: true
};

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, Reservation],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book {
  // 1. L'input devient optionnel (on enlève .required)
  bookInput = input<BookDTO>(undefined, { alias: 'book' }); 
  
  // 2. On crée un signal calculé qui choisit entre l'input ou le random
  displayBook = computed(() => this.bookInput() ?? RANDOM_BOOK);
  
  showReservationForm = signal(false);

  openReservation() { this.showReservationForm.set(true); }
  closeReservation() { this.showReservationForm.set(false); }

  handleReservation(reservationData: any) {
    this.showReservationForm.set(false);
  }
}