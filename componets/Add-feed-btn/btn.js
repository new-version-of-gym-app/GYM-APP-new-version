import {View ,Text , Pressable , StyleSheet} from 'react-native'

const Btn = ({onpress}) => {
    return (
   <View style={Styles.container}>
    <Pressable onPress={onpress}>
    <Text style={Styles.buttonText}>
   Add Fedd
     </Text>
    </Pressable>
  
   </View>
    );
}

export default Btn;

const Styles = StyleSheet.create({
    container:{
    backgroundColor: '#007777',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, 
    alignItems: 'center',
    marginHorizontal : 120 , 
    marginTop :  10 , 
    marginBottom : 70
    } ,
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
})
