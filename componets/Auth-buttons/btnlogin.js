import { View, Text, Pressable, StyleSheet } from "react-native";

const Btnlogin = ({click}) => {
  return (
    <Pressable onPress={click} style={styles.button}>
      <View>
        <Text style={styles.buttonText}>Login</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B1A55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Btnlogin;

