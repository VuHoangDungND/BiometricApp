import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react'; 

function Register() {

    const [text, onChangeText] = useState();
    const cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    return (
        <View style={styles.container}>
          <Text style={styles.label}> Nhập tên để đăng ký</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 24
  },
  input: {
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff'
  }
})
export default Register;