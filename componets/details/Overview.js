import {View ,Text , Image , ScrollView ,  StyleSheet} from 'react-native'

const Overview = ({title, imageUrl,steps}) => {
    return (
       <View style={Styles.container}> 
        <View>
        <Text>
           {title}
        </Text>
        </View>
      <Image style={Styles.image}  source={{uri:imageUrl}}/>
   <ScrollView>
    {steps.map((ele)=>{
        return (
            <Text>{ele}</Text>
        )
    })}
   </ScrollView>
       
       </View>
    );
}

const Styles = StyleSheet.create({
    container : {
        flex : 1
    } , 
    image : {
        width : "100%" , 
        height : 200
    }

})

export default Overview;
