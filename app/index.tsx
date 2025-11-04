import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import { AntDesignProvider } from '@/src/components/AntDesignProvider';
import { PlacesScreen } from '@/src/screens/PlacesScreen';

export default function Index() {
  return (
    <Provider store={store}>
      <AntDesignProvider>
        <PlacesScreen />
      </AntDesignProvider>
    </Provider>
  );
}

