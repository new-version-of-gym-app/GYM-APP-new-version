import React, { useState, useContext, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
  Easing,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { Userctx } from '../store/Usercontext';
import { ipadresse } from '../config';
import CustomButton from './CustomButton';

const AddFeed = ({ navigation }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useContext(Userctx);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useFocusEffect(
    useCallback(() => {
      setText('');
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.9);
      };
    }, [])
  );

  const addFeed = async () => {
    if (text.trim() === '') return;

    setIsLoading(true);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const userId = await userInfo.id;
      const token = await AsyncStorage.getItem('token');

      const result = await axios.post(
        `http://${ipadresse}:5000/add/${userId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (result.data === 'new feed is added') {
        navigation.navigate('Feed', { newFeed: result.data });
      }
    } catch (err) {
      console.error('Error adding feed:', err);
      // Add error handling here (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
      setText('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        style={styles.container}
        colors={['#1B1A55', '#4a148c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ImageBackground
            source={require('../assets/images/feed.jpg')}
            resizeMode="cover"
            style={styles.imageBackground}
            imageStyle={styles.backgroundImage}
          >
            <BlurView intensity={20} style={styles.blurView}>
              <Animated.View
                style={[
                  styles.content,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <View style={styles.header}>
                  <FontAwesome5 name="pen-fancy" size={24} color="#fff" />
                  <Text style={styles.headerText}>Create New Feed</Text>
                </View>
                <TextInput
                  style={styles.textarea}
                  multiline
                  value={text}
                  onChangeText={setText}
                  placeholder="Share your thoughts..."
                  placeholderTextColor="#aaa"
                  returnKeyType="done"
                />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Add Feed"
                    onPress={addFeed}
                    disabled={isLoading || text.trim() === ''}
                    loading={isLoading}
                    icon={<MaterialIcons name="post-add" size={24} color="#fff" />}
                  />
                </View>
              </Animated.View>
            </BlurView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.2,
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(27, 26, 85, 0.8)',
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  textarea: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default AddFeed;