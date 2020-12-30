import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {shadowStyle2} from '../../../utils/Styles';
import MyMoviesListItem from './MyMoviesListItem';
import Constants from '../../../utils/Constants';

export default class MyMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Dimensions.get('window').width,
      currentScroll: 0,
      isScrollButtonShown: false,
      MyMoviesListHeight: 0,
    };
  }

  //re render when change orientation
  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
      });
    });
  }

  //ReRender My Movies List When Adding New Movie
  onReRender = () => {
    this.setState({});
  };

  //Go To Add Movie Screen
  goToAddMovie = () => {
    this.props.navigation.navigate('Add Movie', {
      onSave: this.onReRender,
    });
  };

  //Set currentScroll Horizontal Position
  handleScroll = (event) => {
    this.setState({currentScroll: event.nativeEvent.contentOffset.x});
  };

  //Scroll To The Next Movie When Pressing On Scroll Button
  incrementScroll = (increment_by_value) => {
    this.setState({
      currentScroll: this.state.currentScroll + increment_by_value,
    });
    this.listRef.scrollToOffset({offset: +increment_by_value});
  };

  onPressScroll = () => {
    this.incrementScroll(this.state.screenWidth / 2);
  };

  renderMyMoviesListItem = ({item, index}) => {
    return (
      <MyMoviesListItem
        item={item}
        index={index}
        onPress={this.props.onPressMyMovie}
      />
    );
  };

  renderMyMoviesFooter = () => {
    return (
      <View>
        {global.MyMovies?.length == 1 ? (
          <TouchableOpacity
            style={[
              styles.myMoviesFooterStyle,
              {
                width: this.state.screenWidth / 2 - 15,
                height: (this.state.screenWidth / 2 - 15) * 1.5 + 30,
              },
            ]}
            onPress={this.goToAddMovie}>
            <TouchableOpacity
              onPress={this.goToAddMovie}
              style={styles.myMoviesFooterCircleStyle}>
              <Ionicons name={`ios-add`} size={45} />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  renderEmptyList = () => {
    return (
      <TouchableOpacity
        style={[
          {
            width: this.state.screenWidth - 20,
          },
          styles.emptyListStyle,
        ]}
        onPress={this.goToAddMovie}>
        <View style={styles.emptyListViewStyle}>
          <Text style={styles.addMoviesButtonTextStyle}>{'Add Movies'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderScrollButton = () => {
    if (global.MyMovies?.length > 2 && this.state.currentScroll == 0) {
      return (
        <TouchableOpacity
          onPress={this.onPressScroll}
          style={[
            {
              height: this.state.MyMoviesListHeight,
            },
            styles.scrollButtonStyle,
          ]}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 0.0}}
            colors={[
              `rgba(0, 0, 0, 0.02)`,
              `rgba(0, 0, 0, 0.2)`,
              `rgba(0, 0, 0, 0.5)`,
            ]}
            style={[
              {
                height: this.state.MyMoviesListHeight,
              },
              styles.scrollButtonGradientStyle,
            ]}>
            <MaterialIcons
              name={`arrow-forward-ios`}
              size={22}
              color={'white'}
            />
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };

  renderMyMoviesList = () => {
    return (
      <FlatList
        onLayout={(e) => {
          this.setState({
            MyMoviesListHeight: e.nativeEvent.layout.height,
            MyMoviesListWidth: e.nativeEvent.layout.width,
          });
        }}
        ListFooterComponent={this.renderMyMoviesFooter}
        horizontal={true}
        style={styles.myMoviesListStyle}
        data={global.MyMovies}
        keyExtractor={({id}) => `${id}`}
        renderItem={({item, index}) =>
          this.renderMyMoviesListItem({item, index})
        }
        ListEmptyComponent={this.renderEmptyList}
        ref={(ref) => (this.listRef = ref)}
        onScroll={this.handleScroll}></FlatList>
    );
  };

  renderMyMoviesHeader = () => {
    return (
      <View style={styles.myMoviesHeaderStyle}>
        <Text style={styles.myMoviesHeaderTextStyle}>{'My Movies'}</Text>
      </View>
    );
  };

  renderAddIcon = () => {
    return (
      <TouchableOpacity
        style={styles.addIconStyle}
        onPress={() => {
          this.props.navigation.navigate('Add Movie', {
            onSave: this.onReRender,
          });
        }}>
        <Ionicons name="add-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <View style={styles.containerStyle}>
          {this.renderMyMoviesHeader('My Movies')}
          {global.MyMovies &&
          global.MyMovies.length != 0 &&
          global.MyMovies.length != 1
            ? this.renderAddIcon()
            : null}
        </View>
        <View>
          {this.renderMyMoviesList()}
          {this.renderScrollButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myMoviesFooterStyle: {
    ...shadowStyle2,
    borderRadius: 5,
    backgroundColor: Constants.BACKGROUND_COLOR,
    margin: 5,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myMoviesFooterCircleStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    backgroundColor: 'rgba(72, 74, 84, 0.1)',
  },
  emptyListStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },
  emptyListViewStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoviesButtonTextStyle: {paddingVertical: 5, textAlign: 'center'},
  scrollButtonStyle: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent',
    top: 0,
    width: 30,
  },
  scrollButtonGradientStyle: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  myMoviesListStyle: {marginHorizontal: 5, marginBottom: 10, marginTop: 5},
  myMoviesHeaderStyle: {marginHorizontal: 10, alignSelf: 'stretch', flex: 1},
  myMoviesHeaderTextStyle: {paddingTop: 10, fontSize: 20, fontWeight: 'bold'},
  addIconStyle: {paddingHorizontal: 10, paddingTop: 10},
  containerStyle: {flexDirection: 'row', justifyContent: 'space-between'},
});
