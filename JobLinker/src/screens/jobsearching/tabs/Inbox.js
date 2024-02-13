import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoLoginComponents from '../../../components/NoLoginComponents';
import {BG_COLOR} from '../../../utils/Colors';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inbox = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };
  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComponents
          desc={
            "Herhangi bir MNC'den iş önerisi almak işe alım uzmanıyla konuşun"
          }
          heading={"MNC'lerin işe alım uzmanlarıyla sohbet edebilirsiniz."}
        />
      )}
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
