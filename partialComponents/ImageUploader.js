import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import {showImagePicker} from '../utils/Image';
import CircularImage from './CircularImage';
import Constants from '../utils/Constants';

export default class ImageUploader extends Component {
  state = {
    ImageUploader: false,
    prossesEvent: 0,
    picker_image_uri: this.props.defaultImage,
  };

  onSelectImage = ({uri}) => {
    const {uploadImage, onChangeImage, data} = this.props;
    if (!!uploadImage) {
      this.setState({
        picker_image_uri: uri,
        uploadingImage: true,
        prossesEvent: 0,
        remoteImage: true,
      });
      uploadImage(
        {...data, uri},
        () => {
          this.setState({uploadingImage: false, prossesEvent: 0}, () => {
            Toast.show('Data Saved', Toast.LONG);
            !!onChangeImage && onChangeImage();
          });
        },
        (err) => {
          this.setState({
            picker_image_uri: this.props.defaultImage,
            uploadingImage: false,
            prossesEvent: 0,
          });
        },
        (re) => {
          this.setState({prossesEvent: re * 0.01});
        },
      );
    } else {
      this.setState(
        {picker_image_uri: uri},
        () => !!onChangeImage && onChangeImage(uri),
      );
    }
  };
  renderImage = () => {
    const imageSize = !!this.props.imageSize ? this.props.imageSize : 110;
    const {uploadImage} = this.props;
    var {picker_image_uri} = this.state;

    return (
      <TouchableOpacity
        onPress={() => showImagePicker((data) => this.onSelectImage(data))}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Constants.GRAY_COLOR,
          margin: 20,
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 2,
        }}>
        {!!picker_image_uri ? (
          <View>
            <CircularImage uri={picker_image_uri} size={imageSize} />
            <FontAwesome
              style={{position: 'absolute', right: 4, bottom: 8}}
              name={`camera`}
              size={20}
            />
          </View>
        ) : (
          <Ionicons name={`ios-add`} size={45} />
        )}
      </TouchableOpacity>
    );
  };
  render() {
    const {label} = this.props;

    return (
      <View style={{flexDirection: 'column'}}>
        {this.renderImage()}
        {!!label && (
          <Text
            style={{
              fontSize: 14,
              //   color: textColor1,
              textAlign: 'center',
              marginTop: 5,
            }}
            text={label}
          />
        )}
      </View>
    );
  }
}
