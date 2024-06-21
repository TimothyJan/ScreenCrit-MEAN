import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit, WritableSignal } from '@angular/core';

import { MovieDetails } from '../../../models/movie-details';
import { TVSeriesDetails } from '../../../models/tvseries-details';
import { TmdbService } from '../../../services/tmdb.service';
import { ReviewService } from '../../../services/review.service';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { TitlePipe } from '../../../pipes/title.pipe';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-carousel-review-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    TitlePipe,
    StarRatingComponent,
    MatDialogModule
  ],
  templateUrl: './carousel-review-item.component.html',
  styleUrl: './carousel-review-item.component.css'
})
export class CarouselReviewItemComponent implements OnInit {
  @Input() movieOrTvSeries: string = ""; // MOVIES or TVSERIES****
  @Input() tmdbId: number = 0; // Movie or TV id
  @Input() review_id: string = "";
  movieDetails: MovieDetails;
  tvSeriesDetails: TVSeriesDetails;
  currentMovieReview$ = {} as WritableSignal<Review>;
  currentTVSeriesReview$ = {} as WritableSignal<Review>;
  loadingData: boolean = true;

  imgWidth:number = 210;
  imgHeight:number = 350;

  // For star highlight component input to display highlighted stars in review mode
  reviewRating: number;

  constructor(
    private _tmdbService: TmdbService,
    public dialog: MatDialog,
    private _reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.getAndSetCardDetails();
    this.getReview();
    this.setStarRating();
  }

  /** Get and set Card Details */
  getAndSetCardDetails(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        this.getAndSetMovieDetails();
        break;
      case "TVSERIES":
        this.getAndSetTvSeriesDetails();
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Get and Set Movie Details */
  getAndSetMovieDetails(): void {
    this._tmdbService.getMovieDetails(this.tmdbId)
    .subscribe(
      data => {
        this.movieDetails = {...data};
        this.setMovieCardPoster();
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Get and Set TV Series Details */
  getAndSetTvSeriesDetails(): void {
    this._tmdbService.getTVSeriesDetails(this.tmdbId)
    .subscribe(
      data => {
      this.tvSeriesDetails = {...data};
      this.setTvSeriesCardPoster();
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set Movie details */
  setMovieCardPoster(): void {
    // this.movieDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.movieDetails.poster_path;
    this.movieDetails.poster_path = `https://image.tmdb.org/t/p/w342/` + this.movieDetails.poster_path;
  }

  /** Set TV Series Details */
  setTvSeriesCardPoster(): void {
    // this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.tvSeriesDetails.poster_path;
    this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/w342/` + this.tvSeriesDetails.poster_path;
  }

  getReview(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        this._reviewService.getMovieReview(this.review_id);
        this.currentMovieReview$ = this._reviewService.review$;
        break;
      case "TVSERIES":
        this._reviewService.getTVReview(this.review_id);
        this.currentTVSeriesReview$ = this._reviewService.review$;
        this.loadingData = false;
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Set star rating */
  setStarRating(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        if (this.currentMovieReview$() != undefined) {
          this.reviewRating = this.currentMovieReview$().rating;
        }
        this.loadingData = false;
        break;
      case "TVSERIES":
        if (this.currentTVSeriesReview$() != undefined) {
          this.reviewRating = this.currentTVSeriesReview$().rating;
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
        movieOrTvSeries: this.movieOrTvSeries,
        review_id: this.review_id,
        tmdbId: this.tmdbId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
