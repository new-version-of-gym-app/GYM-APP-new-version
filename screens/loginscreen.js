import React, { useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { ipadresse } from '../config';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Userctx } from '../store/Usercontext';

const { width, height } = Dimensions.get('window');

const Loginscreen = ({ navigation }) => {
  const shareinfo = useContext(Userctx);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setItem } = useAsyncStorage('token');
  const auth = FIREBASE_AUTH;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const settoken = async (token) => {
    try {
      await setItem(token);
      console.log('token generated!');
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
      if (result.data.token) {
        settoken(result.data.token);
        shareinfo.addtoken(result.data.token);
        shareinfo.addid(result.data.id);
        shareinfo.addrole(result.data.role);
        shareinfo.addusername(result.data.username);
        shareinfo.addphoto(result.data.photo);
        shareinfo.addemail(result.data.email);
        shareinfo.addphone(result.data.phone);
        navigation.navigate('home');
      } else {
        alert(`${result.data.msg}`);
      }
    } catch (error) {
      alert('Wrong email or password!');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={['#3A7BD5', '#00D2FF']}>
        <ImageBackground
          source={require('../assets/images/img1login.jpg')}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="user-alt" size={20} color="#fff" style={styles.icon} />
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ddd"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#fff" style={styles.icon} />
              <TextInput
                value={password}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ddd"
                autoCapitalize="none"
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <FontAwesome5 name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#fff" />
              </Pressable>
            </View>
            <Pressable style={styles.loginButton} onPress={signIn}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </Pressable>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('register')}>
                <Text style={styles.registerLink}>Register</Text>
              </Pressable>
            </View>
          </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    opacity: 0.2,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 30,
    borderRadius: 20,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#00D2FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#ddd',
    fontSize: 16,
  },
  registerLink: {
    color: '#00D2FF',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Loginscreen;