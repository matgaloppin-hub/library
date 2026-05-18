export class Book {
  // 1. Déclaration des attributs (Propriétés)
  public idLivre?: number;
  public titre: string;
  public auteur: string;
  public edition: string;
  public anneeParuation: string;
  public genre: string;

  constructor(
    titre: string,
    auteur: string,
    edition: string,
    anneeParuation: string,
    genre: string,
    idLivre?: number
  ) {
    this.titre = titre;
    this.auteur = auteur;
    this.edition = edition;
    this.anneeParuation = anneeParuation;
    this.genre = genre;
  }
}
