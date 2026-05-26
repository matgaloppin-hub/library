import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reservation-container">
      <div class="reservation-card" *ngIf="book; else notFound">

        <h2>Réserver un livre</h2>
        <p class="subtitle">Complète les dates pour réserver cet ouvrage</p>

        <div class="book-details">
          <div class="book-header">
            <h3>{{ book.titre }}</h3>
            <span
              class="availability-badge"
              [class.available]="book.disponible"
              [class.unavailable]="!book.disponible"
            >
              {{ book.disponible ? 'Disponible' : 'Indisponible' }}
            </span>
          </div>

          <p class="author">✍️ {{ book.auteur }}</p>
          <p class="meta">{{ book.edition }} • {{ book.anneeParution }} • {{ book.genre }}</p>

          <div class="rating-line">
            <span class="stars">{{ getStars(book.id || 0) }}</span>
            <span class="rating-text">{{ getRatingLabel(book.id || 0) }}</span>
          </div>

          <div class="description-box">
            <p class="desc-title">Ce qu’il y a dedans</p>
            <p>{{ getDescription(book.id || 0) }}</p>
          </div>
        </div>

        <form (ngSubmit)="submitReservation()">
          <div class="form-group">
            <label>Date de début</label>
            <input
              type="date"
              [(ngModel)]="startDate"
              name="startDate"
              (change)="onStartDateChange()"
              [min]="today"
              required
            />
          </div>

          <div class="form-group">
            <label>Date de fin</label>
            <input
              type="date"
              [(ngModel)]="endDate"
              name="endDate"
              [min]="startDate || today"
              [max]="maxEndDate"
              (change)="validateReservation()"
              required
            />
          </div>

          <div class="info-line">
            Réservation maximale : 3 semaines
          </div>

          @if (reservationDays > 0 && !errorMessage) {
            <div class="summary-box">
              <p>📚 Réservation de <strong>{{ reservationDays }}</strong> jour(s)</p>
            </div>
          }

          @if (errorMessage) {
            <div class="error-message">
              {{ errorMessage }}
            </div>
          }

          <button type="submit" [disabled]="!isFormValid || !book.disponible">
            Confirmer la réservation
          </button>
        </form>

      </div>

      <ng-template #notFound>
        <div class="reservation-card">
          <h2>Livre introuvable</h2>
          <p class="subtitle">Le livre demandé n’existe pas ou n’est plus disponible dans la liste.</p>
          <button type="button" (click)="goHome()">Retour à l’accueil</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .reservation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #faf9f6;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .reservation-card {
      background-color: #ffffff;
      padding: 40px;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(46, 111, 64, 0.1);
      width: 100%;
      max-width: 560px;
      border-top: 8px solid #2E6F40;
    }

    h2 {
      color: #2E6F40;
      text-align: center;
      margin: 0 0 8px 0;
      font-size: 2rem;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 28px;
      font-size: 0.95rem;
    }

    .book-details {
      background: rgba(46, 111, 64, 0.04);
      border: 1px solid rgba(46, 111, 64, 0.12);
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 24px;
    }

    .book-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 10px;
    }

    .book-header h3 {
      margin: 0;
      color: #2E6F40;
      font-size: 1.25rem;
      line-height: 1.3;
    }

    .author {
      margin: 0 0 6px 0;
      color: #666;
      font-weight: 500;
    }

    .meta {
      margin: 0 0 12px 0;
      color: #888;
      font-size: 0.92rem;
    }

    .rating-line {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .stars {
      color: #D5C58A;
      font-size: 1.05rem;
      letter-spacing: 2px;
    }

    .rating-text {
      color: #2E6F40;
      font-weight: 600;
      font-size: 0.92rem;
    }

    .description-box {
      background: #fff;
      border-radius: 12px;
      border: 1px solid #eee;
      padding: 14px;
    }

    .desc-title {
      margin: 0 0 8px 0;
      color: #2E6F40;
      font-weight: 700;
    }

    .description-box p:last-child {
      margin: 0;
      color: #555;
      line-height: 1.5;
    }

    .availability-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: 700;
      border: 1px solid;
      white-space: nowrap;
    }

    .availability-badge.available {
      color: #2E6F40;
      background: rgba(46, 111, 64, 0.08);
      border-color: #2E6F40;
    }

    .availability-badge.unavailable {
      color: #d93025;
      background: rgba(217, 48, 37, 0.08);
      border-color: #d93025;
    }

    .form-group {
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
    }

    label {
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 10px;
      color: #333;
    }

    input {
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background-color: #fbfbfb;
      color: #333;
    }

    input:focus {
      outline: none;
      border-color: #2E6F40;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(213, 197, 138, 0.4);
    }

    .info-line {
      color: #2E6F40;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 18px;
    }

    .summary-box {
      background: rgba(46, 111, 64, 0.05);
      border: 1px solid rgba(46, 111, 64, 0.15);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 18px;
      color: #2E6F40;
    }

    .summary-box p {
      margin: 0;
    }

    .error-message {
      background: rgba(217, 48, 37, 0.08);
      border: 1px solid rgba(217, 48, 37, 0.2);
      color: #d93025;
      padding: 14px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 18px;
    }

    button {
      width: 100%;
      padding: 15px;
      background-color: #2E6F40;
      color: #D5C58A;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.1s ease;
    }

    button:hover:not(:disabled) {
      background-color: #1f4d2c;
    }

    button:active:not(:disabled) {
      transform: translateY(2px);
    }

    button:disabled {
      background-color: #a3c2ac;
      color: #f0f0f0;
      cursor: not-allowed;
    }

    @media (max-width: 600px) {
      .reservation-card {
        padding: 28px 20px;
      }

      h2 {
        font-size: 1.6rem;
      }

      .book-header {
        flex-direction: column;
      }
    }
  `]
})
export class ReservationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  book?: Book;

  startDate: string = '';
  endDate: string = '';
  today: string = new Date().toISOString().split('T')[0];

  reservationDays: number = 0;
  errorMessage: string = '';
  isFormValid: boolean = false;
  maxEndDate: string = '';

  private bookDetails: Record<number, { description: string; rating: number; label: string }> = {
    1: {
      description: "Un récit d’initiation puissant, avec une écriture sensible, des secrets de famille, et une ambiance élégante autour du courage et de la mémoire.",
      rating: 5,
      label: "Chef-d’œuvre émouvant"
    },
    2: {
      description: "Une histoire plus sombre, pleine de tension, de choix difficiles et de vérités qui remontent lentement à la surface.",
      rating: 4,
      label: "Très prenant"
    },
    3: {
      description: "Un roman vivant et étrange, avec une touche d’humour, d’absurde et un regard très fin sur les émotions.",
      rating: 5,
      label: "Original et brillant"
    },
    4: {
      description: "Une histoire délicate sur la résilience, le deuil et la reconstruction, avec beaucoup de douceur et d’humanité.",
      rating: 5,
      label: "Très touchant"
    },
    5: {
      description: "Un roman plein de nostalgie, de chaleur humaine et de petits instants qui laissent une vraie trace.",
      rating: 4,
      label: "Émouvant et doux"
    },
    6: {
      description: "Un texte marquant, profond et lumineux, qui parle de mémoire, de courage et d’espoir après les épreuves.",
      rating: 5,
      label: "Grand roman"
    },
    7: {
      description: "Une exploration sensible de l’art, de l’adolescence et du regard qu’on porte sur le monde quand tout change.",
      rating: 4,
      label: "Littéraire et fin"
    },
    8: {
      description: "Un roman intime et contemporain sur les liens familiaux, les non-dits et les émotions qu’on cache longtemps.",
      rating: 4,
      label: "Intense et humain"
    },
    9: {
      description: "Une œuvre plus nerveuse, avec des personnages complexes, des tensions intérieures et une atmosphère dense.",
      rating: 4,
      label: "Fort et sensible"
    },
    10: {
      description: "Un récit lumineux, très visuel, avec une ambiance estivale, des souvenirs et une sensation de liberté.",
      rating: 4,
      label: "Agréable à lire"
    },
    11: {
      description: "Une aventure jeunesse tendre et malicieuse, avec des personnages attachants et une vraie énergie de lecture.",
      rating: 5,
      label: "Parfait pour les jeunes lecteurs"
    },
    12: {
      description: "Une histoire dynamique, joyeuse et accessible, qui donne envie de lire jusqu’à la dernière page.",
      rating: 4,
      label: "Léger et amusant"
    },
    13: {
      description: "Un album plein d’humour, de rythme et de situations drôles, idéal pour lire en famille.",
      rating: 5,
      label: "Très amusant"
    }
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getBookById(id);

    if (!this.book) {
      this.errorMessage = "Livre introuvable.";
      return;
    }

    this.validateReservation();
  }

  getStars(id: number): string {
    const rating = this.bookDetails[id]?.rating ?? 4;
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  getRatingLabel(id: number): string {
    return this.bookDetails[id]?.label ?? 'Bon choix de lecture';
  }

  getDescription(id: number): string {
    return this.bookDetails[id]?.description ?? 'Description non disponible pour ce livre.';
  }

  onStartDateChange(): void {
    if (this.startDate) {
      const start = new Date(this.startDate);
      const max = new Date(start);
      max.setDate(max.getDate() + 21);
      this.maxEndDate = max.toISOString().split('T')[0];
    } else {
      this.maxEndDate = '';
    }

    if (this.endDate && this.endDate < this.startDate) {
      this.endDate = '';
    }

    this.validateReservation();
  }

  validateReservation(): void {
    this.errorMessage = '';
    this.isFormValid = false;
    this.reservationDays = 0;

    if (!this.book) {
      return;
    }

    if (!this.startDate || !this.endDate) {
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    this.reservationDays = diffDays;

    if (diffDays <= 0) {
      this.errorMessage = 'La date de fin doit être après la date de début.';
      return;
    }

    if (diffDays > 21) {
      this.errorMessage = 'Une réservation ne peut pas dépasser 3 semaines.';
      return;
    }

    this.isFormValid = true;
  }

  submitReservation(): void {
    if (!this.book || !this.isFormValid) {
      return;
    }

    const success = this.bookService.reserveBook(this.book.id!);

    if (!success) {
      this.errorMessage = 'Ce livre est déjà indisponible.';
      return;
    }

    this.router.navigate(['/home']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}