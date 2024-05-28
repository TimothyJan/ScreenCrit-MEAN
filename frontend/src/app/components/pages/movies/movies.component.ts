import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { CarouselComponent } from '../../carousel/carousel.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    SearchComponent,
    CarouselComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

}
