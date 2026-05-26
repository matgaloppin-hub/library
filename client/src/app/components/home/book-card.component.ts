import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  template: `
    <div 
      class="card"
      [class.unavailable-card]="!book.disponible"
      (click)="onCardClick()"
    >
      <div class="card-content">

        <h4 class="title">{{ book.titre }}</h4>

        <p class="author">
          ✍️ {{ book.auteur }}
        </p>

        <div class="badges-container">

          <span class="badge">
            {{ book.genre || 'Livre' }}
          </span>

          <span
            class="availability-badge"
            [class.available]="book.disponible"
            [class.unavailable]="!book.disponible"
          >
            {{ book.disponible ? 'Disponible' : 'Indisponible' }}
          </span>

        </div>

      </div>

      <div class="card-footer">
        <span
          class="click-text"
          [class.unavailable-text]="!book.disponible"
        >
          {{
            book.disponible
              ? 'Réserver ce livre ➔'
              : 'Livre indisponible'
          }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-top: 6px solid #2E6F40;
      border-radius: 16px;
      padding: 24px;
      color: #333;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      box-shadow: 0 10px 25px rgba(46, 111, 64, 0.08);
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
      overflow: hidden;
      font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(46, 111, 64, 0.15);
      border-color: #D5C58A;
    }

    /* Carte légèrement grisée si indisponible */
    .unavailable-card {
      opacity: 0.92;
    }

    .title {
      margin: 0 0 12px 0;
      font-size: 1.25em;
      color: #2E6F40;
      font-weight: 700;
      line-height: 1.3;
      word-wrap: break-word;
    }

    .author {
      color: #666;
      font-size: 0.95em;
      margin: 0 0 18px 0;
      font-weight: 500;
    }

    .badges-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .badge {
      display: inline-block;
      background: rgba(213, 197, 138, 0.2);
      color: #2E6F40;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: 600;
    }

    .availability-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: 700;
      border: 1px solid;
    }

    /* DISPONIBLE */
    .availability-badge.available {
      color: #2E6F40;
      background: rgba(46, 111, 64, 0.08);
      border-color: #2E6F40;
    }

    /* INDISPONIBLE */
    .availability-badge.unavailable {
      color: #d93025;
      background: rgba(217, 48, 37, 0.08);
      border-color: #d93025;
    }

    .card-footer {
      margin-top: 22px;
      border-top: 1px solid #eee;
      padding-top: 15px;
      display: flex;
      justify-content: flex-end;
    }

    .click-text {
      font-size: 0.85em;
      color: #2E6F40;
      font-weight: bold;
      transition: color 0.2s;
    }

    .card:hover .click-text {
      color: #D5C58A;
    }

    /* Texte rouge si indisponible */
    .unavailable-text {
      color: #d93025 !important;
    }
  `]
})
export class BookCardComponent {

  @Input() book!: Book;

  @Output() reserveClick = new EventEmitter<number>();

  onCardClick(): void {

    // On empêche la réservation si indisponible
    if (this.book.id && this.book.disponible) {
      this.reserveClick.emit(this.book.id);
    }
  }
}