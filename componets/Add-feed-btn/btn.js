import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Btn = ({ onpress }) => {
  return (
    <Pressable onPress={onpress}>
      <View style={Styles.container}>
        <Text style={Styles.buttonText}>Add Fedd</Text>
      </View>
    </Pressable>
  );
};

export default Btn;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    alignSelf :"center" ,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
