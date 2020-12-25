import React from 'react';
import {View} from 'react-native';
import Constants from '../utils/Constants';

export default (props) => {
  return (
    <View
      style={{
        backgroundColor: Constants.GRAY_COLOR,
        height: 0.5,
      }}
    />
  );
};
