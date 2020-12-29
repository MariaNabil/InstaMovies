import React, {Component} from 'react';
import {Appearance} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDate, dateToLocalTimezone} from '../utils/Date';

class CustomDatePicker extends Component {
  handleDatePicked = (date) => {
    date = new Date(date);
    date = dateToLocalTimezone(date);

    const {onDatePicked} = this.props;
    const convertedDate = date.toISOString();
    onDatePicked && onDatePicked(convertedDate, formatDate(convertedDate));
  };

  render() {
    const {minimumDate} = this.props;

    let {date} = this.props;

    if (date) {
      date = dateToLocalTimezone(new Date(date), true);
    } else {
      date = new Date();
    }

    if (minimumDate && minimumDate > date) {
      date = minimumDate;
    }

    return (
      <DateTimePicker
        {...this.props}
        isDarkModeEnabled={Appearance.getColorScheme() == 'dark'}
        date={date ? dateToLocalTimezone(new Date(date), true) : new Date()}
        cancelTextIOS={'Cancel'}
        confirmTextIOS={'Confirm'}
        is24Hour={false}
        onConfirm={this.handleDatePicked}
      />
    );
  }
}

export default CustomDatePicker;
