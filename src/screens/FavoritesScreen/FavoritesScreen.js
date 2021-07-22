import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import {Constants} from '../../helpers/constants';
import MovieCard from '../../components/MovieCard/MovieCard';
import {styles} from './stylesFavoritesScreen';

const FavoritesScreen = () => {
  const {getStorageItem} = useAsyncStorage();
  const [favoriteList, setFavoriteList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function getFavoriteList() {
        await getStorageItem(Constants.addToFavoriteList).then(result => {
          // console.log(`result`, result);
          // if (result) {
          //   return setFavoriteList(prevState => [...prevState, result]);
          // }
          // else {
          return setFavoriteList(result);
          // }
        });
      }
      getFavoriteList();
    }, []),
  );

  console.log(`favoriteList--`, favoriteList);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteList}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => <MovieCard key={item?.id} item={item} />}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;
