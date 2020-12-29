import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import Constants from '../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class RoundedSelector extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
    };
  }

  renderTitle = () => {
    const {title} = this.props;

    if (title) {
      return (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 25,
            position: 'absolute',
            bottom: 11,
            marginHorizontal: 5,
            paddingHorizontal: 5,
            backgroundColor: Constants.BACKGROUND_COLOR,
          }}>
          {title}
        </Text>
      );
    }
  };

  render() {
    const {props} = this;
    const {title, info, placeholder, ...buttonProps} = props;

    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          justifyContent: 'center',
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        {...buttonProps}>
        {this.renderTitle()}

        <Text
          style={{
            fontSize: 16,
            opacity: info ? 1 : 0.4,
          }}>
          {info ? info : placeholder}
        </Text>

        <MaterialIcons
          style={{
            marginLeft: 10,
          }}
          name={'arrow-forward-ios'}
          size={20}
        />
      </TouchableOpacity>
    );
  }
}

export default RoundedSelector;
