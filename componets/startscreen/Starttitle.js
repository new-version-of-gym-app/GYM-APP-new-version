import { View, Text, StyleSheet } from "react-native";

const Starttitle = () => {
  return (
    <View style={styles.titlecontainer}>
      <Text style={styles.title}>Welcome To GymGuru</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titlecontainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 160,
  },
  title: {
    color: "white",       
    fontSize: 30,         
    fontWeight: "bold",   
  },
});

export default Starttitle;
