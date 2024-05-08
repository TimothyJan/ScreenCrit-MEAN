import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Input() movieOrTvSeries: string = "MOVIES"; // MOVIES or TVSERIES****
  searchPlaceholder: string = "";
  query: string = "";
  searchCarousel: boolean = false;

  constructor(
    private _tmdbService: TmdbService,
  ) {}

  ngOnInit(): void {
    this.setSearchPlaceholder();
  }

  /** Set Search Placeholder in the input */
  setSearchPlaceholder(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        this.searchPlaceholder = "Search Movies";
        break;
      case "TVSERIES":
        this.searchPlaceholder = "Search TV Shows";
        break;
      default:
        console.log("movieOrTvSeries issue");
        break;
    }
  }

  /** Opens carousel with search results */
  onSearch(query:string): void {
    this.searchCarousel = true;
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        break;
      case "TVSERIES":
        break;
      default:
        console.log("movieOrTvSeries issue");
        break;
    }
  }
}
