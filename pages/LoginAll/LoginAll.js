import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useRef} from 'react'; 
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';
import * as LocalAuthentication from 'expo-local-authentication';

import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

function LoginAll({navigation}) {

    const [text, onChangeText] = useState('');
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [loading, setLoading] = useState(false);
    const [fingerCheck, setFingerCheck] = useState(false);
    const [fingerData, setFingerData] = useState(false);

    const openCamera = async() =>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);
        if(!cameraStatus.granted) alert("No access to camera");
    }

    const takePicture = async() => {
      if(cameraRef.current) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          // chuyển ảnh thành blob rồi thành file ảnh để gửi
          setImage(data);
        } catch(e) {
          console.log(e);
        }
      }
      setHasCameraPermission(false);
    }


    const toggleCameraType = () => {
      setType(current => (current === CameraType.back? CameraType.front: CameraType.back));
    };

    const handleSubmit = () => {

        if( !image || !fingerData ){
            alert('Vui lòng nhập dữ liệu còn thiếu');
            return;
        }

      let uri = image?.uri;
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
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/checkFace`, formData,options);
        if(res.data.label === text && fingerCheck) {
          alert(`Nhận diện cả khuôn mặt và vân tay thành công. Chào mừng bạn ${res.data.label} quay trở lại.`);
        } else {
            alert("Nhận diện không thành công");
        }
        navigation.goBack();
        setLoading(false);
      }

      fetchApi();
    }

    const checkFinger = async () => {
        const hasBiometric = await LocalAuthentication.hasHardwareAsync();
        const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if(hasBiometric && biometricTypes.length > 0) {
        try {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Vui lòng nhập vân tay',
          });
          setFingerData(true);
    
          if (result.success) {
            // trường hợp thành công
            setFingerCheck(true);
          } else {
            // trường hợp thất bại
            setFingerCheck(false);
          }
        } catch (error) {
          // trường hợp lỗi : người dùng hủy bỏ
          alert('Lỗi xác thực:', error);
        }
        } else {
            alert('Thiết bị chưa được hỗ trợ xác thực');
        }
      };

    return (
      <View style={styles.container}>
      {
        !hasCameraPermission? (
          <View>
          {
            loading ? (
              <LoadingScreen/>
            ) : (
              <View style={styles.mainScreen}>
                <Text style={styles.label}> Nhập tên xác minh </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text} />
                <Button label="Nhập khuôn mặt" onPress={openCamera} icon={image? "check-box":"check-box-outline-blank"}/>
                <Button label="Nhập vân tay" onPress={checkFinger} icon={fingerData? "check-box":"check-box-outline-blank"}/>
                <Button label="Xác minh" onPress={handleSubmit} />
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
export default LoginAll;