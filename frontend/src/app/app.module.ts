import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TitleComponent } from './components/title/title.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReviewsComponent } from './components/pages/reviews/reviews.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { TVSeriesComponent } from './components/pages/tvseries/tvseries.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CarouselItemComponent } from './components/carousel/carousel-item/carousel-item.component';
import { TitlePipe } from './pipes/title.pipe';
import { SearchComponent } from './components/search/search.component';
import { ItemDialogComponent } from './components/carousel/item-dialog/item-dialog.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CarouselReviewItemComponent } from './components/carousel/carousel-review-item/carousel-review-item.component';
import { ItemEditDialogComponent } from './components/carousel/item-edit-dialog/item-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TitleComponent,
    FooterComponent,
    ReviewsComponent,
    LoginComponent,
    HomeComponent,
    MoviesComponent,
    TVSeriesComponent,
    CarouselComponent,
    LoadingSpinnerComponent,
    CarouselItemComponent,
    TitlePipe,
    SearchComponent,
    ItemDialogComponent,
    StarRatingComponent,
    CarouselReviewItemComponent,
    ItemEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
