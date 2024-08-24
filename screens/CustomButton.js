import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';

const CustomButton = ({ title, onPress, disabled, loading }) => {
  const animatedValue = new Animated.Value(0);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const animatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    backgroundColor: '#b39ddb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;