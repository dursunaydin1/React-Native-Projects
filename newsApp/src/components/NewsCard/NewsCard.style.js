import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  image: {
    height: Dimensions.get('window').height / 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    marginTop: 3,
    color: 'black',
  },
  author: {
    fontStyle: 'italic',
    textAlign: 'right',
  },
  inner_container: {
    padding: 10,
  },
});
