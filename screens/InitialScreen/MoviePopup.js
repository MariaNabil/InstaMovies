import React, {useState, useEffect} from 'react';
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

export default function MoviePopup(props) {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [imageHeight, setImageHeight] = useState(0);
  const {showPopup, onClosePopup} = props;
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT',
        );

  useEffect(() => {
    //re render when change orientation
    Dimensions.addEventListener('change', () => {
      setScreenWidth(Dimensions.get('window').width);
    });
  });

  const renderPopupTitle = (title) => {
    if (title && title != '') {
      return (
        <View style={styles.contentViewStyle}>
          <Text style={styles.titlStyle}>{title}</Text>
        </View>
      );
    }
  };

  const renderPopupPoster = (poster_path) => {
    let uri = props.isMyMoviePressed
      ? poster_path
      : `${Constants.IMAGE_BASE_URL}${poster_path}`;

    //If There Is No poster Add A Placeholder Image
    let isPlaceholder = false;
    if (!poster_path || poster_path == '') {
      isPlaceholder = true;
    }

    //Set ImageHeight As The Ratio Between Width And High Of the Original Image
    let ImageHeight;
    if (!isPlaceholder) {
      Image.getSize(uri, (width, height) => {
        ImageHeight = ((screenWidth * 70) / 100 - 20) * (height / width);
        setImageHeight(ImageHeight);
      });
    } else {
      // If PlaceholderImage
      setImageHeight((screenWidth * 70) / 100 - 20);
    }

    return (
      <View style={[styles.posterViewStyle, {height: imageHeight}]}>
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

  const renderPopupOverview = (overview) => {
    if (overview && overview != '') {
      return (
        <View style={styles.overviewStyle}>
          <Text style={styles.overviewTextStyle}>{overview}</Text>
        </View>
      );
    }
  };

  const renderPopupDate = (date) => {
    if (date && date != '')
      return (
        <View style={styles.dateStyle}>
          <Text style={styles.overviewTextStyle}>{date}</Text>
        </View>
      );
  };

  const renderPopupCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={props.onClosePopup}
        style={styles.closeButtonStyle}>
        <Ionicons name="close-circle-outline" color="#444444" size={25} />
      </TouchableOpacity>
    );
  };

  const renderModalContent = () => {
    const {allMoviesData, pressedMovieIndex} = props;

    let item = allMoviesData[pressedMovieIndex];
    const {title, poster_path, overview, release_date} = item;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        style={styles.scrollViewStyle}>
        {renderPopupCloseButton()}
        {renderPopupTitle(title)}
        {renderPopupPoster(poster_path)}
        {renderPopupOverview(overview)}
        {renderPopupDate(release_date)}
      </ScrollView>
    );
  };

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
      <View style={styles.modalViewStyle}>{renderModalContent()}</View>
    </Modal>
  );
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
