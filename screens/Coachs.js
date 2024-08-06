import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Coachs = () => {
    const [coachs, setCoachs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/coachs')
            .then(response => response.json())
            .then(data => setCoachs(data))
            .catch(error => console.error('Error', error));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.coachContainer}>
            <Image source={item.photo} style={styles.coachPhoto} />
            <View style={styles.coachInfo}>
                <Text style={styles.coachName}>{`${item.username} ${item.lastname}`}</Text>
                <MaterialIcons name="fitness-center" size={24} color="yellow" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={coachs}
                renderItem={renderItem}
                keyExtractor={item => item.username} 
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
});

export default Coachs;
