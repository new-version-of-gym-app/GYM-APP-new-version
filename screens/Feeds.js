import {View ,Text ,StyleSheet , ImageBackground} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import Btn from '../componets/Add-feed-btn/btn';

const Feeds = () => {
  return (
  
      <LinearGradient style={Styles.garadient}  colors={["#40E0D0", "#000000"]}>
        <ImageBackground
        source={require('../assets/images/feed.jpg')}
        resizeMode='cover'
        imageStyle = {Styles.img}
        style={Styles.imgcontainer}
        
        >
          <Btn/>
        <Text>
        The feed component
      </Text>
        </ImageBackground>
 
      </LinearGradient>
    
    
    
  );
}


const Styles = StyleSheet.create({
  garadient : {
    flex : 1 
  } , 
imgcontainer : {
  flex : 1
} , 
img : {
  opacity : 0.4
}
})

export default Feeds;
