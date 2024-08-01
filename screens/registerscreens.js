import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BtnRegister from "../componets/Auth-buttons/btnregister";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import axios from "axios";
import { ipadresse } from "../config";

const Registerscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [role, setRole] = useState("");
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      //create the user in Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // register the user in db //! ip adress required instead of localhost
      const result = await axios.post(`http:${ipadresse}:5000/register`, {email,password,username,lastname, role});
      console.log("result" , result.data)
      if(result.data.status=="success"){
         navigation.navigate("login");
      }
      else {
        alert('Email is already used !! ')
      }
   
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={["#577B8D", "#000000"]}>
        <ImageBackground
          source={require("../assets/images/img1register.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              value={username}
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              value={lastname}
              style={styles.input}
              placeholder="Lastname"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={(text) => setlastname(text)}
            />
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

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) => setRole(itemValue)}
                selectedValue={role}
              >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Coach" value="coach" />
              </Picker>
            </View>

            <BtnRegister click={signUp} />
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
  picker: {
    width: "100%",
    height: 10,
    color: "#fff",

    marginBottom: 15,
    marginTop: 1,
  },
  pickerItem: {
    color: "#fff",
  },
  pickerContainer: {
    width: "100%",
    height: 0,
    marginBottom: 200,
    marginTop: 1,
  },
});

export default Registerscreen;
