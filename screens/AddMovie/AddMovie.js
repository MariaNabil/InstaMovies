import React, {Component} from 'react';
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

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      release_date: null,
      showDatePicker: false,
    };
  }

  renderImageSelector = () => {
    return (
      <ImageUploader
        defaultImage={this.state.image_uri}
        onChangeImage={(image_uri) => this.setState({image_uri: image_uri})}
      />
    );
  };

  renderTitleInput = () => {
    const {title} = this.state;

    return (
      <RoundedInput
        label="Title"
        value={title}
        onChangeText={(text) => {
          this.setState({
            title: text,
          });
        }}></RoundedInput>
    );
  };

  renderOverviewInput = () => {
    const {overview} = this.state;
    return (
      <RoundedInput
        multiline={true}
        label="Overview"
        value={overview}
        onChangeText={(text) => {
          this.setState({
            overview: text,
          });
        }}></RoundedInput>
    );
  };

  renderDateInput = () => {
    return (
      <RoundedSelector
        placeholder={'Enter Release Date'}
        title={'ReleaseDate'}
        info={this.state.release_date}
        onPress={() => this.setState({showDatePicker: true})}></RoundedSelector>
    );
  };

  renderSaveButton = () => {
    const {image_uri, title, overview, release_date} = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.inputValidation()) return;
          if (global.MyMovies) {
            global.MyMovies.push({
              id: 0,
              image_uri,
              title,
              overview,
              release_date,
            });
            this.props.route.params?.onSave &&
              this.props.route.params?.onSave();
            this.props.navigation.goBack();
          } else {
            global.MyMovies = [
              {
                id: global.MyMovies?.length,
                image_uri,
                title,
                overview,
                release_date,
              },
            ];
            this.props.route.params?.onSave &&
              this.props.route.params?.onSave();
            this.props.navigation.goBack();
          }
        }}
        style={styles.saveButtonStyle}>
        <Text style={styles.saveButtonTextStyle}>{'Save'}</Text>
      </TouchableOpacity>
    );
  };

  renderDatePicker = () => {
    const {showDatePicker} = this.state;
    return (
      <CustomDatePicker
        isVisible={showDatePicker}
        onDatePicked={(release_date) =>
          this.setState({
            release_date: formatDate(release_date),
            showDatePicker: false,
          })
        }
        onCancel={() =>
          this.setState({showDatePicker: false})
        }></CustomDatePicker>
    );
  };

  inputValidation = () => {
    const {image_uri, title, overview, release_date} = this.state;
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

  renderContent = () => {
    return (
      <ScrollView style={styles.scrollViewStyle}>
        {this.renderImageSelector()}
        {this.renderTitleInput()}
        {this.renderOverviewInput()}
        {this.renderDateInput()}
        {this.renderSaveButton()}
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS == 'ios' || true ? (
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={styles.keyboardAvoidingViewStyle}
            keyboardVerticalOffset={40}>
            {this.renderContent()}
          </KeyboardAvoidingView>
        ) : (
          this.renderContent()
        )}
        {this.renderDatePicker()}
      </View>
    );
  }
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
