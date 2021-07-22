import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';

import {MainStackNavigator} from './navigators/MainStackNavigator';
import {useAsyncStorage} from './hooks/useAsyncStorage';
import {Constants} from './helpers/constants';

const App = () => {
  // Create a client
  const queryClient = new QueryClient();
  const {setStorage, getStorageItem} = useAsyncStorage();

  useEffect(() => {
    (async () => {
      await getStorageItem(Constants.addToFavoriteList).then(result => {
        if (result.length) {
          return;
        } else {
          setFavoriteList();
        }
      });
    })();
  }, []);

  const setFavoriteList = async () => {
    await setStorage(Constants.addToFavoriteList, []);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
