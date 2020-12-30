import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {GetAllMovies} from '../../Services/MoviesServices';
import MoviePopup from './MoviePopup';
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import MyMovies from './MyMovies';
import AllMovies from './AllMovies';

export default function InitialScreen(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [pressedMovieIndex, setPressedMovieIndex] = useState(0);
  const [isMyMoviePressed, setIsMyMoviePressed] = useState(false);
  const [total_pages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [allMoviesData, setAllMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const [lockFetching, setLockFetching] = useState(false);
  let cancelFetchData;

  useEffect(() => {
    fetchMovies();
    return () => {
      cancelFetchData && cancelFetchData();
    };
  }, []);

  const fetchMovies = async (page = 1) => {
    //Check The Internet Connection Before Fetching All Movies
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        setLoading(true);
        setShowReloadButton(false);
        setLockFetching(true);
        cancelFetchData = GetAllMovies(
          page,
          (res) => {
            setAllMoviesData([...allMoviesData, ...res.data.results]);
            setTotalPages(res.data.total_pages);
            setLoading(false);
            setLockFetching(false);
          },
          (error) => {
            setLoading(false);
            setLockFetching(false);
          },
        );
      } else {
        // If Not Connected To the Internet
        Toast.show(
          'You Are Offline , Please Check Your Internet Connection',
          Toast.LONG,
        );
        setShowReloadButton(true);
      }
    });
  };

  const fetchNextPage = () => {
    setPage(page + 1);
    fetchMovies(page + 1);
  };

  const onPressMyMovie = (index) => {
    setShowPopup(true);
    setPressedMovieIndex(index);
    setIsMyMoviePressed(true);
  };

  const onPressExpand = (index) => {
    setShowPopup(true);
    setPressedMovieIndex(index);
    setIsMyMoviePressed(false);
  };

  const onClosePopup = () => {
    setShowPopup(false);
  };

  //Called To Reload All Movies If The Internet Connection Had a Problem
  const onReload = () => {
    setPage(1);
    fetchMovies();
  };

  //Get Pagination Props Of All Movies List
  const getPaginationProps = () => {
    return {
      onEndReachedThreshold: 1,
      onEndReached: () => {
        if (page != total_pages && !lockFetching) {
          fetchNextPage();
        }
      },
    };
  };

  const renderTopScreen = () => {
    return (
      <View>
        <MyMovies
          navigation={props.navigation}
          onPressMyMovie={onPressMyMovie}></MyMovies>
        {renderAllMoviesHeader()}
        {showReloadButton ? renderReloadButton() : null}
      </View>
    );
  };

  const renderAllMoviesHeader = () => {
    return (
      <View style={styles.allMoviesHeaderStyle}>
        <Text style={styles.allMoviesHeaderTextStyle}>{'All Movies'}</Text>
      </View>
    );
  };

  const renderAllMoviesList = () => {
    return (
      <AllMovies
        renderTopScreen={renderTopScreen}
        allMoviesData={allMoviesData}
        loading={loading}
        getPaginationProps={getPaginationProps}
        onPressExpand={onPressExpand}></AllMovies>
    );
  };

  const renderReloadButton = () => {
    return (
      <TouchableOpacity style={styles.reloadButtonStyle} onPress={onReload}>
        <View style={styles.reloadButtonViewStyle}>
          <Text style={styles.reloadButtonTextStyle}>{'Reload'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMoviePopup = () => {
    if (showPopup) {
      return (
        <MoviePopup
          allMoviesData={isMyMoviePressed ? global.MyMovies : allMoviesData}
          pressedMovieIndex={pressedMovieIndex}
          showPopup={showPopup}
          onClosePopup={onClosePopup}
          isMyMoviePressed={isMyMoviePressed}></MoviePopup>
      );
    } else return null;
  };

  return (
    <View style={styles.container}>
      {renderAllMoviesList()}
      {renderMoviePopup()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  allMoviesHeaderStyle: {marginHorizontal: 10, alignSelf: 'stretch', flex: 1},
  allMoviesHeaderTextStyle: {paddingTop: 10, fontSize: 20, fontWeight: 'bold'},
  reloadButtonStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    marginHorizontal: 10,
  },
  reloadButtonViewStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
  },
  reloadButtonTextStyle: {paddingVertical: 5, textAlign: 'center'},
});
