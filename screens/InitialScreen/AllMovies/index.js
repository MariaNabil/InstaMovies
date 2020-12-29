import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import Constants from '../../../utils/Constants';
import AllMoviesListItem from './AllMoviesListItem';

export default class MyMovies extends Component {
  renderFooterIndicator = () => {
    if (this.props.loading) {
      return (
        <View style={styles.footerIndicatorStyle}>
          <ActivityIndicator size="large" color={Constants.SECOND_COLOR} />
          <Text>{'Loading...'}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderAllMoviesListItem = ({item, index}) => {
    return (
      <AllMoviesListItem
        item={item}
        index={index}
        onPress={this.props.onPressExpand}
      />
    );
  };

  render() {
    const {allMoviesData, renderTopScreen} = this.props;
    return (
      <FlatList
        ListHeaderComponent={renderTopScreen}
        ListFooterComponent={this.renderFooterIndicator}
        data={allMoviesData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderAllMoviesListItem}
        {...this.props.getPaginationProps()}></FlatList>
    );
  }
}

const styles = StyleSheet.create({
  footerIndicatorStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
  },
});
