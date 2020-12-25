import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';

import {GetAllMovies} from '../../Services/MoviesServices';
import ItemSeprator from '../../partialComponents/ItemSeprator';
import AllMoviesListItem from './AllMoviesListItem';
import MoviePopup from './MoviePopup';

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Dimensions.get('window').width,
      showPopup: false,
      pressedMovieIndex: -1,
    };
  }

  componentDidMount() {
    this.cancelFetchData = GetAllMovies(1, (res) => {
      console.log('componentDidMount res', res.data.results);
      this.setState({
        allMoviesData: res.data.results,
      });
    });
  }

  componentWillUnmount() {
    this.cancelFetchData && this.cancelFetchData();
  }

  onPressExpand = (index) => {
    this.setState({showPopup: true, pressedMovieIndex: index});
  };

  renderAllMoviesListItem = ({item, index}) => {
    return (
      <AllMoviesListItem
        item={item}
        index={index}
        onPress={this.onPressExpand}
      />
    );
  };
  renderAllMoviesList = () => {
    const {allMoviesData} = this.state;
    return (
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={allMoviesData}
        keyExtractor={({id}) => `${id}`}
        ItemSeparatorComponent={() => <ItemSeprator />}
        renderItem={this.renderAllMoviesListItem}></FlatList>
    );
  };

  renderMoviePopup = () => {
    if (this.state.showPopup) {
      return (
        <MoviePopup
          allMoviesData={this.state.allMoviesData}
          pressedMovieIndex={this.state.pressedMovieIndex}
          showPopup={this.state.showPopup}
          onClosePopup={this.onClosePopup}></MoviePopup>
      );
    } else return null;
  };

  onClosePopup = () => {
    this.setState({showPopup: false});
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
});
