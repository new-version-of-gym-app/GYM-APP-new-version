import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { DESCRIPTION } from '../data/dummy-data';
import Overview from '../componets/details/Overview';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 60;

const Details = ({ route, navigation }) => {
    const id = route.params.catid;
    const description = DESCRIPTION.find(item => item.categorysid == id);
    const scrollY = useSharedValue(0);
    const [imageAspectRatio, setImageAspectRatio] = useState(1);

    useEffect(() => {
        Image.getSize(description.imageUrl, (width, height) => {
            setImageAspectRatio(width / height);
        });
    }, [description.imageUrl]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, 1],
            Extrapolate.CLAMP
        );
        return { opacity };
    });

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            
            <Animated.ScrollView 
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <View style={styles.imageContainer}>
                    <SharedElement id={`item.${id}.image`}>
                        <Animated.Image 
                            source={{ uri: description.imageUrl }}
                            style={[
                                styles.image,
                                {
                                    aspectRatio: imageAspectRatio,
                                    height: undefined,
                                }
                            ]}
                            entering={FadeInUp.delay(300).duration(600)}
                        />
                    </SharedElement>
                </View>
                
                <View style={styles.contentWrapper}>
                    <BlurView intensity={80} tint="light" style={styles.contentContainer}>
                        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.content}>
                            <Animated.Text 
                                style={[styles.title, { transform: [{ translateX: scrollY.value }] }]}
                            >
                                {description.title}
                            </Animated.Text>
                            <Overview 
                                steps={description.steps}
                            />
                        </Animated.View>
                    </BlurView>
                </View>
            </Animated.ScrollView>

            <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <BlurView intensity={80} tint="light" style={styles.headerBlur}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Animated.Text 
                        style={[styles.headerTitle, { opacity: scrollY.value }]}
                        numberOfLines={1}
                    >
                        {description.title}
                    </Animated.Text>
                </BlurView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageContainer: {
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    image: {
        width: width - 40, // Add some horizontal padding
        resizeMode: 'contain',
    },
    contentWrapper: {
        flex: 1,
        marginTop: 20, // Add space between image and content
    },
    contentContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.8)',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        justifyContent: 'flex-end',
    },
    headerBlur: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 16,
        flex: 1,
    },
});

export default Details;