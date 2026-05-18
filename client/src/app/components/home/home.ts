import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';
import { NotificationService } from '../../services/notification.service';
import { Book } from '../../model/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private userService = inject(UserService);
  private notifService = inject(NotificationService);

  // Liste complète de tous les livres sous forme d'objets Book
  mockBooks: Book[] = [];

  // Tableau contenant uniquement les titres pour la barre de recherche
  allBooks: string[] = [];

  // Chaîne de caractères saisie par l'utilisateur
  searchQuery: string = '';

  // Liste des suggestions filtrées à afficher sous l'input
  filteredBooks: string[] = [];

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    // Liste de 150 vrais livres écrits "en dur"
    this.mockBooks = [
      new Book('Le Seigneur des Anneaux', 'J.R.R. Tolkien', 'Bourgois', '1954', 'Fantasy', 1),
      new Book('Le Hobbit', 'J.R.R. Tolkien', 'Bourgois', '1937', 'Fantasy', 2),
      new Book('Harry Potter à l\'école des sorciers', 'J.K. Rowling', 'Gallimard', '1997', 'Fantastique', 3),
      new Book('Harry Potter et la Chambre des secrets', 'J.K. Rowling', 'Gallimard', '1998', 'Fantastique', 4),
      new Book('Harry Potter et le Prisonnier d\'Azkaban', 'J.K. Rowling', 'Gallimard', '1999', 'Fantastique', 5),
      new Book('Harry Potter et la Coupe de feu', 'J.K. Rowling', 'Gallimard', '2000', 'Fantastique', 6),
      new Book('Harry Potter et l\'Ordre du Phénix', 'J.K. Rowling', 'Gallimard', '2003', 'Fantastique', 7),
      new Book('Harry Potter et le Prince de sang-mêlé', 'J.K. Rowling', 'Gallimard', '2005', 'Fantastique', 8),
      new Book('Harry Potter et les Reliques de la Mort', 'J.K. Rowling', 'Gallimard', '2007', 'Fantastique', 9),
      new Book('1984', 'George Orwell', 'Gallimard', '1949', 'Dystopie', 10),
      new Book('La Ferme des animaux', 'George Orwell', 'Gallimard', '1945', 'Satire', 11),
      new Book('Le Petit Prince', 'Antoine de Saint-Exupéry', 'Gallimard', '1943', 'Conte', 12),
      new Book('Fondation', 'Isaac Asimov', 'Denoël', '1951', 'Science-Fiction', 13),
      new Book('Fondation et Empire', 'Isaac Asimov', 'Denoël', '1952', 'Science-Fiction', 14),
      new Book('Seconde Fondation', 'Isaac Asimov', 'Denoël', '1953', 'Science-Fiction', 15),
      new Book('Dune', 'Frank Herbert', 'Robert Laffont', '1965', 'Science-Fiction', 16),
      new Book('Le Messie de Dune', 'Frank Herbert', 'Robert Laffont', '1969', 'Science-Fiction', 17),
      new Book('Les Enfants de Dune', 'Frank Herbert', 'Robert Laffont', '1976', 'Science-Fiction', 18),
      new Book('Le Comte de Monte-Cristo', 'Alexandre Dumas', 'Poche', '1844', 'Aventure', 19),
      new Book('Les Misérables', 'Victor Hugo', 'Poche', '1862', 'Drame', 20),
      new Book('Notre-Dame de Paris', 'Victor Hugo', 'Poche', '1831', 'Roman Historique', 21),
      new Book('Le Silmarillion', 'J.R.R. Tolkien', 'Bourgois', '1977', 'Fantasy', 22),
      new Book('Chroniques de Narnia : Le Lion, la Sorcière blanche et l\'Armoire magique', 'C.S. Lewis', 'Gallimard', '1950', 'Fantasy', 23),
      new Book('Chroniques de Narnia : Le Prince Caspian', 'C.S. Lewis', 'Gallimard', '1951', 'Fantasy', 24),
      new Book('L\'Étranger', 'Albert Camus', 'Gallimard', '1942', 'Philosophie', 25),
      new Book('La Peste', 'Albert Camus', 'Gallimard', '1947', 'Drame', 26),
      new Book('Fahrenheit 451', 'Ray Bradbury', 'Denoël', '1953', 'Dystopie', 27),
      new Book('Le Meilleur des mondes', 'Aldous Huxley', 'Pocket', '1932', 'Dystopie', 28),
      new Book('Sherlock Holmes : Une étude en rouge', 'Arthur Conan Doyle', 'Livre de Poche', '1887', 'Policier', 29),
      new Book('Le Signe des quatre', 'Arthur Conan Doyle', 'Livre de Poche', '1890', 'Policier', 30),
      new Book('Le Chien des Baskerville', 'Arthur Conan Doyle', 'Livre de Poche', '1902', 'Policier', 31),
      new Book('Le Malade Imaginaire', 'Molière', 'Larousse', '1673', 'Comédie', 32),
      new Book('L\'Avare', 'Molière', 'Larousse', '1668', 'Comédie', 33),
      new Book('Le Cid', 'Pierre Corneille', 'Larousse', '1637', 'Tragédie', 34),
      new Book('Germinal', 'Émile Zola', 'Pocket', '1885', 'Naturalisme', 35),
      new Book('L\'Assommoir', 'Émile Zola', 'Pocket', '1877', 'Naturalisme', 36),
      new Book('Au Bonheur des Dames', 'Émile Zola', 'Pocket', '1883', 'Naturalisme', 37),
      new Book('Le Rouge et le Noir', 'Stendhal', 'Gallimard', '1830', 'Roman', 38),
      new Book('Madame Bovary', 'Gustave Flaubert', 'Poche', '1857', 'Réalisme', 39),
      new Book('Salammbô', 'Gustave Flaubert', 'Poche', '1862', 'Réalisme', 40),
      new Book('Vingt mille lieues sous les mers', 'Jules Verne', 'Hetzel', '1869', 'Aventure', 41),
      new Book('Voyage au centre de la Terre', 'Jules Verne', 'Hetzel', '1864', 'Aventure', 42),
      new Book('De la Terre à la Lune', 'Jules Verne', 'Hetzel', '1865', 'Aventure', 43),
      new Book('L\'Île au trésor', 'Robert Louis Stevenson', 'Poche', '1883', 'Aventure', 44),
      new Book('Dracula', 'Bram Stoker', 'Poche', '1897', 'Horreur', 45),
      new Book('Frankenstein', 'Mary Shelley', 'Poche', '1818', 'Horreur', 46),
      new Book('L\'Appel de Cthulhu', 'H.P. Lovecraft', 'Denoël', '1928', 'Mythe', 47),
      new Book('Le Horla', 'Guy de Maupassant', 'Gallimard', '1887', 'Fantastique', 48),
      new Book('Bel-Ami', 'Guy de Maupassant', 'Pocket', '1885', 'Réalisme', 49),
      new Book('Le Portrait de Dorian Gray', 'Oscar Wilde', 'Poche', '1890', 'Drame', 50),
      new Book('Alice au pays des merveilles', 'Lewis Carroll', 'Macmillan', '1865', 'Conte', 51),
      new Book('Peter Pan', 'J.M. Barrie', 'Poche', '1911', 'Conte', 52),
      new Book('Don Quichotte', 'Miguel de Cervantes', 'Poche', '1605', 'Satire', 53),
      new Book('L\'Odyssée', 'Homère', 'Ancien', '-VIIIe s.', 'Épopée', 54),
      new Book('L\'Iliade', 'Homère', 'Ancien', '-VIIIe s.', 'Épopée', 55),
      new Book('L\'Alchimiste', 'Paulo Coelho', 'Harper', '1988', 'Philosophie', 56),
      new Book('Da Vinci Code', 'Dan Brown', 'Lattès', '2003', 'Thriller', 57),
      new Book('Anges et Démons', 'Dan Brown', 'Lattès', '2000', 'Thriller', 58),
      new Book('Millénium 1 : Les hommes qui n\'aimaient pas les femmes', 'Stieg Larsson', 'Actes Sud', '2005', 'Policier', 59),
      new Book('Shutter Island', 'Dennis Lehane', 'Rivages', '2003', 'Thriller', 60),
      new Book('Hypérion', 'Dan Simmons', 'Robert Laffont', '1989', 'Science-Fiction', 61),
      new Book('Neuromancien', 'William Gibson', 'Au Diable Vauvert', '1984', 'Cyberpunk', 62),
      new Book('Blade Runner', 'Philip K. Dick', 'J\'ai Lu', '1968', 'Science-Fiction', 63),
      new Book('Le Labyrinthe', 'James Dashner', 'Pocket Jeunesse', '2009', 'Dystopie', 64),
      new Book('Hunger Games', 'Suzanne Collins', 'Pocket Jeunesse', '2008', 'Dystopie', 65),
      new Book('Hunger Games : L\'Embrasement', 'Suzanne Collins', 'Pocket Jeunesse', '2009', 'Dystopie', 66),
      new Book('Hunger Games : La Révolte', 'Suzanne Collins', 'Pocket Jeunesse', '2010', 'Dystopie', 67),
      new Book('Le Lion', 'Joseph Kessel', 'Gallimard', '1958', 'Aventure', 68),
      new Book('L\'Écume des jours', 'Boris Vian', 'Poche', '1947', 'Surréalisme', 69),
      new Book('Le Grand Meaulnes', 'Alain-Fournier', 'Poche', '1913', 'Drame', 70),
      new Book('La Métamorphose', 'Franz Kafka', 'Gallimard', '1915', 'Absurde', 71),
      new Book('Le Procès', 'Franz Kafka', 'Gallimard', '1925', 'Absurde', 72),
      new Book('Le Vieil Homme et la Mer', 'Ernest Hemingway', 'Gallimard', '1952', 'Drame', 73),
      new Book('Pour qui sonne le glas', 'Ernest Hemingway', 'Gallimard', '1940', 'Guerre', 74),
      new Book('Gatsby le Magnifique', 'F. Scott Fitzgerald', 'Poche', '1925', 'Drame', 75),
      new Book('Les Raisins de la colère', 'John Steinbeck', 'Gallimard', '1939', 'Social', 76),
      new Book('Des souris et des hommes', 'John Steinbeck', 'Gallimard', '1937', 'Social', 77),
      new Book('Sur la route', 'Jack Kerouac', 'Gallimard', '1957', 'Beat Generation', 78),
      new Book('Moby Dick', 'Herman Melville', 'Phébus', '1851', 'Aventure', 79),
      new Book('Le Grand Nuage de Magellan', 'Stanislas Lem', 'Poche', '1955', 'Science-Fiction', 80),
      new Book('Solaris', 'Stanislas Lem', 'Denoël', '1961', 'Science-Fiction', 81),
      new Book('La Machine à explorer le temps', 'H.G. Wells', 'Poche', '1895', 'Science-Fiction', 82),
      new Book('La Guerre des mondes', 'H.G. Wells', 'Poche', '1898', 'Science-Fiction', 83),
      new Book('La Nuit des temps', 'René Barjavel', 'Pocket', '1968', 'Science-Fiction', 84),
      new Book('Le Voyageur imprudent', 'René Barjavel', 'Pocket', '1944', 'Science-Fiction', 85),
      new Book('Ravage', 'René Barjavel', 'Pocket', '1943', 'Dystopie', 86),
      new Book('Le Parfum', 'Patrick Süskind', 'Pocket', '1985', 'Historique', 87),
      new Book('L\'Ombre du vent', 'Carlos Ruiz Zafón', 'Pocket', '2001', 'Drame', 88),
      new Book('Le Jeu de l\'ange', 'Carlos Ruiz Zafón', 'Pocket', '2008', 'Drame', 89),
      new Book('Le Prisonnier du ciel', 'Carlos Ruiz Zafón', 'Pocket', '2011', 'Drame', 90),
      new Book('Le Nom de la rose', 'Umberto Eco', 'Grasset', '1980', 'Médiéval', 91),
      new Book('Le Pendule de Foucault', 'Umberto Eco', 'Grasset', '1988', 'Mystère', 92),
      new Book('Code source', 'Techno Thriller', 'Livre de Poche', '2015', 'Thriller', 93),
      new Book('La Vérité sur l\'affaire Harry Quebert', 'Joël Dicker', 'Fallois', '2012', 'Policier', 94),
      new Book('Le Livre de Baltimore', 'Joël Dicker', 'Fallois', '2015', 'Drame', 95),
      new Book('La Disparition de Stephanie Mailer', 'Joël Dicker', 'Fallois', '2018', 'Policier', 96),
      new Book('L\'Enigme de la chambre 622', 'Joël Dicker', 'Fallois', '2020', 'Policier', 97),
      new Book('Le Prophète', 'Khalil Gibran', 'Poche', '1923', 'Philosophie', 98),
      new Book('Siddhartha', 'Hermann Hesse', 'Poche', '1922', 'Philosophie', 99),
      new Book('Le Loup des steppes', 'Hermann Hesse', 'Calmann-Lévy', '1927', 'Philosophie', 100),
      new Book('Guerre et Paix', 'Léon Tolstoï', 'Poche', '1869', 'Historique', 101),
      new Book('Anna Karénine', 'Léon Tolstoï', 'Poche', '1877', 'Drame', 102),
      new Book('Crime et Châtiment', 'Fiodor Dostoïevski', 'Poche', '1866', 'Psychologique', 103),
      new Book('Les Frères Karamazov', 'Fiodor Dostoïevski', 'Poche', '1880', 'Psychologique', 104),
      new Book('L\'Idiot', 'Fiodor Dostoïevski', 'Poche', '1869', 'Psychologique', 105),
      new Book('Le Pavillon des cancéreux', 'Alexandre Soljenitsyne', 'Pocket', '1968', 'Social', 106),
      new Book('L\'Archipel du Goulag', 'Alexandre Soljenitsyne', 'Seuil', '1973', 'Témoignage', 107),
      new Book('Cent ans de solitude', 'Gabriel García Márquez', 'Seuil', '1967', 'Réalisme Magique', 108),
      new Book('Chronique d\'une mort annoncée', 'Gabriel García Márquez', 'Poche', '1981', 'Drame', 109),
      new Book('Fictions', 'Jorge Luis Borges', 'Gallimard', '1944', 'Fantastique', 110),
      new Book('L\'Aleph', 'Jorge Luis Borges', 'Gallimard', '1949', 'Fantastique', 111),
      new Book('Pedro Páramo', 'Juan Rulfo', 'Gallimard', '1955', 'Roman', 112),
      new Book('La Maison aux esprits', 'Isabel Allende', 'Fayard', '1982', 'Drame', 113),
      new Book('La Route', 'Cormac McCarthy', 'Olivier', '2006', 'Post-apocalyptique', 114),
      new Book('No Country for Old Men', 'Cormac McCarthy', 'Olivier', '2005', 'Thriller', 115),
      new Book('Fight Club', 'Chuck Palahniuk', 'Gallimard', '1996', 'Satire', 116),
      new Book('American Psycho', 'Bret Easton Ellis', 'Robert Laffont', '1991', 'Satire', 117),
      new Book('Moins que zéro', 'Bret Easton Ellis', 'Pocket', '1985', 'Drame', 118),
      new Book('Les Particules élémentaires', 'Michel Houellebecq', 'Flammarion', '1998', 'Roman', 119),
      new Book('Soumission', 'Michel Houellebecq', 'Flammarion', '2015', 'Anticipation', 120),
      new Book('Anéantir', 'Michel Houellebecq', 'Flammarion', '2022', 'Roman', 121),
      new Book('La Carte et le Territoire', 'Michel Houellebecq', 'Flammarion', '2010', 'Roman', 122),
      new Book('Chanson douce', 'Leïla Slimani', 'Gallimard', '2016', 'Drame', 123),
      new Book('Dans le jardin de l\'ogre', 'Leïla Slimani', 'Gallimard', '2014', 'Drame', 124),
      new Book('Leurs enfants après eux', 'Nicolas Mathieu', 'Actes Sud', '2018', 'Social', 125),
      new Book('La Panthère des neiges', 'Sylvain Tesson', 'Gallimard', '2019', 'Récit de voyage', 126),
      new Book('Dans les forêts de Sibérie', 'Sylvain Tesson', 'Gallimard', '2011', 'Récit de voyage', 127),
      new Book('Petit Pays', 'Gaël Faye', 'Grasset', '2016', 'Historique', 128),
      new Book('En attendant Bojangles', 'Olivier Bourdeaut', 'Finitude', '2016', 'Drame', 129),
      new Book('L\'Élégance du hérisson', 'Muriel Barbery', 'Gallimard', '2006', 'Comédie Dramatique', 130),
      new Book('Kafka sur le rivage', 'Haruki Murakami', 'Belfond', '2002', 'Réalisme Magique', 131),
      new Book('La Ballade de l\'impossible', 'Haruki Murakami', 'Belfond', '1987', 'Drame', 132),
      new Book('1Q84 : Livre 1', 'Haruki Murakami', 'Belfond', '2009', 'Réalisme Magique', 133),
      new Book('1Q84 : Livre 2', 'Haruki Murakami', 'Belfond', '2009', 'Réalisme Magique', 134),
      new Book('1Q84 : Livre 3', 'Haruki Murakami', 'Belfond', '2010', 'Réalisme Magique', 135),
      new Book('La Course au mouton sauvage', 'Haruki Murakami', 'Seuil', '1982', 'Roman', 136),
      new Book('Chroniques de l\'oiseau à ressort', 'Haruki Murakami', 'Seuil', '1994', 'Roman', 137),
      new Book('L\'Incolore Tsukuru Tazaki et ses années de pèlerinage', 'Haruki Murakami', 'Belfond', '2013', 'Drame', 138),
      new Book('Des hommes sans femmes', 'Haruki Murakami', 'Belfond', '2014', 'Nouvelles', 139),
      new Book('Le Meurtre du Commandeur', 'Haruki Murakami', 'Belfond', '2017', 'Roman', 140),
      new Book('Le Pavillon d\'or', 'Yukio Mishima', 'Gallimard', '1956', 'Drame', 141),
      new Book('Une braise sous la cendre', 'Sabaa Tahir', 'Pocket Jeunesse', '2015', 'Fantasy', 142),
      new Book('Eragon', 'Christopher Paolini', 'Bayard Jeunesse', '2003', 'Fantasy', 143),
      new Book('L\'Aîné', 'Christopher Paolini', 'Bayard Jeunesse', '2005', 'Fantasy', 144),
      new Book('Brisingr', 'Christopher Paolini', 'Bayard Jeunesse', '2008', 'Fantasy', 145),
      new Book('L\'Héritage', 'Christopher Paolini', 'Bayard Jeunesse', '2011', 'Fantasy', 146),
      new Book('Percy Jackson : Le Voleur de foudre', 'Rick Riordan', 'Albin Michel', '2005', 'Fantastique', 147),
      new Book('Percy Jackson : La Mer des monstres', 'Rick Riordan', 'Albin Michel', '2006', 'Fantastique', 148),
      new Book('Percy Jackson : Le Sort du titan', 'Rick Riordan', 'Albin Michel', '2007', 'Fantastique', 149),
      new Book('Percy Jackson : La Bataille du labyrinthe', 'Rick Riordan', 'Albin Michel', '2008', 'Fantastique', 150)
    ];

    // Extraction de la liste des titres pour l'autocomplétion
    this.allBooks = this.mockBooks.map(book => book.titre);

    // Déclenchement de la notification globale de succès
    this.notifService.show(true, `${this.mockBooks.length} vrais livres chargés pour tes tests d'autocomplétion !`);
  }

  // Se déclenche dès que l'utilisateur tape une lettre dans l'input
  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filteredBooks = [];
      return;
    }

    // Filtrage dynamique direct dans la liste locale des 150 titres
    this.filteredBooks = this.allBooks.filter(book =>
      book.toLowerCase().includes(query)
    );
  }

  // Sélectionne le livre lors du clic sur une suggestion
  selectBook(book: string): void {
    this.searchQuery = book;
    this.filteredBooks = [];
  }

  // Navigation via les flèches du bas
  navigateBook(direction: 'next' | 'prev'): void {
    if (this.allBooks.length === 0) return;

    let currentIndex = this.allBooks.indexOf(this.searchQuery);

    if (direction === 'next') {
      currentIndex++;
      if (currentIndex >= this.allBooks.length) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = this.allBooks.length - 1;
      }
    }

    this.searchQuery = this.allBooks[currentIndex];
    this.filteredBooks = [];
  }
}
