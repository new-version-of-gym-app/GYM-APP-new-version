import { View, Text, Pressable, StyleSheet } from "react-native";

const Btnlogin = () => {
  return (
    <Pressable style={styles.button}>
      <View>
        <Text style={styles.buttonText}>Login</Text>
      </View>
    
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
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

