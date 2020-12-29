import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
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

  componentDidMount() {
    //re render when change orientation
    Dimensions.addEventListener('change', () => {
      this.setState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
      });
    });
  }

  renderPopupPoster = (poster_path) => {
    let uri = this.props.isMyMoviePressed
      ? poster_path
      : `${Constants.IMAGE_BASE_URL}${poster_path}`;

    let imageHeight;
    if (poster_path) {
      Image.getSize(uri, (width, height) => {
        imageHeight =
          ((this.state.screenWidth * 70) / 100 - 20) * (height / width);

        this.setState({imageHeight: imageHeight});
      });
    } else {
      this.setState({imageHeight: (this.state.screenWidth * 70) / 100 - 20});
    }

    let isPlaceholder = false;
    if (!poster_path || poster_path == '') {
      isPlaceholder = true;
    }
    return (
      <View
        style={{
          width: '70%',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          height: this.state.imageHeight,
          ...shadowStyle3,
        }}>
        <Image
          source={
            isPlaceholder
              ? require('../../assets/Images/MoviePlaceholder.jpg')
              : {uri: uri}
          }
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,

            // height: this.state.imageHeight,
            // borderRadius: 5,
            // marginBottom: 10,
          }}></Image>
      </View>
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
          <Text style={{textAlign: 'right'}}>{date}</Text>
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
    const {title, poster_path, overview, release_date, image_uri} = item;

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
          <SafeAreaView>
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
              {this.renderPopupPoster(
                this.props.isMyMoviePressed ? image_uri : poster_path,
              )}

              {this.renderPopupOverview(overview)}
              {this.renderPopupDate(release_date)}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}
