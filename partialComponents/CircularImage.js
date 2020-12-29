import React from 'react';
import {Image} from 'react-native';

export default (props) => {
  const {style, size = 56, uri, ...otherProps} = props;

  //   if (remote) {
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
  //   } else {
  //     return (
  //       !!uri && (
  //         <FastImage
  //           source={{
  //             uri: `${uri}`,
  //             priority: FastImage.priority.high,
  //           }}
  //           style={{
  //             width: size,
  //             height: size,
  //             borderRadius: size / 2,
  //             ...style,
  //           }}
  //           {...otherProps}
  //         />
  //       )
  //     );
  //   }
};
