export class Book {
  public id?: number;
  public titre: string;
  public auteur: string;
  public edition: string;
  public anneeParution: string;
  public genre: string;
  public disponible: boolean; 

  constructor(
    titre: string,
    auteur: string,
    edition: string,
    anneeParution: string,
    genre: string,
    id?: number,
    disponible: boolean = true
  ) {
    this.titre = titre;
    this.auteur = auteur;
    this.edition = edition;
    this.anneeParution = anneeParution;
    this.genre = genre;
    this.id = id;
    this.disponible = disponible;
  }
}