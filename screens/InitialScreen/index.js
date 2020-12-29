import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import {GetAllMovies} from '../../Services/MoviesServices';
import MoviePopup from './MoviePopup';
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import MyMovies from './MyMovies';
import AllMovies from './AllMovies';

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      pressedMovieIndex: -1,
      isMyMoviePressed: false,
      total_pages: 0,
      page: 1,
      allMoviesData: [],
      loading: false,
      showReloadButton: false,
      lockFetching: false,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentWillUnmount() {
    this.cancelFetchData && this.cancelFetchData();
  }

  fetchMovies = () => {
    //Check The Internet Connection Before Fetching All Movies
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        this.setState({
          loading: true,
          showReloadButton: false,
          lockFetching: true,
        });
        this.cancelFetchData = GetAllMovies(
          this.state.page,
          (res) => {
            this.setState({
              allMoviesData: [...this.state.allMoviesData, ...res.data.results],
              total_pages: res.data.total_pages,
              loading: false,
              lockFetching: false,
            });
          },
          (error) => {
            this.setState({
              loading: false,
              lockFetching: false,
            });
          },
        );
      } else {
        Toast.show(
          'You Are Offline , Please Check Your Internet Connection',
          Toast.LONG,
        );
        this.setState({showReloadButton: true});
      }
    });
  };

  fetchNextPage = () => {
    this.setState({page: this.state.page + 1});
    this.fetchMovies();
  };

  onPressMyMovie = (index) => {
    this.setState({
      showPopup: true,
      pressedMovieIndex: index,
      isMyMoviePressed: true,
    });
  };

  onPressExpand = (index) => {
    this.setState({
      showPopup: true,
      pressedMovieIndex: index,
      isMyMoviePressed: false,
    });
  };

  onClosePopup = () => {
    this.setState({showPopup: false});
  };

  onReRender = () => {
    this.setState({});
  };

  onReload = () => {
    this.setState({page: 1});
    this.fetchMovies();
  };
  //Get Pagination Props Of All Movies List
  getPaginationProps = () => {
    return {
      onEndReachedThreshold: 1,
      onEndReached: () => {
        if (
          this.state.page != this.state.total_pages &&
          !this.state.lockFetching
        ) {
          this.fetchNextPage();
        }
      },
    };
  };

  renderTopScreen = () => {
    return (
      <View>
        <MyMovies
          navigation={this.props.navigation}
          onPressMyMovie={this.onPressMyMovie}></MyMovies>
        {this.renderAllMoviesHeader()}
        {this.state.showReloadButton ? this.renderReloadButton() : null}
      </View>
    );
  };

  renderAllMoviesHeader = () => {
    return (
      <View style={styles.allMoviesHeaderStyle}>
        <Text style={styles.allMoviesHeaderTextStyle}>{'All Movies'}</Text>
      </View>
    );
  };

  renderAllMoviesList = () => {
    return (
      <AllMovies
        renderTopScreen={this.renderTopScreen}
        allMoviesData={this.state.allMoviesData}
        loading={this.state.loading}
        getPaginationProps={this.getPaginationProps}
        onPressExpand={this.onPressExpand}></AllMovies>
    );
  };

  renderReloadButton = () => {
    return (
      <TouchableOpacity
        style={styles.reloadButtonStyle}
        onPress={this.onReload}>
        <View style={styles.reloadButtonViewStyle}>
          <Text style={styles.reloadButtonTextStyle}>{'Reload'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderMoviePopup = () => {
    const {
      showPopup,
      allMoviesData,
      isMyMoviePressed,
      pressedMovieIndex,
    } = this.state;
    if (showPopup) {
      return (
        <MoviePopup
          allMoviesData={isMyMoviePressed ? global.MyMovies : allMoviesData}
          pressedMovieIndex={pressedMovieIndex}
          showPopup={showPopup}
          onClosePopup={this.onClosePopup}
          isMyMoviePressed={isMyMoviePressed}></MoviePopup>
      );
    } else return null;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderAllMoviesList()}
        {this.renderMoviePopup()}
      </View>
    );
  }
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
