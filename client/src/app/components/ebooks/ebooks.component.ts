import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AudioHelper } from 'src/app/helpers/audioHelper';
import { PdfHelper } from 'src/app/helpers/pdfHelper';
import { TxtHelper } from 'src/app/helpers/txtHelper';
import { Book } from 'src/app/models/book';
import { Categories, Category } from 'src/app/models/category';
import { GutendexService } from 'src/app/services/gutendex.service';

@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.css']
})
export class EbooksComponent {

  previous() {
    throw new Error('Method not implemented.');
  }
  next() {
    throw new Error('Method not implemented.');
  }
  isPlaying: any;
  progress: any;
  playPause() {
    throw new Error('Method not implemented.');
  }


  isLoading = false;
  categories!: Category[];
  books!: Book[];
  selectedCategory!: Category;
  gutendexService!: GutendexService;
  searchTerm!: string;
  pageNumber!: number;
  totalPages!: number;
  selectedBook!: Book;
  pdfHelper!: PdfHelper;
  audioHelper!: AudioHelper;
  txtHelper!: TxtHelper;

  constructor(private router: Router, booksService: GutendexService, pdfHelper: PdfHelper, 
    audioHelper: AudioHelper, txtHelper: TxtHelper) {
    this.pdfHelper = pdfHelper;
    this.audioHelper = audioHelper;
    this.txtHelper = txtHelper;
    this.gutendexService = booksService;
    this.categories = Categories.getAll();
    this.selectedCategory = this.categories[0];
    this.pageNumber = 1;
  }


  ngOnInit() {
    this.getBooks();
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.searchTerm = '';
    if (category.name === 'All') {
      this.getBooks();
    }
    else {
      this.getBooksByCategory();
    }
  }
  getBooksByCategory() {
    this.isLoading = true;
    this.gutendexService.getBooksByCategory(this.selectedCategory.name, this.pageNumber).then(books => {
      this.books = books;
      this.isLoading = false;
    });
  }
  getBooks() {
    this.isLoading = true;
    this.gutendexService.getAllBooks(this.pageNumber).then(books => {
      this.books = books;
      this.isLoading = false;
    }).catch(error => {
      console.log(error);
    });
  }
  search() {
    if (this.searchTerm.length === 0) {
      this.getBooks();
    }
    this.searchBooks(this.searchTerm);

  }
  searchBooks(searchTerm: string) {

    this.selectedCategory = this.categories[0];
    this.isLoading = true;
    this.gutendexService.getBooksBySearch(searchTerm, this.pageNumber).then(books => {
      this.books = books;
      this.isLoading = false;
    }
    );
  }

  info(book: Book) {
    this.router.navigate(['/ebookdetails'], { queryParams: { id: book.id } });
  }
  play(book: Book) {
   this.audioHelper.textToSpeech(book.id);
  }
  read(book: Book) {
    this.pdfHelper.readPdf(book.id);
  }
  downloadPdf(book: Book) {
    this.pdfHelper.downloadPdf(book.id, book.title);
  }
  downloadMP3(book: Book) {
    this.audioHelper.downloadMp3(book.formats['text/plain'], book.title);
  }
  downloadTxt(_t34: Book) {
    this.txtHelper.downloadTxtFile(_t34.id, _t34.title);
  }
  nextPage() {
    this.pageNumber++;
    if (this.selectedCategory.name === 'All') {
      this.getBooks();
    }
    else {
      this.getBooksByCategory();
    }
  }
  previousPage() {
    this.pageNumber--;
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    }
    if (this.selectedCategory.name === 'All') {
      this.getBooks();
    }
    else {
      this.getBooksByCategory();
    }
  }

  toPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    if (this.selectedCategory.name === 'All') {
      this.getBooks();
    }
    else {
      this.getBooksByCategory();
    }
  }





}
