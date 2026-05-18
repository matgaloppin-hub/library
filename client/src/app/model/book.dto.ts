// model/book.dto.ts
export interface BookDTO {
  titre: string;
  auteurs: string;
  genre: string;
  emplacement: string;
  anneeParution: number;
  edition: string;
  disponible: boolean;
}