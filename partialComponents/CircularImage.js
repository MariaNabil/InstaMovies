import React from 'react';
import {Image} from 'react-native';

export default (props) => {
  const {style, size = 56, uri, ...otherProps} = props;

  return (
    <Image
      source={{uri: uri}}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        ...style,
      }}
      dimension={size}
      wide={false}
      {...otherProps}
    />
  );
};
