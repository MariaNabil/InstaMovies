import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {GetAllMovies} from '../../Services/MoviesServices';
import ItemSeprator from '../../partialComponents/ItemSeprator';
import AllMoviesListItem from './AllMoviesListItem';
import MoviePopup from './MoviePopup';
import MyMoviesListItem from './MyMoviesListItem';
import Constants from '../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        ListHeaderComponent={() => this.renderHeader('All Movies')}
        ListHeaderComponentStyle={{marginBottom: -10}}
        data={allMoviesData}
        keyExtractor={({id}) => `${id}`}
        ItemSeparatorComponent={() => <ItemSeprator />}
        renderItem={this.renderAllMoviesListItem}></FlatList>
    );
  };

  renderMyMoviesListItem = ({item, index}) => {
    return (
      <MyMoviesListItem
        item={item}
        index={index}
        onPress={this.onPressExpand}
      />
    );
  };

  renderHeader = (title) => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          alignSelf: 'stretch',
        }}>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderMyMoviesList = () => {
    const {allMoviesData} = this.state;

    return (
      <FlatList
        horizontal={true}
        style={{marginHorizontal: 10, marginBottom: 10}}
        data={allMoviesData}
        keyExtractor={({id}) => `${id}`}
        ItemSeparatorComponent={() => (
          <View style={{marginHorizontal: 5}}></View>
        )}
        renderItem={this.renderMyMoviesListItem}></FlatList>
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

  renderAddIcon = () => {
    return (
      <TouchableOpacity style={{padding: 10}}>
        <Ionicons name="add-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {this.renderHeader('My Movies')}
            {this.renderAddIcon()}
          </View>
          {this.renderMyMoviesList()}
          <View
            style={{
              backgroundColor: Constants.GRAY_COLOR,
              height: 3,
              width: '100%',
            }}
          />
          {this.renderAllMoviesList()}
          {this.renderMoviePopup()}
        </ScrollView>
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
