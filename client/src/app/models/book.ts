
export interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface Translator {
  name: string;
  birth_year?: any;
  death_year?: any;
}


export class Book {
  id: number;
  title: string;
  authors: Author[];
  translators: Translator[];
  subjects: string[];
  bookshelves: string[];
  language: string;
  copyright: boolean;
  media_type: string;
  formats: any;
  download_count: number;
  cover: string;

  constructor(id: number, title: string, authors: Author[], translators: Translator[], subjects: string[], bookshelves: string[], language: string, copyright: boolean, media_type: string, formats: any, download_count: number, cover: string) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.translators = translators;
    this.subjects = subjects;
    this.bookshelves = bookshelves;
    this.language = language;
    this.copyright = copyright;
    this.media_type = media_type;
    this.formats = formats;
    this.download_count = download_count;
    this.cover = cover;
  }
}
