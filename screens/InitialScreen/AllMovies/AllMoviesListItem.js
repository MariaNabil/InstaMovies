import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Constants from '../../../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {shadowStyle2} from '../../../utils/Styles';
import FastImage from 'react-native-fast-image';

export default class AllMoviesListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderTitle = (title) => {
    if (title) {
      return (
        <Text style={styles.titleTextStyle} numberOfLines={2}>
          {title}
        </Text>
      );
    } else return null;
  };

  renderOverview = (overview) => {
    if (overview) {
      return (
        <View style={styles.overviewStyle}>
          <Text style={styles.overviewTextStyle} numberOfLines={3}>
            {overview}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderDate = (date) => {
    if (date) {
      return (
        <View style={styles.dateViewStyle}>
          <Text style={styles.dateTextStyle}>{date}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderPoster = (poster_path) => {
    let isPlaceholder = false;
    if (!poster_path || poster_path == '') {
      isPlaceholder = true;
    }
    let uri = `${Constants.IMAGE_BASE_URL}${poster_path}`;
    return (
      <FastImage
        source={
          isPlaceholder
            ? require('../../../assets/Images/MoviePlaceholder.jpg')
            : {uri: uri, priority: FastImage.priority.high}
        }
        style={styles.posterImageStyle}></FastImage>
    );
  };

  renderExpandButton = () => {
    return (
      <TouchableOpacity
        style={styles.expandButtonStyle}
        onPress={() => {
          this.props.onPress(this.props.index);
        }}>
        <MaterialIcons name="unfold-more" size={20} />
      </TouchableOpacity>
    );
  };

  render() {
    const {item, index} = this.props;
    const {title, poster_path, overview, release_date} = item;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => this.props.onPress(index)}>
        {this.renderPoster(poster_path)}
        <View style={styles.contentStyle}>
          <View>
            <View style={styles.titleAndExpandButtonRowStyle}>
              {this.renderTitle(title)}
              {this.renderExpandButton()}
            </View>
            {this.renderOverview(overview)}
          </View>
          {this.renderDate(release_date)}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Constants.BACKGROUND_COLOR,
    alignSelf: 'center',
    ...shadowStyle2,
  },
  contentStyle: {
    paddingLeft: 10,
    width: '70%',
    justifyContent: 'space-between',
  },
  titleAndExpandButtonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 5,
    width: '70%',
  },
  overviewStyle: {flexDirection: 'row'},
  overviewTextStyle: {paddingBottom: 5},
  dateViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  dateTextStyle: {textAlign: 'right'},
  posterImageStyle: {
    width: '30%',
    height: 150,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'black',
  },
  expandButtonStyle: {paddingBottom: 20, paddingLeft: 20},
});
