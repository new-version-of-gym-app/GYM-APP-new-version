import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { sports, exercises, meals, nutritionalAdvice } from '../data/dummy-data.js';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const Section = ({ title, data, renderItem }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.sectionContainer}>
            <Animated.Text style={[styles.sectionTitle, {
                transform: [{
                    translateX: scrollX.interpolate({
                        inputRange: [-width, 0, width],
                        outputRange: [width * 0.1, 0, -width * 0.1]
                    })
                }]
            }]}>{title}</Animated.Text>
            <Animated.FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />
        </View>
    );
};

const Programs = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [animation] = useState(new Animated.Value(0));
    const cardScale = useRef(new Animated.Value(1)).current;
    const lottieRef = useRef(null);

    const handleCardPress = useCallback((item) => {
        setSelectedItem(item);
        setModalVisible(true);
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
            tension: 30,
            friction: 7,
        }).start();
    }, [animation]);

    const closeModal = useCallback(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    }, [animation]);

    const renderItem = useCallback(({ item, index, type }) => {
        const inputRange = [-CARD_WIDTH, 0, CARD_WIDTH * index, CARD_WIDTH * (index + 2)];
        const scale = cardScale.interpolate({
            inputRange,
            outputRange: [0.8, 0.9, 1, 0.9],
            extrapolate: 'clamp',
        });
        const opacity = cardScale.interpolate({
            inputRange,
            outputRange: [0.5, 0.8, 1, 0.8],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
                <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
                    <LinearGradient
                        colors={['#FF883B', '#FF6347']}
                        style={styles.cardGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.icon}>{item.icon}</Text>
                        <Text style={styles.name}>{type === 'nutritionalAdvice' ? item.item : item.name}</Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        );
    }, [handleCardPress, cardScale]);

    const renderModalContent = useCallback(() => {
        if (!selectedItem) return null;

        return (
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <Text style={styles.modalTitle}>{selectedItem.name || selectedItem.item}</Text>
                {selectedItem.bodyPart && <Text style={styles.modalText}>Body Part: {selectedItem.bodyPart}</Text>}
                {selectedItem.duration && <Text style={styles.modalText}>Duration: {selectedItem.duration}</Text>}
                {selectedItem.composition && <Text style={styles.modalText}>Composition: {selectedItem.composition}</Text>}
                {selectedItem.calories && <Text style={styles.modalText}>Calories: {selectedItem.calories}</Text>}
                {selectedItem.details && <Text style={styles.modalText}>Details: {selectedItem.details}</Text>}
            </ScrollView>
        );
    }, [selectedItem]);

    const modalScale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
    });

    const modalTranslateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    useEffect(() => {
        if (modalVisible && lottieRef.current) {
            lottieRef.current.play();
        }
    }, [modalVisible]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.container}>
                <Section title="Types of Sports" data={sports} renderItem={({ item, index }) => renderItem({ item, index, type: 'sports' })} />
                <Section title="Exercises" data={exercises} renderItem={({ item, index }) => renderItem({ item, index, type: 'exercises' })} />
                <Section title="Meals" data={meals} renderItem={({ item, index }) => renderItem({ item, index, type: 'meals' })} />
                <Section title="Nutritional Advice" data={nutritionalAdvice} renderItem={({ item, index }) => renderItem({ item, index, type: 'nutritionalAdvice' })} />
                
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <BlurView intensity={100} style={styles.modalView}>
                        <Animated.View style={[styles.modalContent, { 
                            transform: [
                                { scale: modalScale },
                                { translateY: modalTranslateY }
                            ] 
                        }]}>
                            {renderModalContent()}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeModal}
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                            <LottieView
                                ref={lottieRef}
                                source={require('../assets/animations/confetti.json')}
                                style={styles.lottieAnimation}
                                autoPlay={false}
                                loop={false}
                            />
                        </Animated.View>
                    </BlurView>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF883B',
        marginBottom: 16,
        paddingHorizontal: 8,
        textShadowColor: 'rgba(255, 136, 59, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    flatListContent: {
        paddingHorizontal: 8,
    },
    card: {
        marginHorizontal: 8,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 8,
        width: CARD_WIDTH,
        aspectRatio: 1,
        shadowColor: '#FF883B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardGradient: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 48,
        marginBottom: 12,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        width: '90%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalScrollContent: {
        flexGrow: 1,
        padding: 16,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF883B',
        textShadowColor: 'rgba(255, 136, 59, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
        color: '#333',
        lineHeight: 24,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FF883B',
        borderRadius: 24,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    lottieAnimation: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
});

export default Programs;