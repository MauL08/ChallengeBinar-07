import React, { useEffect } from 'react';
import RootNavigator from './core/routes';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { persistor, store } from './data/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
