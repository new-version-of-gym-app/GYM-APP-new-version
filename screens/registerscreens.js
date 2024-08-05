import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ipadresse } from '../config';

const { width, height } = Dimensions.get('window');

const Registerscreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('user');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (photo) => {
    setLoading(true);

    let formData = new FormData();
    formData.append('file', {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('upload_preset', 'achrefmech');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dlgzqlftm/image/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setPhoto(response.data.secure_url);
    } catch (error) {
      console.log('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const result = await axios.post(`http:${ipadresse}:5000/register`, {
        email,
        password,
        username,
        lastname,
        role,
        photo,
        phone,
      });
      if (result.data.status === 'success') {
        navigation.navigate('login');
      } else {
        alert('Email is already used!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={['#3A7BD5', '#00D2FF']}>
        <ImageBackground
          source={require('../assets/images/img1register.jpg')}
          resizeMode="cover"
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Animated.View
              style={[
                styles.overlay,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.title}>Create Account</Text>
              
              <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={20} color="#fff" style={styles.icon} />
                <TextInput
                  value={username}
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#ddd"
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={20} color="#fff" style={styles.icon} />
                <TextInput
                  value={lastname}
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#ddd"
                  onChangeText={setLastname}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesome5 name="phone" size={20} color="#fff" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phone}
                  placeholderTextColor="#ddd"
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesome5 name="envelope" size={20} color="#fff" style={styles.icon} />
                <TextInput
                  value={email}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#ddd"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  keyboardType="email-address"
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

              <View style={styles.photoContainer}>
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.imagePreview} />
                ) : (
                  <Pressable onPress={pickImage} style={styles.pickImageButton}>
                    <FontAwesome5 name="camera" size={24} color="#fff" />
                    <Text style={styles.pickImageText}>Choose Photo</Text>
                  </Pressable>
                )}
              </View>

              <View style={styles.pickerContainer}>
                <FontAwesome5 name="user-tag" size={20} color="#fff" style={styles.icon} />
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={setRole}
                  selectedValue={role}
                >
                  <Picker.Item label="User" value="user" />
                  <Picker.Item label="Coach" value="coach" />
                </Picker>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Pressable style={styles.registerButton} onPress={signUp}>
                  <Text style={styles.registerButtonText}>Sign Up</Text>
                </Pressable>
              )}

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Pressable onPress={() => navigation.navigate('login')}>
                  <Text style={styles.loginLink}>Log In</Text>
                </Pressable>
              </View>
            </Animated.View>
          </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pickImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  pickImageText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  picker: {
    flex: 1,
    color: '#fff',
  },
  pickerItem: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#00D2FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#ddd',
    fontSize: 16,
  },
  loginLink: {
    color: '#00D2FF',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Registerscreen;