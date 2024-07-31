import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btnlogin from "../componets/Auth-buttons/btnlogin";
import { useState, useContext } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { ipadresse } from "../config";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Userctx } from "../store/Usercontext";

const Loginscreen = ({ navigation }) => {
  const shareinfo = useContext(Userctx);

  const hundelregister = () => {
    navigation.navigate("register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setItem } = useAsyncStorage("token");

  const auth = FIREBASE_AUTH;

  const settoken = async (token) => {
    try {
      await setItem(token);
      console.log("token generated !!! ");
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const result = await axios.post(`http:${ipadresse}:5000/login`, {
        email,
        password,
      });
      console.log(result.data);
      if (result.data.token) {
        settoken(result.data.token);
        shareinfo.addtoken(result.data.token);
        shareinfo.addid(result.data.id)
        shareinfo.addrole(result.data.role)
        shareinfo.addusername(result.data.username)
        navigation.navigate("home");
      } else {
        alert(`${result.data.msg}`);
      }
    } catch (error) {
      alert("wrong email or password !!");
    }
  };

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
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Put your email"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password "
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <Btnlogin click={signIn} />
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
  },
  registerLink: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});

export default Loginscreen;
