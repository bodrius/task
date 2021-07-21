import React, {useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';

import {requests} from '../../services/requests';
import MovieCard from '../MovieCard/MovieCard';

const ListMovie = () => {
  const [page, setPage] = useState(1);
  const [dataMovies, setDataMovies] = useState([]);

  const {isLoading, refetch, isFetching} = useQuery(
    ['movieList', page],
    () => requests.getMovie(page),
    {
      keepPreviousData: true,
      onSuccess: data => {
        if (data?.data?.page >= 2) {
          setDataMovies([...dataMovies, ...data?.data?.results]);
        } else {
          setDataMovies(data?.data?.results);
        }
      },
    },
  );

  const updateData = async () => {
    setPage(prevState => prevState + 1);
    await refetch();
  };

  return (
    <FlatList
      data={dataMovies}
      onEndReached={updateData}
      refreshing={!!isLoading}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => <MovieCard key={item?.id} item={item} />}
      ListFooterComponent={() =>
        !isFetching ? <ActivityIndicator size="large" color="red" /> : null
      }
    />
  );
};

export default ListMovie;
