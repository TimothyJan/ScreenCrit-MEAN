import { Component, HostListener } from '@angular/core';

// const largeScreenSize = 768;
const largeScreenSize = 930;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  isLargeScreen: boolean = true;

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/tvseries', label: 'TV Shows' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/login', label: 'Login' },
  ];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  /** Changes css based on screen size */
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth > largeScreenSize; // Adjust breakpoint as needed
  }

}
