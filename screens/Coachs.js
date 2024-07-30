import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// data 
const coachs = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'ddd',
        specialty: 'Yoga',
        photo: ''
    },
];

const getIconName = (specialty) => {
    switch (specialty.toLowerCase()) {
        case 'yoga':
            return 'self-improvement';
        case 'running':
            return 'directions-run';
        case 'strength training':
            return 'fitness-center';
        case 'hiit':
            return 'whatshot';
        case 'pilates':
            return 'self-improvement';
        case 'cycling':
            return 'directions-bike';
        case 'boxing':
            return 'sports-mma';
        case 'cardio dance':
            return 'sports-kabaddi';
        case 'stretching':
            return 'self-improvement';
        case 'crossfit':
            return 'fitness-center';
        default:
            return 'sports';
    }
};

const Coachs = () => {
    const renderItem = ({ item }) => (
        <View style={styles.coachContainer}>
            <Image source={{ uri: item.photo }} style={styles.coachPhoto} />
            <View style={styles.coachInfo}>
                <Text style={styles.coachName}>{`${item.firstName} ${item.lastName}`}</Text>
                <View style={styles.specialtyContainer}>
                    <MaterialIcons name={getIconName(item.specialty)} size={24} color="yellow" />
                    <Text style={styles.coachSpecialty}>{item.specialty}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={coachs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000000',
    },
        coachContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    coachPhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    coachInfo: {
        flex: 1,
    },
    coachName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00FFFF', 
    },
    specialtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coachSpecialty: {
        fontSize: 14,
        color: 'yellow',
        marginLeft: 8,
    },
});

export default Coachs;