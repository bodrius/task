import React, {useState, useCallback} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
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
      getCorrectListFilms();
    }, []),
  );

  const getCorrectListFilms = async () => {
    await getStorageItem(Constants.addToFavoriteList).then(result =>
      setFavoriteList(result),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteList.reverse()}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MovieCard
            key={item?.id}
            item={item}
            getCorrectListFilms={getCorrectListFilms}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;
