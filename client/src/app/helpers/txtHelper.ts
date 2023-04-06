import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GutendexService } from '../services/gutendex.service';
import { Book } from '../models/book';

@Injectable({
    providedIn: 'root'
})
export class TxtHelper {

    constructor(private gutendexService: GutendexService) { }

    public async readTxtFileToRawText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const text = event.target.result;
                const cleanText = this.cleanText(text);
                resolve(cleanText);
            };
            reader.readAsText(file);
        });
    }


    public async readPdfFileToRawText(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                // const pdfData = event.target.result;
                // const pdfParser = new PDFParser();
                // pdfParser.on("pdfParser_dataError", errData => {
                //     reject(errData);
                // });
                // pdfParser.on("pdfParser_dataReady", pdfData => {
                //     resolve(pdfData);
                // });
                // pdfParser.parseBuffer(pdfData);
            };
            reader.readAsArrayBuffer(file);
        });
    }


    downloadTxtFile(id: number, fileName: string) {
        this.gutendexService.getBookText(id).then((txtContent: string) => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }).catch((error) => {
            console.error(error);
        });
    } 
    
    cleanText(text: string) {
        return text.replace(/[^a-zA-Z0-9.,!?;:'"()\- ]/g, '');
    }

    cleanBook(text: string, title: string) {
        var match = text.match(new RegExp(`\\*\\*\\* START OF THE PROJECT GUTENBERG EBOOK ${title.toUpperCase()} \\*\\*\\*`));
        if (match) {
            const index = match.index;
            var cleanContent = text.substring((index as number));
            return cleanContent.replace(`\\*\\*\\* START OF THE PROJECT GUTENBERG EBOOK ${title.toUpperCase()} \\*\\*\\*`, '');
        }
        return text;
    }

    async getCleanBookText(book: Book) {
        const bookText = await this.gutendexService.getBookText(book.id);
        const cleanText = this.cleanText(bookText);
        const cleanContent = this.cleanBook(cleanText, book.title);
        return cleanContent;

    }

}