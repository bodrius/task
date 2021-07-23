import React, {useState, useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import {Constants} from '../../helpers/constants';
import MovieCard from '../../components/MovieCard/MovieCard';
import {styles} from './stylesFavoritesScreen';

const FavoritesScreen = () => {
  const {getStorageItem} = useAsyncStorage();
  const [favoriteList, setFavoriteList] = useState([]);
  const [text, setText] = useState('');

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

  const filterFavoriteList = (value, array) => {
    if (value?.trim()) {
      return array.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase()),
      );
    } else {
      return array;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setText('');
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={styles.container}>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Search favorite films"
          keyboardType="default"
        />
        {favoriteList.length !== 0 ? (
          filterFavoriteList(text, favoriteList).length === 0 ? (
            <Text>Oooppsss...Nothing found :(</Text>
          ) : (
            <FlatList
              data={filterFavoriteList(text, favoriteList)?.reverse()}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <MovieCard
                  key={item?.id}
                  item={item}
                  getCorrectListFilms={getCorrectListFilms}
                />
              )}
            />
          )
        ) : (
          <Text>Empty favorite list</Text>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default FavoritesScreen;
