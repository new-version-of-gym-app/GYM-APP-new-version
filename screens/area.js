import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(async () => {
    setLoading(true);
    setLocationError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission not granted');
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 20000,
        maximumAge: 1000
      });
      setLocation(coords);
    } catch (error) {
      console.log('Error', error);
      setLocationError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, locationError, loading, requestLocation };
};

const Area = React.memo(() => {
  const { location, locationError, loading, requestLocation } = useLocation();

  useFocusEffect(useCallback(() => {
    requestLocation();
  }, [requestLocation]));

  const openGoogleMaps = useCallback(() => {
    if (locationError || !location) {
      searchWithoutLocation();
      return;
    }
    const { latitude, longitude } = location;
    const url = Platform.select({
      ios: `maps://app?saddr=${latitude},${longitude}&daddr=gym`,
      android: `geo:${latitude},${longitude}?q=gym&rankby=distance`
    });
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=gym&location=${latitude},${longitude}&rankby=distance`);
      }
    });
  }, [location, locationError]);

  const searchWithoutLocation = useCallback(() => {
    const url = Platform.select({ ios: `maps://app?q=gym`, android: `geo:0,0?q=gym&rankby=distance` });
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=gym&rankby=distance`);
      }
    });
  }, []);

  const buttonScale = useMemo(() => new Animated.Value(1), []);

  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const animatedStyles = useMemo(() => ({
    transform: [{ scale: buttonScale }],
  }), [buttonScale]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#880E4F', '#4A148C', '#6A1B9A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <TouchableOpacity
          onPress={openGoogleMaps}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
        >
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer}>
            <MaterialCommunityIcons name="map-search" size={30} color="#fff" />
          </Animatable.View>
          <Text style={styles.buttonText}>Find Nearest Gym</Text>
        </TouchableOpacity>
      </Animated.View>
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      {locationError && (
        <Animatable.Text animation="fadeIn" style={styles.errorText}>
          {locationError}. Searching without precise location.
        </Animatable.Text>
      )}
      <TouchableOpacity onPress={requestLocation} style={styles.refreshButton}>
        <MaterialCommunityIcons name="refresh" size={24} color="#fff" />
        <Text style={styles.refreshText}>Update Location</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  buttonContainer: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  iconContainer: {
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorText: {
    marginTop: 15,
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  loader: {
    marginTop: 20,
  },
  refreshButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 10,
  },
  refreshText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Area;