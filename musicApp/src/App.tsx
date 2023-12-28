import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SearchBar from './components/SearchBar';
import SongCard from './components/SongCard';
import music_data from '././music_data.json';

const App = () => {
  const [list, setList] = useState(music_data);
  const renderSong = ({item}) => <SongCard song={item} />;
  const renderSeparator = () => <View style={styles.separator} />;

  const handleSearch = text => {
    const filteredSong = music_data.filter(song => {
      const searchText = text.toLowerCase();
      const currentTitle = song.title.toLowerCase();
      const currentArtist = song.artist.toLowerCase();
      const currentAlbum = song.album.toLowerCase();

      return (
        currentTitle.indexOf(searchText) > -1 ||
        currentArtist.indexOf(searchText) > -1 ||
        currentAlbum.indexOf(searchText) > -1
      );
    });
    setList(filteredSong);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <FlatList
          keyExtractor={item => item.id}
          data={list}
          renderItem={renderSong}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default App;
