import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react'; 
import Button from '../../components/Button';
import { Camera, CameraType } from 'expo-camera';

function LoginWithFace() {
    const cameraRef = useRef(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);
        if(!cameraStatus.granted) alert("No access to camera");
      })();
    },[]);

    const convertToBlob = async (base64String) => {
      try {
        const response = await fetch(`${base64String}`);
        const blob = await response.blob();
        const file = new File([blob],'Image.png',{type: blob.type});
        file.preview = URL.createObjectURL(blob);
        return file;
        // Bạn có thể gửi blob đến máy chủ hoặc thực hiện các xử lý khác ở đây
      } catch (error) {
        console.error('Error converting to blob:', error);
      }
    };

    const detectFace = async (image) => {
      const formData = new FormData();
      formData.append('file', image);

      const fetchApi = async() => {
        const res = await axios.post('http://localhost:5000/api/checkFace', formData);
        if(res.data.label) {
          alert(`Chào mừng bạn ${res.data.label} quay trở lại. Chúc bạn một ngày tốt lành`);
        } else {
          alert("Xác thực sai");
        }
      }

      fetchApi();
    };

    const takePicture = async() => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          // chuyển ảnh thành blob rồi thành file ảnh để gửi
          const image = await convertToBlob(data.base64);
          detectFace(image);

        } catch(e) {
          console.log(e);
        }
      }
    }

    const toggleCameraType = () => {
      setType(current => (current === CameraType.back? CameraType.front: CameraType.back));
    };

    return (
      <View style={styles.container}>
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