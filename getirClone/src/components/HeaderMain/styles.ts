import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  headerMain: {
    height: height * 0.064,
    backgroundColor: "#F7D102",
  },
  headerOne: {
    height: height * 0.064,
    width: "80%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  image: {
    width: 30,
    height: 30,
  },
  headerOneView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftColor: "#F3f2FD",
    borderLeftWidth: 2,
  },
  headerTwo: {
    width: width * 0.35,
    height: height * 0.064,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default styles;
