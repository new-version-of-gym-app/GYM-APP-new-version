import {View ,Text,Image ,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const profilePic=require("../assets/images/tempPic.jpg")
const editPic=require("../assets/images/edit.png")
const privacyPic=require('../assets/images/privacy.png')
const logPic=require('../assets/images/logout.png')

const Profile = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topSection}>
                    <View style={styles.propicArea}>
                        <Image source={profilePic} style={styles.propic}/>
                    </View>
                    <Text style={styles.name}>Test Test</Text>
                    <Text style={styles.role}>User</Text>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20}></Icon>
                        <Text style={{color:"#777777",marginLeft:20}}>+216-63504220 </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20}></Icon>
                        <Text style={{color:"#777777",marginLeft:20}}>email@email.tn </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={editPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Edit Informations</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={privacyPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Privacy and Policy</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={logPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Log Out</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

export default Profile;

const styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'black',
    },
    safeArea:{
        flex:1,
    },
    topSection:{
        height:250,
        justifyContent:'center',
        alignItems:'center',
    },
    propicArea:{
        width:170,
        height:170,
        borderRadius:20,
        borderWidth:4,
        borderColor:'#FF883B',
    },
    propic:{
        width:"100%",
        height:'100%',
        borderRadius:20,
    },
    name :{
        marginTop:10,
        fontSize:30,
        color:'white',
    },
    role:{
        marginTop:5,
        fontSize:15,
        color:'#FF883B',
    },

    buttonSection:{
        paddingBottom:8,
        padding:8,
        paddingLeft:25,
        paddingRight:25,
    },
    buttonArea:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    imageArea:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
    },
    iconStyle:{
        borderRadius:8,
        width:40,
        height:40,
        backgroundColor:"white",
    },
    buttonName:{
        width:290,
        fontSize:20,
        color:'white',
        marginLeft:25,
    },
    sp:{
        height:0.7,
        backgroundColor:'#FFFFFF90',
        marginTop:8,
    },
    userInfo:{
        alignContent:'center',
        alignItems:"center",
        paddingHorizontal:30,
        marginTop:15,
        marginBottom:5,    
    },
    row:{
        flexDirection:"row",
        marginBottom:10,
    },
})