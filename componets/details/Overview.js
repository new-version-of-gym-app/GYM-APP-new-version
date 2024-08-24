import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';

const Overview = ({ steps }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.listContainer}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.listItemContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.listItemContent}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.listItem}>{step}</Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listItemContainer: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 15,
    width: 30,
  },
  listItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default Overview;