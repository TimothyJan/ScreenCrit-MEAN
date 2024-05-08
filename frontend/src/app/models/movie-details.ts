import { Genre } from "./genre";
import { ProductionCompany } from "./production-company";
import { ProductionCountry } from "./production-country";
import { Language } from "./language";

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
