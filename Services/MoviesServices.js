import { GET } from "../utils/Networks"

export const GetAllMovies = (page, onSuccess, onFailure) => {
  return GET(
    `3/discover/movie?page=${page}`,
    (res) => {
      onSuccess && onSuccess(res);
    },
    (err) => {
      // Do something special if this request fails or ignore
      onFailure && onFailure(err);
    }
  );
};
