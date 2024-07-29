import { View, Text, Pressable , StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Btngetstart = ({onPress}) => {
  return (
    <Pressable onPress={onPress} >
      <View style={styles.bouttoncontainer} >
        <Text style={styles.buttontext}>Get started</Text>
        <AntDesign name="arrowright" size={25} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    bouttoncontainer : {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor : "#FF7F3E",
        flexDirection: "row",
      
    }, 
    buttontext : {
        color : "white",
        fontWeight : "bold" , 
        fontSize : 20,
        marginRight : 5
    }

})

export default Btngetstart;
