import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../model/book';
import { BookCardComponent } from './book-card.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  template: `
    <div class="main-layout">

      <header class="top-bar">
        <div class="search-container">
          <div class="input-group">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchChange()"
              placeholder="Rechercher un livre..."
              class="search-input"
            />
            <span class="search-icon">🔍</span>
          </div>

          @if (filteredBooks.length > 0) {
            <ul class="suggestions-list">
              @for (book of filteredBooks; track book.id) {
                <li (click)="selectBook(book)">
                  {{ book.titre }}
                  <span class="suggestion-author">- {{ book.auteur }}</span>
                </li>
              }
            </ul>
          }
        </div>
      </header>

      <main class="content-area">
        <div class="book-grid">
          @for (book of displayedBooks; track book.id) {
            <app-book-card
              [book]="book"
              (reserveClick)="goToReservation($event)">
            </app-book-card>
          }
        </div>

        @if (displayedBooks.length === 0) {
          <div class="placeholder-component empty">
            <h3>Aucun résultat</h3>
            <p>Aucun livre ne correspond à votre recherche.</p>
          </div>
        }
      </main>

      <footer class="bottom-bar">
        <div class="navigation-container">
          <button class="nav-arrow" (click)="navigatePage('prev')" [disabled]="!hasPrevPage()">
            🡨 Précédent
          </button>

          <span class="nav-status">
            Page {{ currentPage + 1 }}
          </span>

          <button class="nav-arrow" (click)="navigatePage('next')" [disabled]="!hasNextPage()">
            Suivant 🡪
          </button>
        </div>
      </footer>

    </div>
  `,
  styles: [`
    .main-layout { 
      padding: 40px 20px; 
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #faf9f6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .search-container {
      position: relative;
      max-width: 600px;
      margin: 0 auto 40px auto;
    }

    .input-group { position: relative; }

    .search-input { 
      width: 100%; 
      padding: 15px 45px 15px 20px; 
      border-radius: 12px; 
      border: 1px solid #ddd; 
      font-size: 1rem; 
      box-sizing: border-box;
      background-color: #fbfbfb;
      transition: all 0.3s ease;
      color: #333;
      box-shadow: 0 4px 12px rgba(46, 111, 64, 0.05);
    }

    .search-input:focus {
      outline: none;
      border-color: #2E6F40;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(213, 197, 138, 0.4);
    }

    .search-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #2E6F40;
      font-size: 1.1rem;
    }

    .suggestions-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 12px;
      list-style: none;
      padding: 0;
      margin-top: 8px;
      max-height: 250px;
      overflow-y: auto;
      z-index: 10;
      box-shadow: 0 10px 25px rgba(46, 111, 64, 0.1);
    }

    .suggestions-list li {
      padding: 14px 18px;
      cursor: pointer;
      border-bottom: 1px solid #f1f1f1;
      color: #333;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .suggestions-list li:last-child {
      border-bottom: none;
    }

    .suggestions-list li:hover {
      background-color: rgba(46, 111, 64, 0.05);
      color: #2E6F40;
    }

    .suggestion-author {
      font-size: 0.85em;
      color: #666;
      font-weight: normal;
    }

    .content-area {
      flex-grow: 1;
    }

    .book-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }

    .placeholder-component.empty {
      text-align: center;
      color: #2E6F40;
      padding: 60px 20px;
    }

    .placeholder-component.empty h3 {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    .placeholder-component.empty p {
      color: #666;
    }

    .bottom-bar {
      margin-top: 50px;
      padding: 20px 0;
      display: flex;
      justify-content: center;
    }

    .navigation-container {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .nav-arrow {
      background-color: #2E6F40;
      color: #D5C58A;
      border: none;
      padding: 14px 24px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.1s ease;
      box-shadow: 0 4px 12px rgba(46, 111, 64, 0.15);
    }

    .nav-arrow:hover:not(:disabled) {
      background-color: #1f4d2c;
    }

    .nav-arrow:active:not(:disabled) {
      transform: translateY(2px);
    }

    .nav-arrow:disabled {
      background-color: #a3c2ac;
      color: #f0f0f0;
      cursor: not-allowed;
      box-shadow: none;
    }

    .nav-status {
      font-weight: 600;
      color: #2E6F40;
      font-size: 1.1rem;
    }

    @media (max-width: 900px) {
      .book-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      .book-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .navigation-container {
        flex-direction: column;
        gap: 15px;
      }

      .nav-arrow {
        width: 100%;
      }
    }
  `]
})
export class Home implements OnInit {
  private router = inject(Router);
  private bookService = inject(BookService);

  mockBooks: Book[] = [];
  searchQuery: string = '';
  filteredBooks: Book[] = [];
  currentList: Book[] = [];
  displayedBooks: Book[] = [];

  currentPage: number = 0;
  itemsPerPage: number = 6;

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.mockBooks = this.bookService.getBooks();
    this.currentList = [...this.mockBooks];
    this.updateDisplay();
  }

  updateDisplay(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    this.displayedBooks = this.currentList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.currentPage = 0;

    if (!query) {
      this.filteredBooks = [];
      this.currentList = [...this.mockBooks];
    } else {
      this.filteredBooks = this.mockBooks.filter(book =>
        book.titre.toLowerCase().includes(query)
      );
      this.currentList = [...this.filteredBooks];
    }

    this.updateDisplay();
  }

  selectBook(book: Book): void {
    this.searchQuery = book.titre;
    this.filteredBooks = [];
    this.currentList = [book];
    this.currentPage = 0;
    this.updateDisplay();
  }

  navigatePage(direction: 'next' | 'prev'): void {
    if (direction === 'next' && this.hasNextPage()) {
      this.currentPage++;
    } else if (direction === 'prev' && this.hasPrevPage()) {
      this.currentPage--;
    }
    this.updateDisplay();
  }

  hasPrevPage(): boolean {
    return this.currentPage > 0;
  }

  hasNextPage(): boolean {
    return (this.currentPage + 1) * this.itemsPerPage < this.currentList.length;
  }

  goToReservation(bookId: number): void {
    this.router.navigate(['/reservation', bookId]);
  }
}