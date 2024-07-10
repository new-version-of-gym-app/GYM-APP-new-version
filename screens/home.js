import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig'

const Home = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>FIREBASE_AUTH.signOut()} style={styles.button}>
      <View>
        <Text style={styles.buttonText}>Log Out</Text>
      </View>
    </Pressable>
    </View>
    
  )
}

export default Home

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B1A55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  container:{
    alignItems: 'center',
  }
});