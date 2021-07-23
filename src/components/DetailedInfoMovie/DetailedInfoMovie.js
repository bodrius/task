import React, {useState, useEffect} from 'react';
import {Text, Image, SafeAreaView, TouchableOpacity, Alert} from 'react-native';

import CustomModal from '../../ui/CustomModal/CustomModal';
import {styles} from './stylesDetailedInfoMovie';
import {Constants} from '../../helpers/constants';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';

const DetailedInfoMovie = ({
  showModal,
  setShowModal,
  item,
  getCorrectListFilms,
}) => {
  const {original_title, poster_path, overview, release_date, id} = item;
  const {setStorage, getStorageItem} = useAsyncStorage();
  const [checkItem, setCheckItem] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getStorageItem(Constants.addToFavoriteList).then(
        result => result.find(item => item.id === id),
      );
      if (data) {
        setCheckItem(true);
      } else {
        setCheckItem(false);
      }
    })();
  }, []);

  const handleBackPress = () => {
    setShowModal(state => !state);
  };

  const getFavoriteList = async favoriteItem => {
    await getStorageItem(Constants.addToFavoriteList).then(result => {
      addFilmsToFavoriteList(result, favoriteItem);
    });
  };

  const addFilmsToFavoriteList = async (arrayFavoriteFilms, favoriteItem) => {
    const listFilms = arrayFavoriteFilms;
    listFilms.push(favoriteItem);
    await setStorage(Constants.addToFavoriteList, listFilms);
    setCheckItem(true);
    Alert.alert(`Film ${favoriteItem.original_title} added to favorite list:)`);
  };

  const handelRemoveItem = async removalItem => {
    const arrayFilms = await getStorageItem(Constants.addToFavoriteList).then(
      result => result,
    );
    const result = arrayFilms.filter(item => item.id !== removalItem.id);
    await setStorage(Constants.addToFavoriteList, result);
    await getCorrectListFilms();
  };

  const detailedMovieContent = (
    <SafeAreaView style={styles.container}>
      {checkItem ? (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handelRemoveItem(item)}
          activeOpacity={0.7}>
          <Text>Remove from favorite</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => getFavoriteList(item)}
          activeOpacity={0.7}>
          <Text>Add to favorite</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{original_title}</Text>
      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
      />
      <Text style={styles.description}>{overview}</Text>
      <Text>{`Release date: ${release_date}`}</Text>
    </SafeAreaView>
  );

  return (
    <CustomModal
      children={detailedMovieContent}
      showModal={showModal}
      closeModal={handleBackPress}
    />
  );
};

export default DetailedInfoMovie;
