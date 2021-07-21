import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './stylesMovieCard';
import DetailedInfoMovieModal from '../DetailedInfoMovie/DetailedInfoMovie';

const MovieCard = ({item}) => {
  const [showModal, setShowModal] = useState(false);

  const {poster_path, title} = item;
  const showDetailedInfo = () => {
    setShowModal(state => !state);
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
