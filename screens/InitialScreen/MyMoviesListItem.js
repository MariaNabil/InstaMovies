import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Constants from '../../utils/Constants';

export default class MyMoviesListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {screenWidth: Dimensions.get('window').width};
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
              paddingBottom: 5,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      );
    } else return null;
  };

  renderPoster = (poster_path = '/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg') => {
    let uri = `${Constants.IMAGE_BASE_URL}${poster_path}`;

    let imageWidth = this.state.screenWidth / 2 - 15;
    let imageHeight = imageWidth * 1.5;
    return (
      <Image
        source={{uri: uri}}
        style={{
          width: null,
          width: imageWidth,
          height: imageHeight,
          borderRadius: 5,
        }}></Image>
    );
  };

  render() {
    const {item, index} = this.props;
    const {title, poster_path} = item;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(index)}>
        {this.renderTitle(title)}

        {this.renderPoster(poster_path)}
      </TouchableOpacity>
    );
  }
}
