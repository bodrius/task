import React from 'react';
import {SafeAreaView} from 'react-native';

import ListMovie from '../../components/ListMovie/ListMovie';
import {styles} from './stylesHomeScreen';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.box}>
      <ListMovie />
    </SafeAreaView>
  );
};

export default HomeScreen;
