import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAX_CHARACTERS = 500;

const CreatePostModal = ({ onClose, onSubmit }) => {
  const [postText, setPostText] = useState('');
  const [imageSelected, setImageSelected] = useState(false);

  const handleSubmit = () => {
    onSubmit({ text: postText, hasImage: imageSelected });
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Post</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Share your fitness journey..."
        placeholderTextColor="#999"
        value={postText}
        onChangeText={setPostText}
        maxLength={MAX_CHARACTERS}
      />
      <Text style={styles.charCount}>{postText.length}/{MAX_CHARACTERS}</Text>
      <TouchableOpacity 
        style={styles.imageButton} 
        onPress={() => setImageSelected(!imageSelected)}
      >
        <View style={styles.imageIconContainer}>
          <Ionicons name="image-outline" size={24} color="#FFF" />
        </View>
        <Text style={styles.imageButtonText}>
          {imageSelected ? 'Image selected' : 'Add photo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.submitButton, !postText && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={!postText}
      >
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
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
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  imageIconContainer: {
    backgroundColor: '#FF883B',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  imageButtonText: {
    color: '#FFF',
    fontSize: 16,
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

export default CreatePostModal;