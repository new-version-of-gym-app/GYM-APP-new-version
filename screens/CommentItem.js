import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommentItem = ({ comment, onDelete, isUserComment }) => {
  return (
    <View style={styles.commentItem}>
      <View style={styles.commentContent}>
        <Text style={styles.commentAuthor}>{comment.author}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text style={styles.commentTime}>{comment.time}</Text>
      </View>
      {isUserComment && (
        <TouchableOpacity onPress={() => onDelete(comment.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={18} color="#FF883B" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  commentContent: {
    flex: 1,
    marginRight: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#FF883B',
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    marginTop: -8,
  },
});

export default CommentItem;