import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { sports, exercises, meals, nutritionalAdvice } from '../data/dummy-data.js';

const Section = ({ title, data, renderItem }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    </View>
);

const Programs = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCardPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderSportItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderExerciseItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderMealItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderNutritionalAdviceItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.item}</Text>
        </TouchableOpacity>
    );

    const renderModalContent = () => {
        if (!selectedItem) return null;

        return (
            <ScrollView>
                <Text style={styles.modalTitle}>{selectedItem.name || selectedItem.item}</Text>
                {selectedItem.bodyPart && <Text style={styles.modalText}>Body Part: {selectedItem.bodyPart}</Text>}
                {selectedItem.duration && <Text style={styles.modalText}>Duration: {selectedItem.duration}</Text>}
                {selectedItem.composition && <Text style={styles.modalText}>Composition: {selectedItem.composition}</Text>}
                {selectedItem.calories && <Text style={styles.modalText}>Calories: {selectedItem.calories}</Text>}
                {selectedItem.details && <Text style={styles.modalText}>Details: {selectedItem.details}</Text>}
            </ScrollView>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Section title="Types of Sports" data={sports} renderItem={renderSportItem} />
            <Section title="Exercises" data={exercises} renderItem={renderExerciseItem} />
            <Section title="Meals" data={meals} renderItem={renderMealItem} />
            <Section title="Nutritional Advice" data={nutritionalAdvice} renderItem={renderNutritionalAdviceItem} />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        {renderModalContent()}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#f5f5f5',
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF883B',
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    card: {
        padding: 12,
        marginHorizontal: 6,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    icon: {
        fontSize: 30,
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#FF883B',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Programs;