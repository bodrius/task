import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';

import {MainStackNavigator} from './navigators/MainStackNavigator';

const App = () => {
  // Create a client
  const queryClient = new QueryClient();

  // // Access the client
  // const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
