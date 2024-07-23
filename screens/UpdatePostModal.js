import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAX_CHARACTERS = 500;

const UpdatePostModal = ({ isVisible, onClose, onSubmit, initialContent }) => {
  const [postText, setPostText] = useState(initialContent);

  const handleSubmit = () => {
    onSubmit(postText);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Update Post</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Update your post..."
            placeholderTextColor="#999"
            value={postText}
            onChangeText={setPostText}
            maxLength={MAX_CHARACTERS}
          />
          <Text style={styles.charCount}>{postText.length}/{MAX_CHARACTERS}</Text>
          <TouchableOpacity 
            style={[styles.submitButton, !postText && styles.submitButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!postText}
          >
            <Text style={styles.submitButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 15,
    borderRadius: 10,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  charCount: {
    color: '#888',
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#FF883B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdatePostModal;