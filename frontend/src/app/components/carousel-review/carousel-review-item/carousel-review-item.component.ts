import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit, WritableSignal, signal, effect, computed } from '@angular/core';

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

  currentReview = signal<Review>({} as Review);
  loadingData = signal<boolean>(true);

  imgWidth:number = 210;
  imgHeight:number = 350;

  // For star highlight component input to display highlighted stars in review mode
  reviewRating = computed(() => this.currentReview().rating);

  constructor(
    private _tmdbService: TmdbService,
    public dialog: MatDialog,
    private _reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    console.log('Component initialized with:', {
      movieOrTvSeries: this.movieOrTvSeries,
      tmdbId: this.tmdbId,
      review_id: this.review_id
    });
    this.getReview();
    this.getAndSetCardDetails();
    // this.setStarRating();
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
        console.log('Fetched movie details:', data);
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
      console.log('Fetched TV series details:', data);
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
    this.movieDetails.poster_path = `https://image.tmdb.org/t/p/w342` + this.movieDetails.poster_path;
  }

  /** Set TV Series Details */
  setTvSeriesCardPoster(): void {
    // this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.tvSeriesDetails.poster_path;
    this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/w342` + this.tvSeriesDetails.poster_path;
  }

  /** Get Review from MongoDB service */
  private getReview(): void {
    switch(this.movieOrTvSeries) {
      case "MOVIES":
        this._reviewService.getMovieReview(this.review_id)
        .subscribe(review => {
          console.log('Fetched movie review:', review);
          this.currentReview.set(review);
          this.loadingData.set(false);
        });
        break;
      case "TVSERIES":
        this._reviewService.getTVReview(this.review_id)
        .subscribe(review => {
          console.log('Fetched TV series review:', review);
          this.currentReview.set(review);
          this.loadingData.set(false);
        });
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
