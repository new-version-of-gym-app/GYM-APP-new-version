import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';
import { FEED_ITEMS } from '../data/dummy-data';
import { Ionicons } from '@expo/vector-icons';
import CommentSection from './CommentSection';
import CommentItem from './CommentItem';  
import CreatePostModal from './CreatePostModal';
import UpdatePostModal from './UpdatePostModal';
import ConfirmationModal from './ConfirmationModal';
import { Alert } from 'react-native';

const Feed = () => {
  const [feedItems, setFeedItems] = useState(FEED_ITEMS);
  const [refreshing, setRefreshing] = useState(false);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);
  const currentUser = "You";

  const toggleLike = useCallback((id) => {
    setFeedItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const liked = !item.liked;
        return {
          ...item,
          liked,
          likes: item.likes + (liked ? 1 : -1)
        };
      }
      return item;
    }));
  }, []);

  const addComment = useCallback((id, comment) => {
    setFeedItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          comments: [
            ...item.comments,
            {
              id: Date.now().toString(),
              author: 'You',
              text: comment,
              time: 'Just now'
            }
          ]
        };
      }
      return item;
    }));
  }, []);

  const deleteComment = useCallback((postId, commentId) => {
    setFeedItems(prevItems => prevItems.map(item => {
      if (item.id === postId) {
        return {
          ...item,
          comments: item.comments.filter(comment => comment.id !== commentId)
        };
      }
      return item;
    }));
  }, []);

  const deletePost = useCallback((postId) => {
    setFeedItems(prevItems => prevItems.filter(item => item.id !== postId));
  }, []);

  const updatePost = useCallback((postId, updatedData) => {
    setFeedItems(prevItems => prevItems.map(item => {
      if (item.id === postId) {
        return { ...item, ...updatedData };
      }
      return item;
    }));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCreatePost = useCallback((postData) => {
    const newPost = {
      id: Date.now().toString(),
      username: currentUser,
      userAvatar: 'https://example.com/your-avatar.jpg',
      timestamp: 'Just now',
      title: '',
      content: postData.text,
      image: postData.hasImage ? 'https://example.com/placeholder-image.jpg' : null,
      likes: 0,
      liked: false,
      comments: []
    };

    setFeedItems(prevItems => [newPost, ...prevItems]);
    setIsCreatePostModalVisible(false);
  }, [currentUser]);

  const renderFeedItem = useCallback(({ item }) => (
    <FeedItem 
      item={item} 
      toggleLike={toggleLike} 
      addComment={addComment} 
      deleteComment={deleteComment}
      deletePost={deletePost}
      updatePost={updatePost}
      isUserPost={item.username === currentUser}
      currentUser={currentUser}
    />
  ), [toggleLike, addComment, deleteComment, deletePost, updatePost, currentUser]);

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
        data={feedItems}
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

const FeedItem = ({ item, toggleLike, addComment, deleteComment, deletePost, updatePost, isUserPost, currentUser }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  const toggleComments = () => setShowAllComments(!showAllComments);

  const handleUpdatePost = (updatedContent) => {
    updatePost(item.id, { content: updatedContent });
    setIsUpdateModalVisible(false);
  };

  const handleDeletePost = () => {
    setIsDeleteModalVisible(true);
  };

  const confirmDeletePost = () => {
    deletePost(item.id);
    setIsDeleteModalVisible(false);
  };

  const handleShare = () => {
    Alert.alert(
      "Coming Soon!",
      "The share feature will be available in a future update.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  const renderComments = () => {
    const visibleComments = showAllComments ? item.comments : item.comments.slice(0, 2);
    return (
      <View style={styles.commentsSection}>
        {visibleComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={() => deleteComment(item.id, comment.id)}
            isUserComment={comment.author === currentUser}
          />
        ))}
        {item.comments.length > 2 && !showAllComments && (
          <TouchableOpacity onPress={toggleComments}>
            <Text style={styles.viewMoreComments}>View all {item.comments.length} comments</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.feedItem}>
      <View style={styles.header}>
        <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        {isUserPost && (
          <>
            <TouchableOpacity onPress={() => setIsUpdateModalVisible(true)} style={styles.editButton}>
              <Ionicons name="pencil-outline" size={24} color="#FF883B" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePost} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="#FF883B" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.feedImage} resizeMode="cover" />
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
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
      {renderComments()}
      <CommentSection 
        comments={item.comments} 
        onAddComment={(comment) => addComment(item.id, comment)} 
      />
      <UpdatePostModal
        isVisible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        onSubmit={handleUpdatePost}
        initialContent={item.content}
      />
      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={confirmDeletePost}
        message="Are you sure you want to delete this post?"
      />
    </View>
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