import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { TmdbService } from '../../../services/tmdb.service';
import { MovieDetails } from '../../../models/movie-details';
import { TVSeriesDetails } from '../../../models/tvseries-details';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { TitlePipe } from '../../../pipes/title.pipe';
import { NgOptimizedImage } from '@angular/common';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    TitlePipe,
    NgOptimizedImage,
    ItemDialogComponent,
    MatDialogModule
  ],
  templateUrl: './carousel-item.component.html',
  styleUrl: './carousel-item.component.css'
})
export class CarouselItemComponent implements OnInit {
  @Input() id: number = 0;
  @Input() movieOrTvSeries: string = ""; // MOVIES or TVSERIES****
  movieDetails: MovieDetails;
  tvSeriesDetails: TVSeriesDetails;
  loadingData: boolean = true;

  constructor(
    private _tmdbService: TmdbService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    switch(this.movieOrTvSeries) {
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
    this._tmdbService.getMovieDetails(this.id)
    .subscribe(
      data => {
        this.movieDetails = {...data};
        this.setMovieCardDetails();
        this.loadingData = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Set Movie details */
  setMovieCardDetails(): void {
    // this.movieDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.movieDetails.poster_path;
    this.movieDetails.poster_path = `https://image.tmdb.org/t/p/w500/` + this.movieDetails.poster_path;
  }

  /** Get TV Series Details */
  getTvSeriesDetails(): void {
    this._tmdbService.getTVSeriesDetails(this.id)
    .subscribe(
      data => {
      // console.log(data);
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
    // this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/original/` + this.tvSeriesDetails.poster_path;
    this.tvSeriesDetails.poster_path = `https://image.tmdb.org/t/p/w500/` + this.tvSeriesDetails.poster_path;
  }

  /** Open Dialog */
  openDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      data: {
        id: this.id,
        movieOrTvSeries: this.movieOrTvSeries
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
