import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Tab } from 'src/app/models/tab';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
search() {
throw new Error('Method not implemented.');
}
  isLoggedIn!: boolean;
  tabs: Tab[] = [
    { name: 'Ebooks', url: '/ebooks' },
    { name: 'PDF to Audio', url: '/pdftoaudio' }
  ];
  selectedTab!: Tab;
searchTerm: any;
  selectTab(tab: Tab) {
    this.selectedTab = tab;
  }

 
  
  ngOnInit(): void {
    this.selectedTab = this.tabs[0];
    
  }
}