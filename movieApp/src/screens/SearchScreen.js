import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {AppScreens} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {GetSearchMovies} from '../app/movieAction';
import {getSearchResultsState} from '../app/movieSelector';
import {useDispatch, useSelector} from 'react-redux';
import MovieListItem from '../components/MovieListItem';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const searchTextModified = searchText
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');

    dispatch(GetSearchMovies(searchTextModified));
  }, [searchText, dispatch]);

  const searchResults = useSelector(getSearchResultsState());
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="m-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Search Movie.."
          placeholderTextColor={'lightgray'}
          className="py-2 px-6  text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(AppScreens.Home)}
          className="p-3 m-1 bg-neutral-500 rounded-full">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {searchResults?.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Result Length: ({searchResults?.length})
          </Text>

          <View className="flex-row justify-between flex-wrap px-5">
            {searchResults?.map((movie, index) => (
              <MovieListItem searchPage key={index} movie={movie} />
            ))}
          </View>
        </ScrollView>
      )}

      {searchResults?.length === 0 && (
        <View className="items-center justify-center">
          <Text className="mt-2 text-white font-bold px-3 text-center">
            Aradığınız film bulunamadı. Lütfen farklı bir arama yapmayı deneyin.
          </Text>

          <Image
            source={require('../assetes/images/movieTime.png')}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
