import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import { AntDesignProvider } from '@/src/components/AntDesignProvider';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AntDesignProvider>
        <Slot />
      </AntDesignProvider>
    </Provider>
  );
}

