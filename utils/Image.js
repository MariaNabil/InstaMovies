import {Platform} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Select',
  cancelButtonTitle: 'Cancel',
  chooseFromLibraryButtonTitle: 'Library',
  storageOptions: {
    skipBackup: true,
    path: 'InstaMovies',
  },
  noData: true,
  mediaType: 'photo',
  allowsEditing: true,
};

export const showImagePicker = (onSuccess, onFailure) => {
  const onResponse = (response) => {
    if (response.didCancel) {
      onFailure && onFailure(null);
    } else if (response.error) {
      onFailure && onFailure(response.error);
    } else if (response) {
      onSuccess && onSuccess(response);
    } else {
      onFailure && onFailure(response);
    }
  };

  if (Platform.OS === 'ios') {
    ImagePicker.showImagePicker(options, (response) => {
      onResponse(response);
    });
  } else {
    launchImageLibrary(options, (response) => {
      onResponse(response);
    });
  }
};
