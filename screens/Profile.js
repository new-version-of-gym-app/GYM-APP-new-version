import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { FIREBASE_AUTH } from "../FirebaseConfig";
const profilePic = require("../assets/images/tempPic.jpg");
const editPic = require("../assets/images/edit.png");
const privacyPic = require('../assets/images/privacy.png');
const logPic = require('../assets/images/logout.png');

const Profile = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('Test Test');
    const [phone, setPhone] = useState('+216-63504220');
    const [tempName, setTempName] = useState(name);
    const [tempPhone, setTempPhone] = useState(phone);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        setIsSaveDisabled(name === tempName && phone === tempPhone);
    }, [tempName, tempPhone]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
        setName(tempName);
        setPhone(tempPhone);
        toggleModal();
    };

    const handleCancel = () => {
        setTempName(name);
        setTempPhone(phone);
        toggleModal();
    };

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => FIREBASE_AUTH.signOut(),
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topSection}>
                    <View style={styles.propicArea}>
                        <Image source={profilePic} style={styles.propic} />
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.role}>User</Text>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20}></Icon>
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20}></Icon>
                        <Text style={{ color: "#777777", marginLeft: 20 }}>email@email.tn</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={toggleModal}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={editPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Edit Informations</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={privacyPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Privacy and Policy</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9} onPress={handleLogout}>
                    <View style={styles.buttonArea}>
                        <View style={styles.imageArea}>
                            <Image source={logPic} style={styles.iconStyle} resizeMode='contain'></Image>
                        </View>
                        <Text style={styles.buttonName}>Log Out</Text>
                    </View>
                    <View style={styles.sp}></View>
                </TouchableOpacity>
            </SafeAreaView>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Informations</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#888"
                        value={tempName}
                        onChangeText={setTempName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor="#888"
                        value={tempPhone}
                        onChangeText={setTempPhone}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity 
                            style={[styles.modalButton, styles.saveButton, isSaveDisabled && styles.disabledButton]} 
                            onPress={handleSave} 
                            disabled={isSaveDisabled}
                        >
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    safeArea: {
        flex: 1,
    },
    topSection: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    propicArea: {
        width: 170,
        height: 170,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#FF883B',
    },
    propic: {
        width: "100%",
        height: '100%',
        borderRadius: 20,
    },
    name: {
        marginTop: 10,
        fontSize: 30,
        color: 'white',
    },
    role: {
        marginTop: 5,
        fontSize: 15,
        color: '#FF883B',
    },
    buttonSection: {
        paddingBottom: 8,
        padding: 8,
        paddingLeft: 25,
        paddingRight: 25,
    },
    buttonArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    imageArea: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        borderRadius: 8,
        width: 40,
        height: 40,
        backgroundColor: "white",
    },
    buttonName: {
        width: 290,
        fontSize: 20,
        color: 'white',
        marginLeft: 25,
    },
    sp: {
        height: 0.7,
        backgroundColor: '#FFFFFF90',
        marginTop: 8,
    },
    userInfo: {
        alignContent: 'center',
        alignItems: "center",
        paddingHorizontal: 30,
        marginTop: 15,
        marginBottom: 5,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#2c2c2c',
        padding: 22,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#444',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#777',
    },
    saveButton: {
        backgroundColor: '#FF883B',
    },
    disabledButton: {
        backgroundColor: '#555',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
