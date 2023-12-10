import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react'; 
import Button from '../../components/Button';
import { Camera, CameraType } from 'expo-camera';



function Register() {

    const [text, onChangeText] = useState();
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);


    const openCamera = async() =>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);
        if(!cameraStatus.granted) alert("No access to camera");
    }

    const takePicture = async() => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          console.log(data);
          setImage(data.uri);
        } catch(e) {
          console.log(e);
        }
      }
      setHasCameraPermission(false);
    }

    const toggleCameraType = () => {
      setType(current => (current === CameraType.back? CameraType.front: CameraType.back));
    };

    return (
      <View style={styles.container}>
      {
        !hasCameraPermission? (
          <View>
        
          <Text style={styles.label}> Nhập tên để đăng ký</Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text} />
          <Button label="Nhập khuôn măt" onPress={openCamera} icon="check-circle"/>
          <Button label="Nhập vân tay" onPress={openCamera} icon="check-circle"/>
          <Button label="Đăng ký" onPress={openCamera} />
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <Camera 
              style={styles.camera}
              type={type}
              ref={cameraRef}>
                <View>
                  <Button icon="flip-camera-android" onPress={toggleCameraType}/>
                </View>
            </Camera>
                <View style={styles.bottom}>
                  <Button label="Chụp ảnh" icon="camera" onPress={takePicture}/>
                </View>
          </View>
        )
      }
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
    justifyContent: 'center',
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  camera: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  cameraContainer: {
    alignItems: 'center',
    height: 300,
    width: "100%",
    height: "100%"
  },
  bottom: {
    bottom: 100,
  }
})
export default Register;