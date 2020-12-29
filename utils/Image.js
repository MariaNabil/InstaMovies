// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Select',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Camera',
  chooseFromLibraryButtonTitle: 'Library',
  storageOptions: {
    skipBackup: true,
    path: 'RoxiitAdmin',
  },
  noData: true,
  mediaType: 'photo',
  allowsEditing: true,
};
export const showImagePicker = (onSuccess, onFailure) => {
  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      onFailure && onFailure(null);
    } else if (response.error) {
      onFailure && onFailure(response.error);
    } else if (response.customButton) {
      // todo when needed
      onFailure && onFailure(response.customButton);
    } else if (response) {
      onSuccess && onSuccess(response);
    } else {
      onFailure && onFailure(response);
    }
  });
};
