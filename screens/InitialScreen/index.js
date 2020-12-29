import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {GetAllMovies} from '../../Services/MoviesServices';
import AllMoviesListItem from './AllMoviesListItem';
import MoviePopup from './MoviePopup';
import MyMoviesListItem from './MyMoviesListItem';
import Constants from '../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import {shadowStyle2, shadowStyle3} from '../../utils/Styles';

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Dimensions.get('window').width,
      showPopup: false,
      pressedMovieIndex: -1,
      isMyMoviePressed: false,
      total_pages: 0,
      page: 1,
      allMoviesData: [],
      loading: false,
      isScrollButtonShown: true,
      currentScroll: 0,
      showReloadButton: false,
      lockFetching: false,
      refreshAllMovies: false,
    };
  }

  fetchMovies = () => {
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        this.setState({
          loading: true,
          showReloadButton: false,
          lockFetching: true,
        });
        const {allMoviesData} = this.state;
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

  componentDidMount() {
    this.setState({showReloadButton: false});
    this.fetchMovies();
    Dimensions.addEventListener('change', () => {
      this.setState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
      });
    });
  }

  fetchNextPage = () => {
    this.setState({page: this.state.page + 1});
    this.fetchMovies();
  };

  componentWillUnmount() {
    this.cancelFetchData && this.cancelFetchData();
  }

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

  onPressExpand = (index) => {
    this.setState({
      showPopup: true,
      pressedMovieIndex: index,
      isMyMoviePressed: false,
    });
  };

  onPressMyMovie = (index) => {
    this.setState({
      showPopup: true,
      pressedMovieIndex: index,
      isMyMoviePressed: true,
    });
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

  renderFooterIndicator = () => {
    if (this.state.loading) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: 10,
          }}>
          <ActivityIndicator size="large" color={Constants.SECOND_COLOR} />
          <Text>{'Loading...'}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderAllMoviesList = () => {
    const {allMoviesData} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.renderFlatListHeaderComponent}
        ListFooterComponent={this.renderFooterIndicator}
        data={allMoviesData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderAllMoviesListItem}
        refreshing={this.state.refreshAllMovies}
        {...this.getPaginationProps()}></FlatList>
    );
  };

  renderMyMoviesListItem = ({item, index}) => {
    return (
      <MyMoviesListItem
        item={item}
        index={index}
        onPress={this.onPressMyMovie}
      />
    );
  };

  renderHeader = (title) => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          alignSelf: 'stretch',
          flex: 1,
        }}>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderMyMoviesFooter = () => {
    const imageSize = 110;
    return (
      <View>
        {global.MyMovies?.length == 1 ? (
          <TouchableOpacity
            style={{
              ...shadowStyle2,
              borderRadius: 5,
              backgroundColor: Constants.BACKGROUND_COLOR,
              margin: 5,
              marginTop: 0,
              width: this.state.screenWidth / 2 - 15,
              height: (this.state.screenWidth / 2 - 15) * 1.5 + 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Add Movie', {
                onSave: this.onReRender,
              });
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Add Movie', {
                  onSave: this.onReRender,
                });
              }}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
                backgroundColor: 'rgba(72, 74, 84, 0.1)',
              }}>
              <Ionicons name={`ios-add`} size={45} />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  handleScroll = (event) => {
    this.setState({currentScroll: event.nativeEvent.contentOffset.x});
  };

  incrementScroll = (increment_by_value) => {
    this.setState({
      currentScroll: this.state.currentScroll + increment_by_value,
    });
    this.listRef.scrollToOffset({offset: +increment_by_value});
  };

  onPressScroll = () => {
    this.incrementScroll(this.state.screenWidth / 2);
  };

  hideScrollButton = () => {
    this.setState({
      isScrollButtonShown: false,
    });
  };

  renderScrollButton = () => {
    if (global.MyMovies?.length > 2 && this.state.currentScroll == 0) {
      const width = 30;

      return (
        <TouchableOpacity
          onPress={this.onPressScroll}
          style={{
            position: 'absolute',
            right: 0,
            backgroundColor: 'transparent',
            top: 0,
            width,
            height: this.state.MyMoviesListHeight,
          }}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 0.0}}
            colors={[
              `rgba(0, 0, 0, 0.02)`,
              `rgba(0, 0, 0, 0.2)`,
              `rgba(0, 0, 0, 0.5)`,
            ]}
            style={{
              width,
              height: this.state.MyMoviesListHeight,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
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
  renderEmptyList = () => {
    return (
      <TouchableOpacity
        style={{
          width: this.state.screenWidth - 20,
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
          marginHorizontal: 5,
        }}
        onPress={() => {
          this.props.navigation.navigate('Add Movie', {
            onSave: this.onReRender,
          });
        }}>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingVertical: 5,
              textAlign: 'center',
            }}>
            {'Add Movies'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderMyMoviesList = () => {
    const {allMoviesData} = this.state;

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
        style={{
          marginHorizontal: 5,
          marginBottom: 10,
          marginTop: 5,
        }}
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

  onClosePopup = () => {
    this.setState({showPopup: false});
  };

  renderAddIcon = () => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => {
          this.props.navigation.navigate('Add Movie', {
            onSave: this.onReRender,
          });
        }}>
        <Ionicons name="add-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };

  renderReloadButton = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          alignSelf: 'stretch',
          marginTop: 10,
          marginHorizontal: 10,
        }}
        onPress={() => {
          this.setState({page: 1});
          this.fetchMovies();
        }}>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 15,
          }}>
          <Text
            style={{
              paddingVertical: 5,
              textAlign: 'center',
            }}>
            {'Reload'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  onReRender = (refresh) => {
    this.setState({
      refreshAllMovies: !this.state.refreshAllMovies,
    });
  };

  renderFlatListHeaderComponent = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.renderHeader('My Movies')}
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
        {this.renderHeader('All Movies')}
        {this.state.showReloadButton ? this.renderReloadButton() : null}
      </View>
    );
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
