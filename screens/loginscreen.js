import { View, Text, ImageBackground, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btnlogin from "../componets/Auth-buttons/btnlogin";

const Loginscreen = ({navigation}) => {

   const hundelregister = ()=>{
  navigation.navigate("register")
   }

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#9BEC00", "#000000"]}>
        <ImageBackground
          source={require("../assets/images/img1login.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input} placeholder="Put your email" placeholderTextColor="#fff" />
            <TextInput style={styles.input} placeholder="Password ..." placeholderTextColor="#fff" secureTextEntry={true} />
            <Btnlogin />
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
    opacity: 0.5,
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
