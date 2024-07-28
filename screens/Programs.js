import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import programs from '../data/dummy-data.js'; 

const Programs = () => {
    const renderItem = ({ item }) => (
        <View style={styles.programContainer}>
            <Text style={styles.programName}>{item.name}</Text>
            <Text style={styles.programDuration}>Durée: {item.duration}</Text>
            <Text style={styles.programDescription}>{item.description}</Text>
            <Text style={styles.programIntensity}>Intensité: {item.intensity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={programs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    programContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    programName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    programDuration: {
        fontSize: 14,
        color: '#666',
    },
    programDescription: {
        fontSize: 14,
        color: '#333',
    },
    programIntensity: {
        fontSize: 14,
        color: '#999',
    },
});

export default Programs;