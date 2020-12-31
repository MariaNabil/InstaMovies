/**
 * @format
 */

import {formatDate} from '../utils/Date';

// Note: test renderer must be required after react-native.

test('renders formatDate', () => {
  expect(formatDate('2020-12-31T00:10:12.707Z')).toEqual('31-12-2020');
});
