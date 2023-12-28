import {SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/outline';

// eab308
const BackAndFavorite = ({isAbsolute}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const navigation = useNavigation();
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <SafeAreaView
      className={`flex-row justify-between items-center m-4 z-20 ${
        isAbsolute && 'absolute w-96'
      }`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="p-1 rounded-xl"
        style={{backgroundColor: '#eab308'}}>
        <ChevronLeftIcon name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavorite}>
        {isFavorite ? (
          <HeartIcon name="heart" size={30} color="#fff" />
        ) : (
          <HeartIcon name="heart" size={30} color="red" />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BackAndFavorite;
