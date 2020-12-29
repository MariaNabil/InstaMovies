import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Constants from '../../../utils/Constants';
import {shadowStyle2} from '../../../utils/Styles';

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
          <Text numberOfLines={1} style={styles.titleTextStyle}>
            {title}
          </Text>
        </View>
      );
    } else return null;
  };

  renderPoster = (poster_path) => {
    return (
      <FastImage
        source={{uri: poster_path, priority: FastImage.priority.high}}
        style={[
          {
            width: this.imageWidth,
            height: this.imageHeight,
          },
          styles.posterStyle,
        ]}></FastImage>
    );
  };

  render() {
    const {item, index} = this.props;
    const {title, image_uri} = item;

    this.imageWidth = this.state.screenWidth / 2 - 15;
    this.imageHeight = this.imageWidth * 1.5;

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.contentStyle}
          onPress={() => this.props.onPress(index)}>
          {this.renderPoster(image_uri)}
          {this.renderTitle(title)}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 5,
    textAlign: 'center',
  },
  posterStyle: {borderRadius: 5},
  contentStyle: {
    ...shadowStyle2,
    borderRadius: 5,
    backgroundColor: Constants.BACKGROUND_COLOR,
    margin: 5,
    marginTop: 0,
  },
});
