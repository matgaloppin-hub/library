import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    new Book('Veiller sur elle', 'Jean-Baptiste Andrea', 'L\'ICONOCLASTE', '2023', 'Littérature', 1, true),
    new Book('Des diables et des saints', 'Jean-Baptiste Andrea', 'Collection proche', '2022', 'Littérature', 2, false),
    new Book('Psychopompe', 'Amélie Nothomb', 'Albin Michel', '2023', 'Littérature', 3, true),
    new Book('Changer l\'eau des fleurs', 'Valérie Perrin', 'Albin Michel', '2018', 'Littérature', 4, true),
    new Book('Les oubliés du dimanche', 'Valérie Perrin', 'Le livre de poche', '2017', 'Littérature', 5, false),
    new Book('Au revoir là-haut', 'Pierre Lemaître', 'Le livre de poche', '2015', 'Littérature', 6, true),
    new Book('Les yeux de Mona', 'Thomas Schlesser', 'Albin Michel', '2024', 'Littérature', 7, true),
    new Book('Ce qu\'il reste à faire', 'Marie de Chassey', 'Alma Editeur', '2023', 'Littérature', 8, false),
    new Book('Les tourmentés', 'Lucas Belvaux', 'Alma Editeur', '2022', 'Littérature', 9, true),
    new Book('Sur la plage', 'Juliette Willerval', 'Alma Editeur', '2024', 'Littérature', 10, true),
    new Book('Oskar et le comte', 'Jean-Baptiste Drouot', 'Les fourmis rouges', '2024', 'Jeunesse', 11, true),
    new Book('Rendez-vous à la piscine', 'Jean-Baptiste Drouot', 'Helium', '2023', 'Jeunesse', 12, false),
    new Book('J\'ai oublié mon exposé parce que …', 'D Cali, B Chaud', 'Helium', '2024', 'Jeunesse', 13, true)
  ];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  reserveBook(id: number): boolean {
    const book = this.getBookById(id);

    if (!book || !book.disponible) {
      return false;
    }

    book.disponible = false;
    return true;
  }
}