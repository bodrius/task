import React from 'react';
import {Text, Image, SafeAreaView} from 'react-native';

import CustomModal from '../../ui/CustomModal/CustomModal';
import {styles} from './stylesDetailedInfoMovie';

const DetailedInfoMovie = ({showModal, setShowModal, item}) => {
  const {original_title, poster_path, overview, release_date} = item;

  const handleBackPress = () => {
    setShowModal(state => !state);
  };

  let detailedMovieContent = (
    <SafeAreaView style={styles.container}>
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
