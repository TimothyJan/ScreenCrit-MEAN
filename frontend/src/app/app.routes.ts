import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { TvseriesComponent } from './components/pages/tvseries/tvseries.component';
import { ReviewsComponent } from './components/pages/reviews/reviews.component';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvseries', component: TvseriesComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  // redirect to `home` if there is no path
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
