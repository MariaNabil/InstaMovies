import React, {Component} from 'react';
import {I18nManager, Text, TextInput, View} from 'react-native';

import Constants from '../utils/Constants';

class RoundedInput extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
    };
  }

  renderlabel = () => {
    const {label} = this.props;

    return (
      <Text
        style={{
          fontSize: 14,
          top: 9,
          zIndex: 1,
          marginHorizontal: 5,
          paddingHorizontal: 5,
          alignSelf: 'flex-start',
          color: this.state.isFocused ? Constants.SECOND_COLOR : '#141823',
          backgroundColor: Constants.BACKGROUND_COLOR,
        }}>
        {label}
      </Text>
    );
  };

  render() {
    return (
      <View
        style={{
          marginHorizontal: 20,

          //   width: '100%',
          //   flex: 1,
          alignSelf: 'stretch',
        }}>
        {this.renderlabel()}

        <TextInput
          {...this.props}
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 10,
            paddingVertical: 8,
            width: '100%',
            fontSize: 16,
            borderColor: this.state.isFocused ? Constants.SECOND_COLOR : null,
            borderRadius: 10,
            textAlign: 'left',
          }}
          placeholder={`Please Enter ${this.props.label}`}
          underlineColorAndroid="transparent"
          selectionColor={Constants.SECOND_COLOR}
          onFocus={() => {
            this.setState({
              isFocused: true,
            });
          }}
          onBlur={() => {
            this.setState({
              isFocused: false,
            });
          }}
        />
      </View>
    );
  }
}

export default RoundedInput;
