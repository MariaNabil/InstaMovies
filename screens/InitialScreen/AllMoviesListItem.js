import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Constants from '../../utils/Constants';
import {TrimText} from '../../utils/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {shadowStyle3, shadowStyle0, shadowStyle2} from '../../utils/Styles';
import FastImage from 'react-native-fast-image';

export default class AllMoviesListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTitle = (title) => {
    if (title) {
      return (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            paddingBottom: 5,
            width: '70%',
          }}
          numberOfLines={2}>
          {title}
        </Text>
      );
    } else return null;
  };

  renderOverview = (overview) => {
    if (overview) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingBottom: 5}}>{TrimText(overview, 100)}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderDate = (date) => {
    if (date) {
      return (
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}>
          <Text style={{textAlign: 'right'}}>{date}</Text>
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
            ? require('../../assets/Images/MoviePlaceholder.jpg')
            : {uri: uri, priority: FastImage.priority.high}
        }
        style={{
          width: '30%',
          height: 150,
          borderRadius: 5,
          borderWidth: 0.3,
          borderColor: 'black',
        }}></FastImage>
    );
  };

  renderExpandButton = () => {
    return (
      <TouchableOpacity
        style={{paddingBottom: 20, paddingLeft: 20}}
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
        style={{
          borderRadius: 5,
          flexDirection: 'row',
          flex: 1,
          // width: '95%',
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 10,
          // justifyContent: 'space-between',
          backgroundColor: Constants.BACKGROUND_COLOR,
          alignSelf: 'center',
          ...shadowStyle2,
        }}
        onPress={() => this.props.onPress(index)}>
        {this.renderPoster(poster_path)}
        <View
          style={{
            paddingLeft: 10,
            width: '70%',
            justifyContent: 'space-between',
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
