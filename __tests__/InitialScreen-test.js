/**
 * @format
 */

import 'react-native';
import React from 'react';
import InitialScreen from '../screens/InitialScreen/index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('InitialScreen Platform', () => {
  const snap = renderer.create(<InitialScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
