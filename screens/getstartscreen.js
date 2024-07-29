import { View, Text, ImageBackground, StyleSheet } from "react-native";
import Btngetstart from "../componets/startscreen/btngetstart";
import Starttitle from "../componets/startscreen/Starttitle";

const Getstartscreen = ({navigation}) => {

  const handellogin = ()=>{
    navigation.navigate("login")

  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/img1.jpg")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.titlewrrapper}>
      <Starttitle style={styles.title}/>
     
      </View>
   

      <View style={styles.buttonWrapper}>
      <Btngetstart onPress={handellogin} />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
 titlewrrapper : {
    position: "absolute",
    bottom: 140,
    alignSelf: "center",

 }
});

export default Getstartscreen;
