import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import NewsCard from './components/NewsCard';
import news_data from './news_data.json';

import Banner from './components/Banner';

const App = () => {
  const renderNews = ({item}) => <NewsCard news={item} />;
  const renderKeys = item => item.u_id.toString();

  const renderBanner = () => <Banner />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.news_header}>News</Text>
      <FlatList
        ListHeaderComponent={renderBanner}
        keyExtractor={renderKeys}
        data={news_data}
        renderItem={renderNews}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  banner_container: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width,
  },
  news_header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
});

export default App;
