import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import Movie from '../model/Movie';

export default function AddMovie(props) {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [release_date, setReleaseDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image_uri, setImageUri] = useState(null);

  const inputValidation = () => {
    if (!image_uri) {
      Toast.show('Please Choose A Movie Poster', Toast.LONG);
      return false;
    } else if (!title || title == '') {
      Toast.show('Please Enter A Title', Toast.LONG);
      return false;
    } else if (!overview || overview == '') {
      Toast.show('Please Enter An Overview', Toast.LONG);
      return false;
    } else if (!release_date) {
      Toast.show('Please Enter A Release Date', Toast.LONG);
      return false;
    }
    return true;
  };

  const saveMovie = () => {
    if (!inputValidation()) return;
    let movie = new Movie(
      (id = global.MyMovies ? global.MyMovies.length : 0),
      title,
      (poster_path = image_uri),
      overview,
      release_date,
      (is_remote = false),
    );

    if (global.MyMovies) {
      global.MyMovies.push(movie);
    } else {
      global.MyMovies = [movie];
    }
    props.route.params?.onSave && props.route.params?.onSave();
    props.navigation.goBack();
  };

  const PresentationalComponent = require('../screens/AddMovie/AddMovie')
    .default;

  return (
    <PresentationalComponent
      inputValidation={inputValidation}
      setTitle={setTitle}
      setOverview={setOverview}
      setReleaseDate={setReleaseDate}
      setImageUri={setImageUri}
      setShowDatePicker={setShowDatePicker}
      title={title}
      overview={overview}
      release_date={release_date}
      image_uri={image_uri}
      showDatePicker={showDatePicker}
      saveMovie={saveMovie}
    />
  );
}
