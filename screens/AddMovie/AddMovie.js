import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import RoundedInput from '../../partialComponents/RoundedInput';
import ImageUploader from '../../partialComponents/ImageUploader';
import CustomDatePicker from '../../partialComponents/CustomDatePicker';
import {formatDate} from '../../utils/Date';
import RoundedSelector from '../../partialComponents/RoundedSelector';
import Constants from '../../utils/Constants';
import Toast from 'react-native-simple-toast';

export default function AddMovie(props) {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [release_date, setReleaseDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image_uri, setImageUri] = useState(null);

  const renderImageSelector = () => {
    return (
      <ImageUploader
        defaultImage={image_uri}
        onChangeImage={(image_uri) => setImageUri(image_uri)}
      />
    );
  };

  const renderTitleInput = () => {
    return (
      <RoundedInput
        label="Title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}></RoundedInput>
    );
  };

  const renderOverviewInput = () => {
    return (
      <RoundedInput
        multiline={true}
        label="Overview"
        value={overview}
        onChangeText={(text) => {
          setOverview(text);
        }}></RoundedInput>
    );
  };

  const renderDateInput = () => {
    return (
      <RoundedSelector
        placeholder={'Enter Release Date'}
        title={'ReleaseDate'}
        info={release_date}
        onPress={() => setShowDatePicker(true)}></RoundedSelector>
    );
  };

  const renderSaveButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!inputValidation()) return;
          if (global.MyMovies) {
            global.MyMovies.push({
              id: global.MyMovies?.length,
              image_uri,
              title,
              overview,
              release_date,
            });
            props.route.params?.onSave && props.route.params?.onSave();
            props.navigation.goBack();
          } else {
            global.MyMovies = [
              {
                id: 0,
                image_uri,
                title,
                overview,
                release_date,
              },
            ];
            props.route.params?.onSave && props.route.params?.onSave();
            props.navigation.goBack();
          }
        }}
        style={styles.saveButtonStyle}>
        <Text style={styles.saveButtonTextStyle}>{'Save'}</Text>
      </TouchableOpacity>
    );
  };

  const renderDatePicker = () => {
    return (
      <CustomDatePicker
        isVisible={showDatePicker}
        onDatePicked={(release_date) => {
          setReleaseDate(formatDate(release_date));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}></CustomDatePicker>
    );
  };

  const inputValidation = () => {
    if (!image_uri) {
      Toast.show('Please Choose A Movie Poster', Toast.LONG);
      return false;
    } else if (!title || title == '') {
      Toast.show('Please Enter A Title', Toast.LONG);
      return false;
    } else if (!overview || overview == '') {
      Toast.show('Please Enter An Overview', Toast.LONG);
      return false;
    } else if (!release_date) {
      Toast.show('Please Enter A Release Date', Toast.LONG);
      return false;
    }
    return true;
  };

  const renderContent = () => {
    return (
      <ScrollView style={styles.scrollViewStyle}>
        {renderImageSelector()}
        {renderTitleInput()}
        {renderOverviewInput()}
        {renderDateInput()}
        {renderSaveButton()}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS == 'ios' ? (
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.keyboardAvoidingViewStyle}
          keyboardVerticalOffset={40}>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
      {renderDatePicker()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BACKGROUND_COLOR,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
    width: '100%',
  },
  saveButtonStyle: {
    backgroundColor: Constants.SECOND_COLOR,
    margin: 20,
    borderRadius: 10,
  },
  scrollViewStyle: {width: '100%'},
  saveButtonTextStyle: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
  },
});
