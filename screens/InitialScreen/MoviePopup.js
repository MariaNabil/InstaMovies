import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
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

  renderPopupTitle = (title) => {
    if (title && title != '') {
      return <Text style={styles.titlStyle}>{title}</Text>;
    }
  };

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
      <View style={[styles.posterViewStyle, {height: this.state.imageHeight}]}>
        <Image
          source={
            isPlaceholder
              ? require('../../assets/Images/MoviePlaceholder.jpg')
              : {uri: uri}
          }
          style={styles.posterImageStyle}></Image>
      </View>
    );
  };

  renderPopupOverview = (overview) => {
    if (overview && overview != '') {
      return (
        <View style={styles.overviewStyle}>
          <Text style={styles.overviewTextStyle}>{overview}</Text>
        </View>
      );
    }
  };

  renderPopupDate = (date) => {
    if (date && date != '')
      return (
        <View style={styles.dateStyle}>
          <Text style={styles.overviewTextStyle}>{date}</Text>
        </View>
      );
  };

  renderPopupCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={this.props.onClosePopup}
        style={styles.closeButtonStyle}>
        <Ionicons name="close-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };

  renderModalContent = () => {
    const {allMoviesData, pressedMovieIndex} = this.props;

    let item = allMoviesData[pressedMovieIndex];
    const {title, poster_path, overview, release_date, image_uri} = item;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        style={styles.scrollViewStyle}>
        {this.renderPopupCloseButton()}

        <View style={styles.contentViewStyle}>
          {this.renderPopupTitle(title)}
        </View>
        {this.renderPopupPoster(
          this.props.isMyMoviePressed ? image_uri : poster_path,
        )}
        {this.renderPopupOverview(overview)}
        {this.renderPopupDate(release_date)}
      </ScrollView>
    );
  };

  render() {
    const {showPopup, onClosePopup} = this.props;

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT',
          );

    return (
      <Modal
        isVisible={showPopup}
        onBackdropPress={onClosePopup}
        onSwipeComplete={onClosePopup}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}>
        <View style={styles.modalViewStyle}>{this.renderModalContent()}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  posterViewStyle: {
    width: '70%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...shadowStyle3,
  },
  posterImageStyle: {width: '100%', height: '100%', borderRadius: 5},
  titlStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  overviewStyle: {flexDirection: 'row'},
  overviewTextStyle: {
    paddingBottom: 10,
    width: '80%',
    textAlign: 'center',
    fontSize: 15,
  },
  dateStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 10,
    paddingTop: 0,
  },
  dateTextStyle: {textAlign: 'right'},
  closeButtonStyle: {
    right: 10,
    top: 10,
    position: 'absolute',
    zIndex: 2,
    ...shadowStyle3,
  },
  scrollViewContentContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewStyle: {width: '100%'},
  contentViewStyle: {flexDirection: 'row'},
  modalViewStyle: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 50,
  },
});
