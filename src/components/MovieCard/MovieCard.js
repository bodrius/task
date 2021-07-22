import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './stylesMovieCard';
import DetailedInfoMovieModal from '../DetailedInfoMovie/DetailedInfoMovie';
import {useAsyncStorage} from '../../hooks/useAsyncStorage';
import {Constants} from '../../helpers/constants';

const MovieCard = ({item}) => {
  const [showModal, setShowModal] = useState(false);
  const {setStorage, getStorageItem} = useAsyncStorage();
  const {poster_path, title} = item;

  const showDetailedInfo = () => {
    setShowModal(state => !state);
  };

  const addToFavoriteList = async favoriteItem => {
    await getStorageItem(Constants.addToFavoriteList).then(result => {
      addFilmsToFavoriteList(result, favoriteItem);
    });
  };

  const addFilmsToFavoriteList = async (arrayFavoriteFilms, favoriteItem) => {
    const listFilms = arrayFavoriteFilms;
    listFilms.push(favoriteItem);
    await setStorage(Constants.addToFavoriteList, listFilms);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={showDetailedInfo}>
        <View>
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
          />
        </View>
        <View>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => addToFavoriteList(item)}
            activeOpacity={0.7}>
            <Text>Add to favorite</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {showModal && (
        <DetailedInfoMovieModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={item}
        />
      )}
    </>
  );
};

export default MovieCard;
