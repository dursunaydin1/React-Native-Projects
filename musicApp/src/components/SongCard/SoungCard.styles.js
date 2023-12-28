import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inner_container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  year: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  artist: {
    color: 'black',
    fontWeight: 'bold',
  },
  content_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  soldout_container: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  soldout_title: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  album: {
    width: '78%',
    color: 'black',
  },
});
