import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react'; 
import { Camera, CameraType } from 'expo-camera';

import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

function LoginWithFace({navigation}) {
    const cameraRef = useRef(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);
        if(!cameraStatus.granted) alert("No access to camera");
      };
    },[]);


    const detectFace = async (data) => {
      let uri = data?.uri;
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append('file', {uri, name: `image.${fileType}`, type: `image/${fileType}`});

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
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/checkFace`, formData, options)
        if(res.data.label) {
          alert(`Nhận diện khuôn mặt thành công. Chào mừng bạn ${res.data.label} quay trở lại`);
        } else {
          alert("Nhận diện không thành công");
        }
        navigation.goBack();
        setLoading(false);
      }

      fetchApi();
    };

    const takePicture = async() => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          detectFace(data);

        } catch(e) {
          console.log('Taking picture error:',e);
        }
      }
    }

    const toggleCameraType = () => {
      setType(current => (current === CameraType.back? CameraType.front: CameraType.back));
    };

    return (
      <View style={styles.container}>
        {
          loading? (
            <LoadingScreen/>
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
                <Button label="Nhận diện" icon="camera" onPress={takePicture}/>
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
export default LoginWithFace;