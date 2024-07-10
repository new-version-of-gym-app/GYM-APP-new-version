import { View, Text, ImageBackground, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btnlogin from "../componets/Auth-buttons/btnlogin";
import { useState } from "react";
import {FIREBASE_AUTH}from '../FirebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";

const Loginscreen = ({navigation}) => {

   const hundelregister = ()=>{
  navigation.navigate("register")
   }

   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [loading,setLoading]=useState(false)
   const auth = FIREBASE_AUTH;

   const signIn=async ()=>{
    try {
      const res =await signInWithEmailAndPassword(auth,email,password);
      alert('Login succefull')
    } catch (error) {
      alert(error)      
    }
   }

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#577B8D", "#000000"]}>
        <ImageBackground
          source={require("../assets/images/img1login.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Login</Text>
            <TextInput value={email} style={styles.input} placeholder="Put your email" placeholderTextColor="#fff" autoCapitalize="none" onChangeText={(text)=>setEmail(text)}/>
            <TextInput value={password} style={styles.input} placeholder="Password " placeholderTextColor="#fff" autoCapitalize="none" onChangeText={(text)=>setPassword(text)} secureTextEntry={true} />
            <Btnlogin click={signIn}/>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <Pressable onPress={hundelregister}>
                <Text style={styles.registerLink}>Register</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  image: {
    opacity: 0.25,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
  },
  registerLink: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default Loginscreen;
