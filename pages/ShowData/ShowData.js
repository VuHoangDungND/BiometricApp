import {  Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect} from 'react'; 
import axios from 'axios';


import LoadingScreen from '../../components/LoadingScreen';
import Button from '../../components/Button';

function ShowData({navigation}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchApi = async() => {
        setLoading(true);
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}`);
        if(res) {
          setData(res.data.list);
        }
        setLoading(false);
      }
      fetchApi();
    },[]);

    return (
      <View style={styles.container}>
        {
            loading ? (
              <LoadingScreen/>
            ) : (
              <View style={styles.mainScreen}>
                <Text style={styles.label}> Số người đăng ký : {data.length} </Text>
                { 
                  data?.map((item,index) => {
                    const label = `${index+1} : ${item}`;
                    return <Button style={styles.list} key={index} label={label}/> 
                  })
                }
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
    top:0,
    color: '#fff',
    fontSize: 30
  },
  list: {
    color: '#fff',
    fontSize: 24
  }
})
export default ShowData;