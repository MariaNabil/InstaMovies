import React, {PureComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Constants from '../../utils/Constants';
import {TrimText} from '../../utils/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          }}>
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

  renderPoster = (poster_path = '/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg') => {
    let uri = `${Constants.IMAGE_BASE_URL}${poster_path}`;
    return (
      <Image
        source={{uri: uri}}
        style={{
          width: '30%',
          height: 150,
        }}></Image>
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
          borderRadius: 15,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: 10,
          justifyContent: 'space-between',
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
