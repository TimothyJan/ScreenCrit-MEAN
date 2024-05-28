import { Component, HostListener, Injector, OnInit, afterNextRender, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from '../title/title.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

// const largeScreenSize = 768;
const largeScreenSize = 930;

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TitleComponent,
    FooterComponent
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
  injector = inject(Injector);
  isLargeScreen: boolean = true;

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/tvseries', label: 'TV Shows' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/login', label: 'Login' },
  ];

  constructor() {
  }

  ngOnInit(): void {
      afterNextRender(() => this.checkScreenSize(), {injector: this.injector});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any): void{
    this.checkScreenSize();
  }

  /** Changes css based on screen size */
  checkScreenSize(): void {
    this.isLargeScreen = window.innerWidth > largeScreenSize; // Adjust breakpoint as needed
  }
}
