import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState} from 'react'; 
import axios from 'axios';

import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

function Delete({navigation}) {

    const [pass, onChangePass] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
     
      const fetchApi = async() => {
        setLoading(true);
        let options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        };
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/delete`, {pass} , options);
        if(res) {
          alert(res.data.message);
        }
        setLoading(false);
      }
      fetchApi();
    }

    return (
      <View style={styles.container}>
        {
            loading ? (
              <LoadingScreen/>
            ) : (
              <View style={styles.mainScreen}>
                <Text style={styles.label}> Nhập mã để xác nhận</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePass}
                    value={pass} />
                <Button label="Xóa" onPress={handleSubmit} />
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
})
export default Delete;