jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
