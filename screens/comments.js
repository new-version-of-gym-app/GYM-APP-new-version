import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  ScrollView ,
  Pressable
} from "react-native";
import { Userctx } from "../store/Usercontext";
import Fontisto from "@expo/vector-icons/Fontisto";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ipadresse } from "../config";

const Comments = ({ route }) => {
  const [data, setData] = useState([]);
  const [cmt_txt, setCmt_txt] = useState("");
  const [loading, setLoading] = useState(false);
  const Userinfo = useContext(Userctx);
  const id = route.params.feed_id;

  const fetchcomments = async () => {
    const result = await axios.get(`http:${ipadresse}:5000/getcomments/${id}`);
    console.log(result.data);
    setData(result.data);
  };

  const addcomment = async () => {
    try {
      const result = await axios.post(
        `http:${ipadresse}:5000/addcomment/${Userinfo.id}/${id}`,
        { cmt_txt }
      );
       setData([result.data, ...data]);
       setCmt_txt ("")
      setLoading(true)

    }catch(err){
      console.log(err);
    }
 
  
  };
  useEffect(() => {
    fetchcomments();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (loading == true) {
        console.log("focuse is working")
        fetchcomments()
        setLoading(false)
       
      }
    }, [loading])
  );

  const Commentcrd = (itemlist) => (
    <View style={styles.commentcontainer}>
      <Image source={{ uri: itemlist.item.photo }} style={styles.postAvatar} />
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Text style={styles.postUsername}>{itemlist.item.username}</Text>
        </View>
        <Text style={styles.postDescription}>{itemlist.item.cmt_txt}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
   
      style={styles.parent}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={Commentcrd}
            keyExtractor={(item) => item.comment_id}
          />
    
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={{ uri: Userinfo.photo }} />
        <TextInput
        value={cmt_txt}
          onChangeText={setCmt_txt}
          style={styles.input}
          placeholder="Type your comment..."
        />
        <Fontisto
          style={{ marginLeft: 10 }}
          name="arrow-right"
          size={24}
          color="#1877F2"
          onPress={addcomment}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  commentcontainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "90%",
  },
  parent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "row",
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    width: "75%",
    paddingVertical: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  postCard: {
    marginBottom: 3,
    padding: 15,
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUsername: {
    flex: 1,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 16,
    color: "#00008B",
  },
});

export default Comments;
