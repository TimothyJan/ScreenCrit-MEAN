import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { MovieDetails } from '../../../models/movie-details';
import { TVSeriesDetails } from '../../../models/tvseries-details';
import { MatDialog } from '@angular/material/dialog';
import { MovieReviewsService } from '../../../services/movie-reviews.service';
import { TVseriesReviewsService } from '../../../services/tvseries-reviews.service';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component';

@Component({
  selector: 'app-carousel-review-item',
  templateUrl: './carousel-review-item.component.html',
  styleUrl: './carousel-review-item.component.css'
})
export class CarouselReviewItemComponent implements OnInit {
  @Input() id: number = 0; // Movie or TV id
  @Input() movieOrTvSeries: string = ""; // MOVIES or TVSERIES****
  movieDetails: MovieDetails;
  tvSeriesDetails: TVSeriesDetails;
  loadingData: boolean = true;

  // For star highlight component input to display highlighted stars in review mode
  reviewRating: number;

  constructor(
    private _tmdbService: TmdbService,
    public dialog: MatDialog,
    private _movieReviewsService: MovieReviewsService,
    private _tvSeriesReviewsService: TVseriesReviewsService
  ) {}

  ngOnInit(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        this.getMovieDetails();
        this._movieReviewsService.movieReviewsChanged.subscribe(value => {
          this.reviewRating = this._movieReviewsService.getReview(this.id).rating;
        });
        break;
      case "TVSERIES":
        this.getTvSeriesDetails();
        this._tvSeriesReviewsService.tvSeriesReviewsChanged.subscribe(value => {
          this.reviewRating = this._tvSeriesReviewsService.getReview(this.id).rating;
        });
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Get Movie Details */
  getMovieDetails(): void {
    this._tmdbService.getMovieDetails(this.id)
    .subscribe(
      data => {
        // console.log(data);
        this.movieDetails = {...data};
        this.setMovieCardDetails();
        this.setStarRating();
        this.loadingData = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set Movie details */
  setMovieCardDetails(): void {
    this.movieDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.movieDetails.poster_path;
  }

  /** Get TV Series Details */
  getTvSeriesDetails(): void {
    this._tmdbService.getTVSeriesDetails(this.id)
    .subscribe(
      data => {
      // console.log(data);
      this.tvSeriesDetails = {...data};
      this.setTvSeriesCardDetails();
      this.setStarRating();
      this.loadingData = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set TV Series Details */
  setTvSeriesCardDetails(): void {
    this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.tvSeriesDetails.poster_path;
  }

  setStarRating(): void {
    // for star highlight
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        let currentMovieReview = this._movieReviewsService.getReview(this.id);
        // console.log(currentMovieReview);
        if (currentMovieReview != undefined) {
          this.reviewRating = currentMovieReview.rating;
        }
        break;
      case "TVSERIES":
        let currentTVSeriesReview = this._tvSeriesReviewsService.getReview(this.id);
        // console.log(currentTVSeriesReview);
        if(currentTVSeriesReview != undefined) {
          this.reviewRating = currentTVSeriesReview.rating;
        }
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Open Dialog */
  openEditDialog(): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      data: {
        id: this.id,
        movieOrTvSeries: this.movieOrTvSeries
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
