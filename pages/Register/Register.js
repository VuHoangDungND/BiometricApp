import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useRef} from 'react'; 
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';

import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

function Register({navigation}) {

    const [text, onChangeText] = useState('');
    const cameraRef = useRef(null);
    const [images, setImages] = useState([]);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [loading, setLoading] = useState(false);
    const [count, setCount ] = useState(0);

    const openCamera = async() =>{
        setImages([]);
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);
        if(!cameraStatus.granted) alert("No access to camera");
    }

    const takePicture = async() => {
      if(cameraRef.current && count < 3) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          // chuyển ảnh thành blob rồi thành file ảnh để gửi
          setImages([...images, data]);
          setCount(count+1);
        } catch(e) {
          console.log(e);
        }
      } else {
        setCount(0);
        setHasCameraPermission(false);
      }
    }


    const toggleCameraType = () => {
      setType(current => (current === CameraType.back? CameraType.front: CameraType.back));
    };

    const handleSubmit = () => {

      if( images.length == 0 ){
        alert('Vui lòng nhập dữ liệu khuôn mặt');
        return;
      }

      

      const formData = new FormData();
      formData.append('info', JSON.stringify(text));
      images.forEach(img => {
        let uri = img?.uri;
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        formData.append('file', {uri, name: `image.${fileType}`, type: `image/${fileType}`});
      })

      
      const fetchApi = async() => {
        setLoading(true);
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/register`, formData,options);
        if(res) {
          alert(res.data.message);
        }
        navigation.goBack();
        setLoading(false);
      }

      fetchApi();
    }

    return (
      <View style={styles.container}>
      {
        !hasCameraPermission ? (
          <View>
          {
            loading ? (
              <LoadingScreen/>
            ) : (
              <View style={styles.mainScreen}>
                <Text style={styles.label}> Nhập tên để đăng ký</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text} />
                <Button label="Nhập khuôn mặt" onPress={openCamera} icon={images.length >= 3? "check-box":"check-box-outline-blank"}/>
                <Button label="Đăng ký" onPress={handleSubmit} />
              </View>
            )
          }
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
    justifyContent: 'center',
  },
  mainScreen:{
    alignItems: 'center',
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