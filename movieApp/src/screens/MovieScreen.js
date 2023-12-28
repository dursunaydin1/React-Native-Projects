import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetMovieDetails,
  GetMovieCredits,
  GetSimilarMoviesState,
} from '../app/movieAction';
import {
  getMovieDetailState,
  getMovieCreditState,
  getSimilarMoviesState,
} from '../app/movieSelector';
import BackAndFavorite from '../components/BackAndFavorite';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import {fallbackMoviePoster} from '../api';

const MovieScreen = () => {
  const {id} = useRoute().params;
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    dispatch(GetMovieDetails(id));
    dispatch(GetMovieCredits(id));
    dispatch(GetSimilarMoviesState(id));
  }, [id, dispatch]);

  const movieDetail = useSelector(getMovieDetailState());
  const movieCredits = useSelector(getMovieCreditState());
  const similarMovies = useSelector(getSimilarMoviesState());

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <BackAndFavorite isAbsolute />
      <View>
        <Image
          source={{
            uri:
              `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` ||
              fallbackMoviePoster,
          }}
          style={{
            width: width,
            height: height * 0.55,
          }}
        />
        <LinearGradient
          colors={[
            'transparent',
            'rgba(23, 23, 23, 0.8)',
            'rgba(23, 23, 23, 1)',
          ]}
          style={{
            width: width,
            height: height * 0.4,
          }}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          className="absolute bottom-0"
        />
      </View>
      <View
        style={{
          marginTop: -height * 0.09,
        }}
        className="space-y-3">
        {/* Movie Detail */}
        <Text className="text-white text-center font-semibold text-3xl tracking-wider">
          {movieDetail?.title}
        </Text>
        {/* status, relase, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movieDetail?.status} | {movieDetail?.release_date?.split('-')[0]} |{' '}
          {movieDetail?.runtime} min
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4">
          {movieDetail?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movieDetail?.genres?.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre.name} {showDot && '•'}{' '}
              </Text>
            );
          })}
        </View>

        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movieDetail?.overview ||
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatem?'}
        </Text>
      </View>

      {/* Cast */}
      {movieCredits?.length > 0 && <Cast data={movieCredits} />}

      {/* Similar Movies */}
      {similarMovies?.length > 0 && (
        <MovieList hideSeeAll title="Similar Movies" data={similarMovies} />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
