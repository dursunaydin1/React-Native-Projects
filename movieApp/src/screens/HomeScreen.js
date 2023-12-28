import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../components/Logo';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../navigation/types';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import {GetUpcomingMovies, GetTopRatedMovies} from '../app/movieAction';
import {useDispatch, useSelector} from 'react-redux';
import {getUpcomingState, getTopRatedState} from '../app/movieSelector';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUpcomingMovies());
    dispatch(GetTopRatedMovies());
  }, [dispatch]);

  const upcomingMovies = useSelector(getUpcomingState());
  const topRatedMovies = useSelector(getTopRatedState());

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-4 mt-5">
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center px-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Logo />
          <TouchableOpacity
            onPress={() => navigation.navigate(AppScreens.Search)}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView>
        {/* Trending Movies */}
        <TrendingMovies />

        {/* Upcoming Movies */}
        <MovieList title="Upcoming" data={upcomingMovies} />

        {/* Top Rated Movies */}
        <MovieList title="Top Rated" data={topRatedMovies} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
