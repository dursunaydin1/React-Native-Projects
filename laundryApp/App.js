import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import StackNavigator from "./src/navigation/StackNavigator.js";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
