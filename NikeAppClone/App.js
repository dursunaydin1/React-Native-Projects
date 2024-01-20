import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

import Navigation from "./src/navigation/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
