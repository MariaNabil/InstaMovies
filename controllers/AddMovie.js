import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {exp} from 'react-native/Libraries/Animated/src/Easing';
import Movie from '../model/Movie';

export default function AddMovie(props) {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [release_date, setReleaseDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image_uri, setImageUri] = useState(null);

  // Validate That Each Movie Has Poster, Title, Overview And release Date
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

  //Save New Movie In global array of Movie "MyMovies"
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

    //If there is saved movies in MyMovies
    if (global.MyMovies) {
      global.MyMovies.push(movie);
    } else {
      //If this is th first item in MyMovies
      global.MyMovies = [movie];
    }
    //Go To The InitialScreen and ReRender MyMovies List
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
