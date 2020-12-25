import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Constants from '../../utils/Constants';
import {shadowStyle3} from '../../utils/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default class MoviePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {screenWidth: Dimensions.get('window').width};
  }

  renderPopupPoster = (poster_path = '/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg') => {
    let uri = `${Constants.IMAGE_BASE_URL}${poster_path}`;

    let imageHeight;
    Image.getSize(uri, (width, height) => {
      imageHeight =
        ((this.state.screenWidth * 70) / 100 - 20) * (height / width);

      this.setState({imageHeight: imageHeight});
    });

    return (
      <Image
        source={{uri: uri}}
        style={{
          width: '70%',
          height: this.state.imageHeight,
          borderRadius: 5,
          marginBottom: 10,
        }}></Image>
    );
  };

  renderPopupTitle = (title) => {
    if (title && title != '') {
      return (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            paddingVertical: 10,
            width: '80%',
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          {title}
        </Text>
      );
    }
  };

  renderPopupOverview = (overview) => {
    if (overview && overview != '') {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              paddingBottom: 10,
              width: '80%',
              textAlign: 'center',
              fontSize: 15,
            }}>
            {overview}
          </Text>
        </View>
      );
    }
  };

  renderPopupDate = (date) => {
    if (date && date != '')
      return (
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            padding: 10,
            paddingTop: 0,
          }}>
          <Text style={{textAlign: 'right'}}>{`released at : ${date}`}</Text>
        </View>
      );
  };

  renderPopupCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={this.props.onClosePopup}
        style={{
          right: 10,
          top: 10,
          position: 'absolute',
          zIndex: 2,
          ...shadowStyle3,
        }}>
        <Ionicons name="close-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      allMoviesData,
      pressedMovieIndex,
      showPopup,
      onClosePopup,
    } = this.props;

    let item = allMoviesData[pressedMovieIndex];
    const {title, poster_path, overview, release_date} = item;

    return (
      <Modal
        isVisible={showPopup}
        onBackdropPress={onClosePopup}
        onSwipeComplete={onClosePopup}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#FFF',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <ScrollView
            contentContainerStyle={{
              width: '100%',

              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{width: '100%'}}>
            {this.renderPopupCloseButton()}

            <View style={{flexDirection: 'row'}}>
              {this.renderPopupTitle(title)}
            </View>
            {this.renderPopupPoster(poster_path)}

            {this.renderPopupOverview(overview)}
            {this.renderPopupDate(release_date)}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}
