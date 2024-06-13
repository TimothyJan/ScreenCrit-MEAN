import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { StarRatingComponent } from '../../star-rating/star-rating.component';

import { TmdbService } from '../../../services/tmdb.service';
import { ReviewService } from '../../../services/review.service';

import { MovieDetails } from '../../../models/movie-details';
import { TVSeriesDetails } from '../../../models/tvseries-details';
import { Review } from '../../../models/review';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CarouselDialogData } from '../../../models/carousel-dialog-data';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StarRatingComponent
  ],
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.css'
})
export class ItemDialogComponent implements OnInit{

  // Checks if data is loaded, if not displays loading spinner component
  loadingData: boolean = true;

  // For data and display
  movieDetails: MovieDetails;
  tvSeriesDetails: TVSeriesDetails;
  genreList: string = "";

  // For star highlight component input to display highlighted stars in review mode
  reviewRating: number = 0;

  reviewForm  = new FormGroup({
    category: new FormControl<string>({value: "", disabled: false}),
    rating: new FormControl<number>({value: 0, disabled: false}, [Validators.required, Validators.pattern(/^-?(0|[1-5]\d*)?$/)]),
    review: new FormControl<string>({value: "", disabled: false}, [Validators.required]),
    tmdbId: new FormControl<number>({value: 0, disabled: false}),
  });

  constructor(
    private _dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarouselDialogData,
    public dialog: MatDialog,
    private _tmdbService: TmdbService,
    private router: Router,
    private _reviewService: ReviewService
  ) {}

  /** Get movie/tvseries details and review details to populate component */
  ngOnInit(): void {
    this.setDialogSize();
    this.getAndSetCardDetails();
  }

  /** Sets dialog size */
  setDialogSize():void {
    this._dialogRef.updateSize("1050px", "500px");
  }

  /** Get and set Card Details */
  getAndSetCardDetails(): void {
    switch(this.data.movieOrTvSeries) {
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

  /** Get Movie Details */
  getAndSetMovieDetails(): void {
    this._tmdbService.getMovieDetails(this.data.tmdbId)
    .subscribe(
      data => {
        this.movieDetails = {...data};
        this.setMovieDetails();
        this.loadingData = false;
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
  getAndSetTvSeriesDetails(): void {
    this._tmdbService.getTVSeriesDetails(this.data.tmdbId)
    .subscribe(
      data => {
      this.tvSeriesDetails = {...data};
      this.setTvSeriesCardDetails();
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
    // Set Genre List
    for(let genreId of this.tvSeriesDetails.genres) {
      this.genreList += genreId.name + " ";
    }
  }

  /** Sets rating value from the star-rating component */
  setRating(rating: number): void {
    // for star highlight
    this.reviewRating = rating;
    // for form
    this.reviewForm.controls['rating'].setValue(rating);
  }

  /** Submits review to database */
  onCreateReview(): void {
    if (this.reviewForm.valid) {
      switch(this.data.movieOrTvSeries) {
        case "MOVIES":
          let newMovieReview = new Review(
            "MOVIES",
            this.reviewForm.controls["rating"].value as number,
            this.reviewForm.controls["review"].value as string,
            this.data.tmdbId,
          );
          this._reviewService.createMovieReview(newMovieReview).subscribe({
            next: () => {
              // this.router.navigate(['/']);
              alert('Review Created!');
            },
            error: (error) => {
              alert('Failed to create employee...');
              console.error(error);
            },
          });
          this._dialogRef.close();
          break;
        case "TVSERIES":
          let newTVSeriesReview = new Review(
            "TVSERIES",
            this.reviewForm.controls["rating"].value as number,
            this.reviewForm.controls["review"].value as string,
            this.data.tmdbId
          );
          this._reviewService.createTVReview(newTVSeriesReview).subscribe({
            next: () => {
              // this.router.navigate(['/']);
              alert('Review Created!');
            },
            error: (error) => {
              alert('Failed to create employee...');
              console.error(error);
            },
          });
          this._dialogRef.close();
          break;
        default:
          console.log("Movie or Tvseries Error");
          break;
      }
    }
  }

  /** Closes Dialog */
  onCloseDialog(): void {
    this._dialogRef.close();
  }
}

