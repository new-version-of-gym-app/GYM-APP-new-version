import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { FEED_ITEMS } from '../data/dummy-data';
import { Ionicons } from '@expo/vector-icons';
import CommentSection from './CommentSection';
import CommentItem from './CommentItem';  
import CreatePostModal from './CreatePostModal';

const FeedItem = ({ item, toggleLike, addComment, deleteComment }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const toggleComments = () => setShowAllComments(!showAllComments);

  return (
    <View style={styles.feedItem}>
      <View style={styles.header}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.feedImage} 
          resizeMode="cover"
        />
      )}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionButton}>
          <Ionicons 
            name={item.liked ? 'heart' : 'heart-outline'} 
            size={24} 
            color={item.liked ? '#FF883B' : '#888'} 
          />
          <Text style={[styles.actionCount, item.liked && styles.likedText]}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleComments} style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#888" />
          <Text style={styles.actionCount}>{item.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentsSection}>
        {item.comments.slice(0, 2).map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={(commentId) => deleteComment(item.id, commentId)}
            isUserComment={comment.author === 'You'}  // Adjust this condition based on how you identify the current user
          />
        ))}
        
        {item.comments.length > 2 && (
          <TouchableOpacity onPress={toggleComments}>
            <Text style={styles.viewMoreComments}>
              {showAllComments ? 'Hide comments' : `View all ${item.comments.length} comments`}
            </Text>
          </TouchableOpacity>
        )}
        
        {showAllComments && item.comments.slice(2).map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={(commentId) => deleteComment(item.id, commentId)}
            isUserComment={comment.author === 'You'}  
            // Adjust this condition based on how you identify the current user
          />
        ))}
      </View>
      <CommentSection 
        comments={item.comments} 
        onAddComment={(comment) => addComment(item.id, comment)} 
      />
    </View>
  );
};

const Feed = () => {
  const [feedData, setFeedData] = useState(FEED_ITEMS);
  const [refreshing, setRefreshing] = useState(false);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);

  const toggleLike = useCallback((id) => {
    setFeedData(prevData => 
      prevData.map(item => 
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  }, []);

  const addComment = useCallback((id, comment) => {
    setFeedData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {
              ...item,
              comments: [
                ...item.comments,
                { id: Date.now().toString(), author: 'You', text: comment, time: 'Just now' }
              ]
            }
          : item
      )
    );
  }, []);

  const deleteComment = useCallback((postId, commentId) => {
    setFeedData(prevData =>
      prevData.map(item =>
        item.id === postId
          ? { ...item, comments: item.comments.filter(comment => comment.id !== commentId) }
          : item
      )
    );
  }, []);

  const renderFeedItem = useCallback(({ item }) => (
    <FeedItem item={item} toggleLike={toggleLike} addComment={addComment} deleteComment={deleteComment} />
  ), [toggleLike, addComment, deleteComment]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFeedData(FEED_ITEMS);
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCreatePost = useCallback((postData) => {
    const newPost = {
      id: Date.now().toString(),
      username: 'You', // Replace with actual username
      userAvatar: 'https://example.com/your-avatar.jpg', // Replace with actual avatar URL
      timestamp: 'Just now',
      title: '', // You may want to add a title field to CreatePostModal if needed
      content: postData.text,
      image: postData.hasImage ? 'https://example.com/placeholder-image.jpg' : null, // Replace with actual image handling
      likes: 0,
      liked: false,
      comments: []
    };

    setFeedData(prevData => [newPost, ...prevData]);
    setIsCreatePostModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.createPostButton} 
        onPress={() => setIsCreatePostModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FF883B" />
        <Text style={styles.createPostButtonText}>Create Post</Text>
      </TouchableOpacity>

      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={renderFeedItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF883B"
          />
        }
      />

      {isCreatePostModalVisible && (
        <CreatePostModal
          onClose={() => setIsCreatePostModalVisible(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  feedItem: {
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  feedContent: {
    fontSize: 14,
    color: '#DDD',
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 20,
  },
  feedImage: {
    width: '100%',
    height: 200,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#888',
  },
  likedText: {
    color: '#FF883B',
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  comment: {
    fontSize: 14,
    color: '#DDD',
    marginBottom: 4,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#FF883B',
  },
  viewMoreComments: {
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  createPostButtonText: {
    color: '#FF883B',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Feed;