import React, {useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';

import {requests} from '../../services/requests';
import MovieCard from '../MovieCard/MovieCard';

const ListMovie = () => {
  const [page, setPage] = useState(1);
  const [DATA, setDATA] = useState([]);

  const updateData = async () => {
    setPage(prevState => prevState + 1);
    console.log(`page`, page);

    const {data} = await refetch();
    // setDATA([...DATA, ...data?.data?.results]);
  };
  //   console.log(`DATA`, DATA);
  const {isLoading, refetch} = useQuery(
    ['movieList', page],
    () => requests.getMovie(page),
    {
      keepPreviousData: true,
      onSuccess: data => {
        console.log(`data1`, data);
        // setDATA(data?.data?.results);
        setDATA([data?.data?.results.push()]);
      },
    },
  );

  return (
    <FlatList
      data={DATA}
      onEndReached={updateData}
      refreshing={!!isLoading}
      onEndReachedThreshold={0.0}
      keyExtractor={item => item?.id.toString()}
      renderItem={({item}) => (
        <MovieCard
          key={item?.id}
          imagePath={item?.poster_path}
          title={item?.original_title}
        />
      )}
      ListFooterComponent={() =>
        isLoading ? <ActivityIndicator size="large" color="red" /> : null
      }
    />
  );
};

export default ListMovie;
