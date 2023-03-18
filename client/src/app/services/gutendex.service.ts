import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class GutendexService {

  totalPageCount = 0;
  baseUrl = 'http://localhost:5000';
  booksUrl = this.baseUrl + '/books';
  subjectsUrl = this.baseUrl + '/subjects';
  bysubjectsUrl = this.baseUrl + '/bysubject';
  searchUrl = this.baseUrl + '/search';
  gettxtUrl = this.baseUrl + '/gettext';

  constructor(private http: HttpClient) { }

  async getAllBooks(pageNumber: number): Promise<Book[]> {
    try {
      const limit = 30;
      const offset = (pageNumber - 1) * limit;
      const response = await fetch(this.booksUrl + '?limit=' + limit + '&offset=' + offset);
      const data = await response.json();
      const totalBooks = data.totalCount;
      this.totalPageCount = Math.ceil(totalBooks / limit);
      return data.books;
    }
    catch (error) {
      console.log(error);
    }
    return Promise.resolve([]);

  }

  async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetch(this.booksUrl + '/' + id);
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log(error);
    }
    return Promise.resolve({} as Book);
  }

  async getSubjects(): Promise<string[]> {
    try {
      const response = await fetch(this.subjectsUrl);
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log(error);
    }
    return Promise.resolve([]);
  }

  async getBooksByCategory(category: string, pageNumber: number): Promise<Book[]> {
    try {
      const limit = 30;
      const offset = (pageNumber - 1) * limit;
      const response = await fetch(this.bysubjectsUrl + '?subject=' + category + '&limit=' + limit + '&offset=' + offset);
      const data = await response.json();
      const totalBooks = data.totalCount;
      this.totalPageCount = Math.ceil(totalBooks / limit);
      return data.books;
      
    }
    catch (error) {
      console.log(error);
    }
    return Promise.resolve([]);
  }

  async getBooksBySearch(searchTerm: string, pageNumber: number): Promise<Book[]> {
    try {
      const limit = 30;
      const offset = (pageNumber - 1) * limit;
      const response = await fetch(this.searchUrl + '?query=' + searchTerm + '&limit=' + limit + '&offset=' + offset);
      const data = await response.json();
      const totalBooks = data.totalCount;
      this.totalPageCount = Math.ceil(totalBooks / limit);
      return data.books;
      
    }
    catch (error) {
      console.log(error);
    }
    return Promise.resolve([]);
  }

  async getBookText(bookId: number): Promise<string> {
    try {
      const response: HttpResponse<ArrayBuffer> | undefined = await this.http.get(this.gettxtUrl + '/' + bookId, { observe: 'response', responseType: 'arraybuffer' }).toPromise();
      if (response && response.status === 200 && response.body !== null) {
        const decoder = new TextDecoder();
        const data = decoder.decode(response.body);
        const char_count = data.length;
        console.log(char_count);
        return data;
      } else {
        throw new Error(`Error retrieving text: status ${response?.status ?? 'undefined'}`);
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error retrieving text: ${error.message}`);
    }
  }
}
