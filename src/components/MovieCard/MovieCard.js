import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from './stylesMovieCard';

const MovieCard = ({imagePath, title}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${imagePath}`,
          }}
        />
      </View>
      <View>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;
