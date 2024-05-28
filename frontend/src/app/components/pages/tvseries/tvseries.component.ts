import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { CarouselComponent } from '../../carousel/carousel.component';

@Component({
  selector: 'app-tvseries',
  standalone: true,
  imports: [
    SearchComponent,
    CarouselComponent
  ],
  templateUrl: './tvseries.component.html',
  styleUrl: './tvseries.component.css'
})
export class TvseriesComponent {

}
