import axios from 'axios';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Button from '../../components/Button';

const Logo = require('../../images/logo.jpg');

function Home({navigation}) {

    const handleDelete = () => {

      const fetchApi = async() => {
        const res = await axios.get('http://localhost:5000/api/delete');
        console.log(res);
        alert(res.data.message);
      }

      fetchApi();
    }
    return (
        <View style={styles.container}>

          <View style={styles.imageContainer}>
            <Image source={Logo} style={styles.image} resizeMode='contain'/>
          </View>

          <Button label='Đăng kí' onPress={() => navigation.navigate('Register')}/>

          <Button label='Nhận diện khuôn mặt' onPress={() => navigation.navigate('LoginWithFace')} icon="tag-faces"/>

          <Button label='Nhận diện vân tay' onPress={() => navigation.navigate('LoginWithFinger')} icon="fingerprint"/>

          <Button label='Xóa dữ liệu đã lưu trữ ' onPress={handleDelete}/>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 280,
    borderRadius: 18,
  },
  btn: {
    marginTop: 24 ,
  },
})

export default Home;