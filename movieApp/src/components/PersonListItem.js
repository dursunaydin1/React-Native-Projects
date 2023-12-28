import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../navigation/types';
import {fallbackPersonImage} from '../api';

const PersonListItem = ({person}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(AppScreens.Person, {
          id: person.id,
        })
      }
      className="mr-4 items-center">
      <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
        <Image
          className="rounded-2xl w-20 h-24"
          source={{
            uri:
              `https://image.tmdb.org/t/p/w500${person.profile_path}` ||
              fallbackPersonImage,
          }}
        />
      </View>
      <Text className="text-white text-xs mt-1">
        {person?.character.length > 10
          ? person?.character.slice(0, 10) + '...'
          : person?.character}
      </Text>
      <Text className="text-neutral-400 text-xs">
        {person?.original_name.length > 10
          ? person?.original_name.slice(0, 10) + '...'
          : person?.original_name}
      </Text>
    </TouchableOpacity>
  );
};

export default PersonListItem;
