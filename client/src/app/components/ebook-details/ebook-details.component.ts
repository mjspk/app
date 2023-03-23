import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Router, ActivatedRoute } from '@angular/router';
import { GutendexService } from 'src/app/services/gutendex.service';
import { AudioHelper } from 'src/app/helpers/audioHelper';
import { PdfHelper } from 'src/app/helpers/pdfHelper';
import { TxtHelper } from 'src/app/helpers/txtHelper';
@Component({
  selector: 'app-ebook-details',
  templateUrl: './ebook-details.component.html',
  styleUrls: ['./ebook-details.component.css']
})
export class EbookDetailsComponent {

  book!: Book;
  gutendexService!: GutendexService;
  pdfHelper!: PdfHelper;
  audioHelper!: AudioHelper;
  txtHelper!: TxtHelper;
  constructor(private router: Router, private route: ActivatedRoute, booksService: GutendexService, pdfHelper: PdfHelper, audioHelper: AudioHelper, txtHelper: TxtHelper) {
    this.pdfHelper = pdfHelper;
    this.audioHelper = audioHelper;
    this.gutendexService = booksService;
    this.txtHelper = txtHelper;

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = Number(params['id']);
      this.book = this.getBookById(id);
    });

  }
  getBookById(id: number): Book {
    this.gutendexService.getBookById(id).then(book => {
      this.book = book;
    });
    return this.book;
  }

  info(book: Book) {
    this.router.navigate(['/ebookdetails'], { queryParams: { id: book.id } });
  }
  play(book: Book) {
    this.audioHelper.textToSpeech(book.id, book.title);
  }
  read(book: Book) {
    this.pdfHelper.readPdf(book.id);
  }
  downloadPdf(book: Book) {
    this.pdfHelper.downloadPdf(book.id, book.title);
  }
  downloadMP3(book: Book) {
    this.audioHelper.downloadMp3(book.id, book.title);
  }
  downloadTxt(_t34: Book) {
    this.txtHelper.downloadTxtFile(_t34.id, _t34.title);
  }
  onBack() {
    this.router.navigate(['/ebooks']);
  }
}
