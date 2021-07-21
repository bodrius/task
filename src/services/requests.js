import axios from 'axios';
import {API_KEY, BASE_URL} from 'react-native-dotenv';

export const requests = {
  getMovie: async (page = 1) => {
    try {
      const listMovie = await axios({
        url: `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
      });
      return listMovie;
    } catch (error) {
      console.log('error', error);
    }
  },
};
