export default class Movie {
  constructor(
    id,
    title,
    poster_path,
    overview,
    release_date,
    is_remote = true,
  ) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.is_remote = is_remote;
    this.overview = overview;
    this.release_date = release_date;
  }
}
