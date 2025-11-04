jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        googlePlacesApiKey: 'test-api-key',
      },
    },
  },
}));

jest.mock('@react-native-community/netinfo', () => ({
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
  },
}));

