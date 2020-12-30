import React from 'react';
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

export default function AddMovie(props) {
  const renderImageSelector = () => {
    return (
      <ImageUploader
        defaultImage={props.image_uri}
        onChangeImage={(image_uri) => props.setImageUri(image_uri)}
      />
    );
  };

  const renderTitleInput = () => {
    return (
      <RoundedInput
        label="Title"
        value={props.title}
        onChangeText={(text) => {
          props.setTitle(text);
        }}></RoundedInput>
    );
  };

  const renderOverviewInput = () => {
    return (
      <RoundedInput
        multiline={true}
        label="Overview"
        value={props.overview}
        onChangeText={(text) => {
          props.setOverview(text);
        }}></RoundedInput>
    );
  };

  const renderDateInput = () => {
    return (
      <RoundedSelector
        placeholder={'Enter Release Date'}
        title={'ReleaseDate'}
        info={props.release_date}
        onPress={() => props.setShowDatePicker(true)}></RoundedSelector>
    );
  };

  const renderSaveButton = () => {
    return (
      <TouchableOpacity
        onPress={props.saveMovie}
        style={styles.saveButtonStyle}>
        <Text style={styles.saveButtonTextStyle}>{'Save'}</Text>
      </TouchableOpacity>
    );
  };

  const renderDatePicker = () => {
    return (
      <CustomDatePicker
        isVisible={props.showDatePicker}
        onDatePicked={(release_date) => {
          props.setReleaseDate(formatDate(release_date));
          props.setShowDatePicker(false);
        }}
        onCancel={() => props.setShowDatePicker(false)}></CustomDatePicker>
    );
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
