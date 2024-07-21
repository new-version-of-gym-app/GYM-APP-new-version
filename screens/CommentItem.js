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
    alignItems: 'center',
    marginBottom: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#FF883B',
    fontSize: 14,
  },
  commentText: {
    color: '#DDD',
    fontSize: 14,
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
  },
});

export default CommentItem;