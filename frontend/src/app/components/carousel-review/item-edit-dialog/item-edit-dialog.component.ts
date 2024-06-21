import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MovieDetails } from '../../../models/movie-details';
import { TVSeriesDetails } from '../../../models/tvseries-details';
import { TmdbService } from '../../../services/tmdb.service';
import { ReviewService } from '../../../services/review.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { CarouselReviewDialogData } from '../../../models/carousel-review-dialog-data';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-item-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StarRatingComponent,
  ],
  templateUrl: './item-edit-dialog.component.html',
  styleUrl: './item-edit-dialog.component.css'
})
export class ItemEditDialogComponent implements OnInit {

  // Checks if data is loaded, if not displays loading spinner component
  loadingData: boolean = true;

  // For data and display
  movieDetails: MovieDetails;
  tvSeriesDetails: TVSeriesDetails;
  genreList: string = "";
  currentMovieReview$ = {} as WritableSignal<Review>;
  currentTVSeriesReview$ = {} as WritableSignal<Review>;

  // For star highlight component input to display highlighted stars in review mode
  reviewRating: number = 0;

  reviewForm  = new FormGroup({
    category: new FormControl<string>({value: "", disabled: false}),
    rating: new FormControl<number>({value: 0, disabled: false}, [Validators.required, Validators.pattern(/^-?(0|[1-5]\d*)?$/)]),
    review: new FormControl<string>({value: "", disabled: false}, [Validators.required]),
    tmdbId: new FormControl<number>({value: 0, disabled: false}),
  });

  constructor(
    private _dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarouselReviewDialogData,
    public dialog: MatDialog,
    private _tmdbService: TmdbService,
    private _reviewService: ReviewService
  ) {}

  /** Get movie/tvseries details and review details to populate component */
  ngOnInit(): void {
    this.setDialogSize();
    this.getAndSetCardDetails();
    this.getReview();
    this.setReviewStarRating();
    this.setReviewReview();
    this.loadingData = false;
  }

  /** Sets Dialog size */
  setDialogSize(): void {
    this._dialogRef.updateSize("1050px", "500px");
  }

  /** Get and set Card Details */
  getAndSetCardDetails(): void {
    switch(this.data.movieOrTvSeries) {
      case "MOVIES":
        this.getMovieDetails();
        break;
      case "TVSERIES":
        this.getTvSeriesDetails();
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Get Movie Details */
  getMovieDetails(): void {
    this._tmdbService.getMovieDetails(this.data.tmdbId)
    .subscribe(
      data => {
        this.movieDetails = {...data};
        this.setMovieDetails();
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set Movie Details */
  setMovieDetails(): void {
    // Set Poster Path
    this.movieDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.movieDetails.poster_path;
    // Set Genre List
    for(let genreId of this.movieDetails.genres) {
      this.genreList += genreId.name + " ";
    }
  }

  /** Get TV Series Details */
  getTvSeriesDetails(): void {
    this._tmdbService.getTVSeriesDetails(this.data.tmdbId)
    .subscribe(
      data => {
      this.tvSeriesDetails = {...data};
      this.setTvSeriesCardDetails();
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set TV Series Details */
  setTvSeriesCardDetails(): void {
    this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.tvSeriesDetails.poster_path;
    // Set Genre List
    for(let genreId of this.tvSeriesDetails.genres) {
      this.genreList += genreId.name + " ";
    }
  }

  /** Get review data */
  getReview(): void {
    switch(this.data.movieOrTvSeries) {
      case "MOVIES":
        this._reviewService.getMovieReview(this.data.review_id);
        this.currentMovieReview$ = this._reviewService.review$;
        break;
      case "TVSERIES":
        this._reviewService.getTVReview(this.data.review_id);
        this.currentTVSeriesReview$ = this._reviewService.review$;
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Sets rating value from the star-rating component */
  setReviewStarRating(): void {
    switch(this.data.movieOrTvSeries) {
      case "MOVIES":
        if (this.currentMovieReview$() != undefined) {
          this.reviewRating = this.currentMovieReview$().rating;
        }
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

  setRating(rating: number): void {
    // for star highlight
    this.reviewRating = rating;
    // for form
    this.reviewForm.controls['rating'].setValue(rating);
  }

  /** Get review data and sets it */
  setReviewReview(): void {
    switch(this.data.movieOrTvSeries) {
      case "MOVIES":
        if (this.currentMovieReview$() != undefined) {
          this.reviewForm.controls['review'].setValue(this.currentMovieReview$().review);
        }
        break;
      case "TVSERIES":
        if(this.currentTVSeriesReview$() != undefined) {
          this.reviewForm.controls['review'].setValue(this.currentTVSeriesReview$().review);
        }
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Submits review to database */
  onEditReview(): void {
    if (this.reviewForm.valid) {
      switch(this.data.movieOrTvSeries) {
        case "MOVIES":
          let newMovieRating = this.reviewForm.value.rating || 0;
          let newMovieReview = this.reviewForm.value.review || "";
          // this._reviewsService.editReview(this.data.tmdbId, newMovieRating, newMovieReview);
          this._dialogRef.close();
          break;
        case "TVSERIES":
          let newTVSeriesRating = this.reviewForm.value.rating || 0;
          let newTVSeriesReview = this.reviewForm.value.review || "";
          // this._reviewsService.editReview(this.data.tmdbId, newTVSeriesRating, newTVSeriesReview);
          this._dialogRef.close();
          break;
        default:
          console.log("Movie or Tvseries Error");
          break;
      }
    }
  }

  /** Delete Review */
  onDeleteReview(): void {
    switch(this.data.movieOrTvSeries) {
      case "MOVIES":
        // this._reviewsService.deleteReview(this.data.tmdbId);
        this._dialogRef.close();
        break;
      case "TVSERIES":
        // this._reviewsService.deleteReview(this.data.tmdbId);
        this._dialogRef.close();
        break;
      default:
        console.log("Movie or Tvseries Error");
        break;
    }
  }

  /** Closes Dialog */
  onCloseDialog(): void {
    this._dialogRef.close();
  }
}

