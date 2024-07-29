import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const Overview = ({ title, imageUrl, steps }) => {
  return (
    <ScrollView contentContainerStyle={Styles.scrollContent}>
      <View style={Styles.imagecontainer}>
        <Image style={Styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={Styles.titlecontainer}>
        <Text style={Styles.title}>{title}</Text>
      </View>
      <View style={Styles.listContainer}>
        {steps.map((ele, index) => (
          <View key={index} style={Styles.listItemContainer}>
            <Text style={Styles.listItem}>{ele}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 280,
    marginHorizontal :3
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  listItemContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10, 
    backgroundColor: "black", 
    padding: 10,
  },
  listItem: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  imagecontainer: {
    flex: 1,
  },
  titlecontainer: {
    marginVertical: 20,
    borderBottomWidth: 2,
    marginHorizontal: 25,
  },
});

export default Overview;
