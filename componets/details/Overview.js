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
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 3,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  listItemContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  imagecontainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titlecontainer: {
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginHorizontal: 25,
    paddingBottom: 10,
  },
});

export default Overview;

