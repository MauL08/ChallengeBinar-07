import React, { useEffect } from 'react';
import RootNavigator from './core/routes';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // onNotification();
  }, []);

  return <RootNavigator />;
};

export default App;
