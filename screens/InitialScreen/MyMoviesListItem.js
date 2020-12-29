import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Constants from '../../utils/Constants';
import {shadowStyle2, shadowStyle3} from '../../utils/Styles';

export default class MyMoviesListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {screenWidth: Dimensions.get('window').width};
  }

  componentDidMount() {
    //re render when change orientation
    Dimensions.addEventListener('change', () => {
      this.setState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
      });
    });
  }

  renderTitle = (title) => {
    if (title) {
      return (
        <View
          style={{
            width: this.state.screenWidth / 2 - 15,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              paddingVertical: 5,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      );
    } else return null;
  };

  renderPoster = (poster_path = '/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg') => {
    // let uri = `${Constants.IMAGE_BASE_URL}${poster_path}`;

    console.log('renderPoster', poster_path);
    // let imageWidth =
    //   global.MyMovies?.length == 1
    //     ? this.state.screenWidth - 20
    //     : this.state.screenWidth / 2 - 15;

    let imageWidth = this.state.screenWidth / 2 - 15;
    let imageHeight =
      global.MyMovies?.length == 1
        ? (this.state.screenWidth / 2 - 15) * 1.5
        : imageWidth * 1.5;
    return (
      <FastImage
        source={{uri: poster_path, priority: FastImage.priority.high}}
        style={{
          width: imageWidth,
          height: imageHeight,
          borderRadius: 5,
        }}></FastImage>
    );
  };

  render() {
    const {item, index} = this.props;
    const {title, poster_path, image_uri} = item;
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onLayout={(e) => {
            this.setState({
              y: e.nativeEvent.layout.y,
            });
          }}
          style={{
            ...shadowStyle2,
            borderRadius: 5,
            backgroundColor: Constants.BACKGROUND_COLOR,
            margin: 5,
            marginTop: 0,
          }}
          onPress={() => this.props.onPress(index)}>
          {this.renderPoster(image_uri)}
          {this.renderTitle(title)}
        </TouchableOpacity>
      </View>
    );
  }
}
