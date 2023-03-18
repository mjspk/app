import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EbooksComponent } from './components/ebooks/ebooks.component';
import { PdfToAudioComponent } from './components/pdf-to-audio/pdf-to-audio.component';
import { EbookDetailsComponent } from './components/ebook-details/ebook-details.component';
import {AboutComponent} from './components/about/about.component';
const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ebooks', component: EbooksComponent },
  { path: 'pdftoaudio', component: PdfToAudioComponent },
  { path: 'ebookdetails', component: EbookDetailsComponent },
  { path: '', redirectTo: '/ebooks', pathMatch: 'full' },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
