import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { FIREBASE_AUTH } from "../FirebaseConfig";
const profilePic = require("../assets/images/tempPic.jpg");
const editPic = require("../assets/images/edit.png");
const privacyPic = require("../assets/images/privacy.png");
const logPic = require("../assets/images/logout.png");
import { useNavigation } from "@react-navigation/native";
import { Userctx } from "../store/Usercontext";
import { ipadresse } from "../config";
import axios from 'axios';


const Profile = () => {
  const Userinfo = useContext(Userctx);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [name, setName] = useState(Userinfo.username);
  const [phone, setPhone] = useState(Userinfo.phone);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setIsSaveDisabled(name === Userinfo.username && phone === Userinfo.phone);
  }, [name, phone]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const togglePrivacyModal = () => {
    setPrivacyModalVisible(!isPrivacyModalVisible);
  };

  const handleSave = () => {
    console.log('Saving:', { username: name, phone: phone });
    axios.put(`http://${ipadresse}:5000/update/${Userinfo.id}`, { username: name, phone: phone })
      .then(response => {
        console.log('Response:', response.data);
        toggleModal();
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleCancel = () => {
    setName(Userinfo.username);
    setPhone(Userinfo.phone);
    toggleModal();
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            FIREBASE_AUTH.signOut();
            navigation.navigate("login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topSection}>
          <View style={styles.propicArea}>
            {Userinfo.photo ? (
              <Image source={{ uri: Userinfo.photo }} style={styles.propic} />
            ) : (
              <Image source={profilePic} style={styles.propic} />
            )}
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{Userinfo.role}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20}></Icon>
            <Text style={{ color: "#777777", marginLeft: 5 }}>
              {phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20}></Icon>
            <Text style={{ color: "#777777", marginLeft: 5 }}>
              {Userinfo.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonSection}
          activeOpacity={0.9}
          onPress={toggleModal}
        >
          <View style={styles.buttonArea}>
            <View style={styles.imageArea}>
              <Image
                source={editPic}
                style={styles.iconStyle}
                resizeMode="contain"
              ></Image>
            </View>
            <Text style={styles.buttonName}>Edit Informations</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonSection} 
          activeOpacity={0.9}
          onPress={togglePrivacyModal}
        >
          <View style={styles.buttonArea}>
            <View style={styles.imageArea}>
              <Image
                source={privacyPic}
                style={styles.iconStyle}
                resizeMode="contain"
              ></Image>
            </View>
            <Text style={styles.buttonName}>Privacy and Policy</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSection}
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <View style={styles.buttonArea}>
            <View style={styles.imageArea}>
              <Image
                source={logPic}
                style={styles.iconStyle}
                resizeMode="contain"
              ></Image>
            </View>
            <Text style={styles.buttonName}>Log Out</Text>
          </View>
          <View style={styles.sp}></View>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Informations</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#888"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.saveButton,
                isSaveDisabled && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={isSaveDisabled}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isPrivacyModalVisible}
        onBackdropPress={togglePrivacyModal}
        style={styles.modal}
      >
        <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
        <ScrollView 
          contentContainerStyle={styles.modalContentContainerStyle}
        >
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <Text style={styles.privacyText}>
            Last updated: August 06, 2024
          </Text>
          <Text style={styles.privacyText}>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </Text>
          <Text style={styles.privacyText}>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Free Privacy Policy Generator.
          </Text>
          <Text style={styles.privacyText}>
            Interpretation and Definitions
          </Text>
          <Text style={styles.privacyText}>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </Text>
          <Text style={styles.privacyText}>
            For the purposes of this Privacy Policy:
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Account</Text> means a unique account created for You to access our Service or parts of our Service.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Affiliate</Text> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Application</Text> refers to GymGuru, the software program provided by the Company.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to GymGuru.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Country</Text> refers to:  Tunisia
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Device</Text> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Personal Data</Text> is any information that relates to an identified or identifiable individual.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Service</Text> refers to the Application.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Service Provider</Text> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>Usage Data</Text> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>You</Text> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}>If you have any questions about this Privacy Policy, </Text>You can contact us:
          </Text>
          <Text style={styles.privacyText}>
            <Text style={{ fontWeight: 'bold' }}> By email:</Text> GymGuru@gmail.com
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={togglePrivacyModal}
        >
          <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: "black",
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  propicArea: {
    width: 170,
    height: 170,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#FF883B",
  },
  propic: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 30,
    color: "white",
  },
  role: {
    marginTop: 5,
    fontSize: 15,
    color: "#FF883B",
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
    color: "white",
    marginLeft: 25,
  },
  sp: {
    height: 0.7,
    backgroundColor: "#FFFFFF90",
    marginTop: 8,
  },
  userInfo: {
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 15,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    textAlign : "center",
    justifyContent : "center"
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalContent: {
    backgroundColor: "#2c2c2c",
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    alignItems: "center",
  },
  modalContentContainerStyle: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#777",
  },
  saveButton: {
    backgroundColor: "#FF883B",
  },
  disabledButton: {
    backgroundColor: "#555",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  privacyText: {
    color: "white",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
