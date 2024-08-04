import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Btn = ({ onpress }) => {
  return (
    <View style={Styles.container}>
      <Pressable onPress={onpress}>
        <TouchableOpacity>
          <Text style={Styles.buttonText}>Add Fedd</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
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
    marginHorizontal: 120,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
