import axios from 'axios';
import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react'; 

import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

const Logo = require('../../images/logo.jpg');

function Home({navigation}) {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>

          {loading ? (
            <LoadingScreen/>
          ) : (
            <View style={styles.mainScreen}>
              <View style={styles.imageContainer}>
                <Image source={Logo} style={styles.image} resizeMode='contain'/>
              </View>

              <Button label='Đăng kí' onPress={() => navigation.navigate('Register')}/>

              <Button label='Nhận diện khuôn mặt' onPress={() => navigation.navigate('LoginWithFace')} icon="tag-faces"/>

              <Button label='Nhận diện vân tay' onPress={() => navigation.navigate('LoginWithFinger')} icon="fingerprint"/>

              <Button label='Nhận diện cả hai' onPress={() => navigation.navigate('LoginAll')}/>

              <Button label='Dữ liệu lưu trữ ' onPress={() => navigation.navigate('ShowData')} icon="storage"/>

              <Button label='Xóa dữ liệu' onPress={() => navigation.navigate('Delete')} icon="delete-forever"/>
            </View>
          )}
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },

  mainScreen : {
    alignItems: 'center',
    overflow: 'hidden'
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